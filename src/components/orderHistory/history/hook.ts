import { SwrKey } from '@/constants'
import { orderAPI } from '@/services'
import { GetOrderHistoryListReq, GetOrderHistoryRes, OrderRes } from '@/types'
import { removeEmptyValueFromObject } from '@/utils'
import { useCallback, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/dist/infinite'

const OFFSET = 0
const LIMIT = 20

type PreviousData = { data: OrderRes[]; hasMore: boolean; summary: GetOrderHistoryRes['sales_summary'] | null }

type GetKeyResult = GetOrderHistoryListReq & {
  page: number
}

export const useOrderHistories = (externalInitialParams?: Partial<GetOrderHistoryListReq>) => {
  const [initialParams] = useState<GetOrderHistoryListReq>({ limit: LIMIT, offset: OFFSET, ...externalInitialParams })
  const [params, setParams] = useState<GetOrderHistoryListReq>(initialParams)
  const [revalidatedAll, setRevalidatedAll] = useState<boolean>(false)

  const getKey = useCallback(
    (page: number, previousData: PreviousData | null): GetKeyResult | null => {
      if (previousData && (!previousData?.data?.length || !previousData?.hasMore)) return null

      return removeEmptyValueFromObject({ key: SwrKey.orderHistories, page, ...params })
    },
    [params]
  )

  const fetcherHandler = useCallback(async ({ page, ...params }: GetKeyResult): Promise<PreviousData> => {
    setRevalidatedAll(true)

    const limit = params.limit ?? LIMIT

    try {
      const response = await orderAPI.getOrderHistoryList({ ...params, offset: page * limit })
      const { list_booking, sales_summary } = response.result.data

      return {
        data: list_booking,
        summary: sales_summary,
        hasMore: list_booking.length >= limit,
      }
    } catch (error) {
      return {
        data: [],
        summary: null,
        hasMore: false,
      }
    }
  }, [])

  const config = useMemo(
    () => ({
      parallel: true,
      revalidateFirstPage: false,
      revalidateAll: !revalidatedAll,
      dedupingInterval: 100,
    }),
    [revalidatedAll]
  )

  const {
    data: rawData,
    isLoading,
    isValidating,
    mutate,
    setSize,
  } = useSWRInfinite<PreviousData>(getKey, fetcherHandler, config)

  const { data, hasMore, summary } = useMemo<PreviousData>(() => {
    if (!rawData?.length) {
      return { data: [], hasMore: false, summary: null }
    }

    return {
      data: rawData.flatMap((item) => item.data).filter(Boolean),
      hasMore: rawData?.[rawData.length - 1]?.hasMore ?? false,
      summary: rawData?.[0]?.summary ?? null,
    }
  }, [rawData])

  const getMore = useCallback(async () => {
    if (hasMore && !isValidating && rawData?.length) {
      await setSize((size) => size + 1)
    }
  }, [hasMore, isValidating, rawData?.length, setSize])

  const refresh = useCallback(
    async (resetParams = false) => {
      if (resetParams) {
        setParams(initialParams)
      } else {
        setRevalidatedAll(false)
      }
      requestAnimationFrame(async () => {
        mutate()
      })
    },
    [initialParams, mutate]
  )

  const filter = useCallback(async (filterParams: Partial<GetOrderHistoryListReq>) => {
    setRevalidatedAll(false)
    setParams((prevParams) => removeEmptyValueFromObject({ ...prevParams, ...filterParams }))
  }, [])

  return useMemo(
    () => ({
      data,
      summary,
      params,
      hasMore,
      isLoading,
      isValidating,
      getMore,
      refresh,
      filter,
      mutate,
    }),
    [data, summary, params, hasMore, isLoading, isValidating, getMore, refresh, filter, mutate]
  )
}
