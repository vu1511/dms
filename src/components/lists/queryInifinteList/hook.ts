import { QueryList } from '@/types'
import { getFetcherResponse, removeEmptyValueFromObject } from '@/utils'
import { useCallback, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/dist/infinite'
import type { GetKeyResult, PreviousData, UseQueryInfiniteListProps, UseQueryInfiniteListResult } from './types'

const OFFSET = 0
const LIMIT = 20

const useQueryInfiniteList = <Data = any, Params extends QueryList = any>(
  props: UseQueryInfiniteListProps<Data, Params>
): UseQueryInfiniteListResult<Data, Params> => {
  const { key, fetcher, mutateFetcherResponse } = props

  const [initialParams] = useState<Params>({ limit: LIMIT, offset: OFFSET, ...(props.initialParams as Params) })
  const [params, setParams] = useState<Params>(initialParams)
  const [revalidatedAll, setRevalidatedAll] = useState<boolean>(false)

  const getKey = useCallback(
    (page: number, previousData: PreviousData<Data[]> | null): GetKeyResult<Params> | null => {
      if (!key || (previousData && (!previousData?.data?.length || !previousData?.hasMore))) return null

      return removeEmptyValueFromObject({ key, page, ...params })
    },
    [key, params]
  )

  const fetcherHandler = useCallback(
    async ({ page, ...params }: GetKeyResult<Params>): Promise<PreviousData<Data>> => {
      setRevalidatedAll(true)

      const limit = params.limit ?? LIMIT

      try {
        const response = await fetcher({ ...(params as unknown as Params), offset: page * limit })

        const data = getFetcherResponse(response) as Data[]

        if (mutateFetcherResponse) {
          return mutateFetcherResponse(response)
        }

        return {
          data,
          hasMore: data.length >= limit,
        }
      } catch (error) {
        return {
          data: [],
          hasMore: false,
        }
      }
    },
    [fetcher, mutateFetcherResponse]
  )

  const config = useMemo(
    () => ({
      parallel: true,
      revalidateFirstPage: false,
      revalidateAll: !revalidatedAll,
      dedupingInterval: 100,
      ...props.config,
    }),
    [props.config, revalidatedAll]
  )

  const {
    data: rawData,
    isLoading,
    isValidating,
    mutate,
    setSize,
  } = useSWRInfinite<PreviousData>(getKey, fetcherHandler, config)

  const { data, hasMore }: PreviousData<Data> = useMemo(() => {
    if (!rawData?.length) {
      return { data: [], hasMore: false }
    }

    return {
      data: rawData.flatMap((item) => item.data).filter(Boolean),
      hasMore: rawData?.[rawData.length - 1]?.hasMore ?? false,
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

  const filter = useCallback(async (filterParams: Partial<Params>) => {
    setRevalidatedAll(false)
    setParams((prevParams) => removeEmptyValueFromObject({ ...prevParams, ...filterParams }))
  }, [])

  return useMemo(
    () => ({
      data,
      params,
      hasMore,
      isLoading,
      isValidating,
      getMore,
      refresh,
      filter,
      mutate,
    }),
    [data, params, hasMore, isLoading, isValidating, getMore, refresh, filter, mutate]
  )
}

export default useQueryInfiniteList
