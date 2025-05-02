import { SwrKey } from '@/constants'
import { routeAPI } from '@/services'
import { RouteDetailRes, RouteRes } from '@/types'
import { useCallback } from 'react'
import useSWR, { SWRConfiguration } from 'swr'

export const useRoutes = (configs?: SWRConfiguration<RouteRes[]>) => {
  const fetcherHandler = useCallback(async () => {
    try {
      const res = await routeAPI.getRoutes()
      return res?.result?.data || []
    } catch (error) {
      return []
    }
  }, [])

  return useSWR(SwrKey.routes, fetcherHandler, configs)
}

export const useTodayRoute = (
  callback?: (data: RouteDetailRes) => void,
  configs?: SWRConfiguration<RouteDetailRes>
) => {
  const todayRouteFetcherHandler = useCallback(async () => {
    try {
      const res = await routeAPI.getTodayRoute()
      const result = res?.result?.data?.[0] ?? null

      if (result) {
        callback?.(result)
      }

      return result
    } catch (error) {
      return null
    }
  }, [callback])

  return useSWR(SwrKey.today_route, todayRouteFetcherHandler, configs)
}
