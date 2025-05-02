import { QueryList } from '@/types'
import { removeEmptyValueFromObject } from '@/utils'
import { useCallback, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import type { GetKeyResult, PreviousData, UseQueryInfiniteListProps, UseQueryInfiniteListResult } from './types'

const OFFSET = 0
const LIMIT = 20

const useQueryInfinite = <
  Params extends QueryList = any,
  Response = any,
  FilterParams extends QueryList = Params,
  Data extends Response[keyof Response] = any,
>({
  key,
  config,
  initialParams: externalInitialParams,
  fetcher,
  mutateFetcherParams,
  mutateFetcherResponse,
}: UseQueryInfiniteListProps<Params, Response, FilterParams, Data>): UseQueryInfiniteListResult<
  Params,
  Response,
  FilterParams,
  Data
> => {
  const [initialParams] = useState<FilterParams>({
    limit: LIMIT,
    offset: OFFSET,
    ...(externalInitialParams as FilterParams),
  })
  const [params, setParams] = useState<FilterParams>(initialParams)
  const [revalidatedAll, setRevalidatedAll] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const getKey = useCallback(
    (page: number, previousData: PreviousData<Data[]> | null): GetKeyResult<FilterParams> | null => {
      if (!key || (previousData && (!previousData?.data?.length || !previousData?.hasMore))) {
        return null
      }

      const resultParams = removeEmptyValueFromObject<GetKeyResult<FilterParams>>({
        key,
        page,
        hasMore: previousData?.hasMore ?? false,
        ...(params as FilterParams),
      })

      return resultParams
    },
    [key, params]
  )

  const fetcherHandler = useCallback(
    async ({ key, hasMore, page, ...params }: GetKeyResult<FilterParams>): Promise<PreviousData<Data[]>> => {
      setRevalidatedAll(true)

      const limit = params.limit ?? LIMIT
      const nextParams = { ...params, offset: page * limit }
      try {
        const response = await fetcher(
          mutateFetcherParams
            ? (mutateFetcherParams(nextParams as unknown as FilterParams, { page }) as unknown as Params)
            : (nextParams as unknown as Params)
        )
        return mutateFetcherResponse(response, nextParams as unknown as FilterParams)
      } catch (error) {
        return { data: [], hasMore: false }
      }
    },
    [fetcher, mutateFetcherParams, mutateFetcherResponse]
  )

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
    ...config,
  })

  const { hasMore, data, additionalData }: PreviousData<Data[]> = useMemo(() => {
    if (!rawData?.length) {
      return { data: [], hasMore: false }
    }

    return {
      data: rawData.flatMap((item) => item.data).filter(Boolean),
      hasMore: rawData?.[rawData.length - 1]?.hasMore ?? false,
      additionalData: rawData?.[rawData.length - 1]?.additionalData,
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
      setIsRefreshing(true)
      requestAnimationFrame(async () => {
        await mutate()
        setIsRefreshing(false)
      })
    },
    [initialParams, mutate]
  )

  const filter = useCallback(async (params: Partial<FilterParams>) => {
    setRevalidatedAll(false)
    setParams((prevParams) => removeEmptyValueFromObject({ ...prevParams, ...params }))
  }, [])

  return useMemo(
    () => ({
      data,
      params,
      hasMore,
      isLoading,
      isRefreshing,
      isValidating,
      additionalData,
      getMore,
      refresh,
      filter,
      mutate,
    }),
    [data, additionalData, params, hasMore, isLoading, isRefreshing, isValidating, getMore, refresh, filter, mutate]
  )
}

export default useQueryInfinite
