import { SwrKey } from '@/constants'
import { debtAPI, routeAPI } from '@/services'
import {
  DebtsFilterLineItem,
  EDebtsDateTypeName,
  EDebtsFilterKey,
  EDebtsFilterKeyName,
  RouteDetailRes,
  RouteRes,
} from '@/types'
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

export const useDebtsFilter = () => {
  return useSWR<DebtsFilterLineItem[]>(
    SwrKey.debtsFilter,
    () =>
      debtAPI
        .getDebtsFilter()
        .then((res) => {
          const data = res.result.data
          const result = Object.entries(data)
            .filter(([key]) =>
              [
                EDebtsFilterKey.State,
                EDebtsFilterKey.MoveType,
                EDebtsFilterKey.PartnerIds,
                EDebtsFilterKey.DateType,
                EDebtsFilterKey.StartDate,
                EDebtsFilterKey.PaymentState,
              ].includes(key as EDebtsFilterKey)
            )
            .map(([key, value]) => {
              const option = {
                value: key,
                label: EDebtsFilterKeyName[key] as string,
              }

              if (key === EDebtsFilterKey.PartnerIds) {
                return {
                  ...option,
                  items: (value as any[])?.map?.((i) => ({ label: i.name, value: i.id })) || [],
                }
              } else if (key === EDebtsFilterKey.DateType) {
                return {
                  ...option,
                  items:
                    Object.entries(value)?.map?.(([value, label]) => ({
                      value,
                      label: EDebtsDateTypeName[value] ?? label,
                    })) || [],
                }
              } else if (key === EDebtsFilterKey.StartDate) {
                return option
              } else {
                return {
                  ...option,
                  items: Object.entries(value)?.map?.(([value, label]) => ({ label, value })) || [],
                }
              }
            }) as DebtsFilterLineItem[]

          return result
        })
        .catch(() => []),
    {
      dedupingInterval: 1000 * 60 * 10,
    }
  )
}
