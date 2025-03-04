import { removeEmptyValueFromObject } from '@/utils'
import { useCallback, useMemo, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { GetKeyResult, PreviousData, UseQueryInfiniteListProps, UseQueryInfiniteListRes } from './types'

const useQueryInfiniteList = <
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
>({
  key,
  config,
  initialParams,
  fetcher,
  onFilter,
  mutateKey,
  mutateDataResult,
  mutateFetcherParams,
  mutateFetcherResponse,
}: UseQueryInfiniteListProps<Params, Response, FilterParams, Data>): UseQueryInfiniteListRes<
  Params,
  Response,
  FilterParams,
  Data
> => {
  const [params, setParams] = useState<FilterParams>(initialParams)
  const paramsRef = useRef<FilterParams>(params)
  const [revalidatedAll, setRevalidatedAll] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const getKey = useCallback(
    (page: number, previousData: PreviousData<Data[]> | null): GetKeyResult<FilterParams> | null => {
      if (!key || (previousData && (!previousData?.data?.length || !previousData?.hasMore))) return null

      const resultParams: GetKeyResult<FilterParams> = removeEmptyValueFromObject({
        key,
        page,
        hasMore: previousData?.hasMore ?? false,
        ...params,
      })

      if (mutateKey) {
        return mutateKey(resultParams)
      }

      return resultParams
    },
    [key, params, mutateKey]
  )

  const fetcherHandler = useCallback(
    async ({ key, hasMore, page, ...params }: GetKeyResult<FilterParams>): Promise<PreviousData<Data[]>> => {
      setRevalidatedAll(true)

      try {
        const response = await fetcher(
          mutateFetcherParams ? mutateFetcherParams(params as FilterParams, { hasMore, page }) : (params as Params)
        )
        return mutateFetcherResponse(response)
      } catch (error) {
        return { data: [], hasMore: false }
      }
    },
    []
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

  const {
    data: originalData,
    hasMore,
  }: Pick<PreviousData<Data[]>, 'data' | 'hasMore'> = useMemo(() => {
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
  }, [hasMore, isValidating, rawData])

  const data = useMemo(() => {
    if (mutateDataResult && originalData?.length) {
      const result = mutateDataResult(originalData)

      if (result.length === 0) {
        getMore()
      }

      return result
    }

    return originalData
  }, [getMore, mutateDataResult, originalData])

  const refresh = useCallback(
    async (resetParams = false) => {
      if (resetParams) {
        setParams(initialParams)
        paramsRef.current = initialParams
      } else {
        setRevalidatedAll(false)
      }
      setIsRefreshing(true)
      requestAnimationFrame(async () => {
        await mutate()
        setIsRefreshing(false)
      })
    },
    [initialParams]
  )

  const filter = useCallback(async (filterParams: Partial<FilterParams>) => {
    onFilter?.()
    setRevalidatedAll(false)
    const nextParams = removeEmptyValueFromObject({ ...paramsRef.current, ...filterParams })
    setParams(nextParams)
    paramsRef.current = nextParams
  }, [])

  return useMemo(
    () => ({
      data,
      params,
      hasMore,
      isLoading,
      isRefreshing,
      isValidating,
      getMore,
      refresh,
      filter,
      mutate,
    }),
    [data, params, hasMore, isLoading, isRefreshing, isValidating, getMore, refresh, filter, mutate]
  )
}

export default useQueryInfiniteList
