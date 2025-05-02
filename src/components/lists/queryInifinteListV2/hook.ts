import { QueryList } from '@/types'
import { isArray, removeEmptyValueFromObject } from '@/utils'
import { useCallback, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/dist/infinite'
import { GetKeyResult, PreviousData, UseQueryInfiniteListProps, UseQueryInfiniteListResult } from './types'

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
      if (!key || (previousData && !previousData?.data?.length)) return null

      return removeEmptyValueFromObject({ key, page, ...params })
    },
    [key, params]
  )

  const fetcherHandler = useCallback(
    async ({ page, ...params }: GetKeyResult<Params>): Promise<PreviousData<Data>> => {
      setRevalidatedAll(true)

      try {
        const response = await fetcher({ ...(params as unknown as Params), offset: page + (params.limit ?? LIMIT) })
        const { result, paginate } = response.data
        const list = isArray(result) ? result : []

        if (mutateFetcherResponse) {
          return mutateFetcherResponse(response.data)
        }

        return {
          data: list,
          pagination: paginate,
        }
      } catch (error) {
        return {
          data: [],
          pagination: { limit: LIMIT, offset: OFFSET, total: 0 },
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
  } = useSWRInfinite<PreviousData<Data>>(getKey, fetcherHandler, config)

  const data: Data[] = useMemo(() => {
    if (!rawData?.length) {
      return []
    }

    return rawData.flatMap((item) => item.data).filter(Boolean)
  }, [rawData])

  const total = rawData?.[rawData.length - 1]?.pagination?.total ?? 0
  const hasMore = data.length < total

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
