import { ListRef } from '@/components'
import { RouteProp, Routes } from '@/routes'
import { ratingAPI } from '@/services'
import { AllRatingType, AllRatingTypeOptions, ECustomerRatingType, RatingCommonData, RatingType } from '@/types'
import { removeEmptyValueFromObject } from '@/utils'
import { useRoute } from '@react-navigation/native'
import { useCallback, useMemo, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const LIMIT = 20

type PreviousData = {
  data: RatingCommonData[]
  hasMore: boolean
}

type GetKeyResult = {
  key: string
  hasMore: boolean
  page: number
  customerId?: number
  ratingType: AllRatingType
}

export const useRatings = () => {
  const {
    params: { customerId },
  } = useRoute<RouteProp<Routes.RatingHistories>>()

  const listRef = useRef<ListRef<RatingCommonData, 'FlashList'>>(null)
  const [revalidatedAll, setRevalidatedAll] = useState<boolean>(false)
  const [ratingType, setRatingType] = useState<AllRatingType>(AllRatingTypeOptions[0].value)

  const getKey = useCallback(
    (page: number, previousData: PreviousData | null): GetKeyResult | null => {
      if (previousData && (!previousData?.data?.length || !previousData?.hasMore)) {
        return null
      }

      const resultParams = removeEmptyValueFromObject<GetKeyResult>({
        key: 'ratings',
        page,
        customerId,
        ratingType,
        hasMore: previousData?.hasMore ?? false,
      })

      return resultParams
    },
    [customerId, ratingType]
  )

  const fetcherHandler = useCallback(async ({ page, customerId, ratingType }: GetKeyResult): Promise<PreviousData> => {
    setRevalidatedAll(true)

    try {
      if (isCustomerRatingType(ratingType)) {
        const { data } = await ratingAPI.getRatingData({
          full_data: true,
          customer_id: customerId,
        })
        return {
          hasMore: false,
          data: data
            .filter((i) => i.comment_line_ids?.length > 0)
            .map(({ comment_line_ids: [i] }) => ({
              ratingDate: i.comment_date,
              ratingTags: i.rating_tags,
              ratingType: i.rating_type?.code,
              ratingContent: i.rating_content,
              imageUrls: i.attachment_images?.map((i) => i.url) ?? [],
              ratingStar: i.rating_star?.rating_star_int ?? 0,
            })),
        }
      }

      const { data } = await ratingAPI.getRatingPhotos({
        limit: LIMIT,
        offset: page * LIMIT,
        customer_id: customerId,
        rating_type: ratingType as RatingType,
      })
      return {
        hasMore: data.length >= LIMIT,
        data: data.map((i) => ({
          ratingDate: i.rating_date,
          ratingTags: i.rating_tags,
          ratingContent: i.rating_content,
          imageUrls: i.image_url?.map((i) => i.url) ?? [],
          ratingStar: i.rating_star?.rating_star_int ?? 0,
          ratingType: i.rating_type,
        })),
      }
    } catch (error) {
      return { data: [], hasMore: false }
    }
  }, [])

  const {
    data: rawData,
    isLoading,
    isValidating,
    mutate,
    setSize,
  } = useSWRInfinite(getKey, fetcherHandler, {
    parallel: true,
    revalidateFirstPage: false,
    revalidateAll: !revalidatedAll,
    dedupingInterval: 100,
  })

  const { hasMore, data }: PreviousData = useMemo(() => {
    if (!rawData?.length) {
      return { data: [], hasMore: false }
    }

    const dataNoEmpty = rawData.flatMap((item) => item.data).filter(Boolean)

    if (isCustomerRatingType(ratingType)) {
      return {
        hasMore: false,
        data: dataNoEmpty.filter((i) => i.ratingType === ratingType),
      }
    }

    return {
      data: dataNoEmpty,
      hasMore: rawData?.[rawData.length - 1]?.hasMore ?? false,
    }
  }, [ratingType, rawData])

  const getMore = useCallback(async () => {
    if (hasMore && !isValidating && rawData?.length) {
      await setSize((size) => size + 1)
    }
  }, [hasMore, isValidating, rawData?.length, setSize])

  const refresh = useCallback(() => {
    setRevalidatedAll(false)
    requestAnimationFrame(() => {
      mutate()
    })
  }, [mutate])

  const filter = useCallback(async (type: AllRatingType) => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false })
    requestAnimationFrame(() => {
      setRatingType(type)
      setRevalidatedAll(false)
    })
  }, [])

  return useMemo(
    () => ({ data, isLoading, hasMore, ratingType, listRef, refresh, getMore, filter }),
    [data, filter, getMore, hasMore, isLoading, ratingType, refresh]
  )
}

const isCustomerRatingType = (type: AllRatingType): type is ECustomerRatingType => {
  return (
    type === ECustomerRatingType.Delivery ||
    type === ECustomerRatingType.EmployeeAttitude ||
    type === ECustomerRatingType.QualityProduct ||
    type === ECustomerRatingType.QuantityProduct
  )
}
