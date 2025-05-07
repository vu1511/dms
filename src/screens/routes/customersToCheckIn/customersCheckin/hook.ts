import { DEFAULT_COUNTRY_ID, SwrKey } from '@/constants'
import { System } from '@/core'
import { useAsyncV2, useCurrentLocation, usePreviousRoute, useRoutes } from '@/hooks'
import { Navigation, Routes, Tabs } from '@/routes'
import { routeAPI, userAPI } from '@/services'
import { ECustomerCheckinMenuOption, SearchCustomerRouteReq, SearchCustomerRouteRes } from '@/types'
import { getDistanceByCoordinate, openMapWithLngLat, removeEmptyValueFromObject } from '@/utils'
import { useNavigation } from '@react-navigation/native'
import orderBy from 'lodash/orderBy'
import { useCallback, useMemo, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import useSWR, { useSWRConfig } from 'swr'
import useSWRInfinite from 'swr/dist/infinite'

type PreviousData = { data: SearchCustomerRouteRes[]; hasMore: boolean }

type GetKeyResult = SearchCustomerRouteReq & {
  key: string
  page: number
  hasMore: boolean
}

const LIMIT = 20

type Mode = 'map' | 'list'

export const useCustomersCheckin = () => {
  const { cache } = useSWRConfig()
  const navigation = useNavigation<Navigation>()

  const {
    coordinate,
    isLoading: isLoadingLocation,
    hasPermission: hasLocationPermission,
    showPopupPermission: showPopupLocationPermission,
    getCurrentLocation,
  } = useCurrentLocation()

  const modeAnimatedValue = useSharedValue(0)
  const listRef = useRef<FlatList<SearchCustomerRouteRes>>(null)

  const [mode, setMode] = useState<Mode>('list')
  const modeRef = useRef<Mode>(mode)

  const goBack = useCallback(() => {
    navigation.navigate(Tabs.WorkTab)
  }, [navigation])

  const { trigger: triggerCreateAddress } = useAsyncV2(userAPI.createAddress, {
    errorMsg: 'Cập nhật địa chỉ không thành công',
    successMsg: 'Cập nhật địa chỉ thành công',
    onSuccess: goBack,
  })

  const [revalidatedAll, setRevalidatedAll] = useState<boolean>(false)
  const [params, setParams] = useState<SearchCustomerRouteReq>(() => ({
    keyword: '',
    type_checkin: 'no_visited',
    hierarchy_id: cache.get(SwrKey.today_route)?.data?.id ?? 0,
  }))
  const routeId = params.hierarchy_id

  const todayRouteFetcherHandler = useCallback(async () => {
    try {
      const res = await routeAPI.getTodayRoute()
      const result = res?.result?.data?.[0] ?? null

      if (result) {
        setParams((prev) => (!prev.hierarchy_id ? { ...prev, hierarchy_id: result.id } : prev))
      }

      return result
    } catch (error) {
      return null
    }
  }, [])

  const {
    data: todayRoute,
    isLoading: isTodayRouteLoading,
    mutate: mutateTodayRoute,
  } = useSWR(SwrKey.today_route, todayRouteFetcherHandler)

  const routeDetailFetcherHandler = useCallback(async () => {
    try {
      const res = await routeAPI.getRouteDetail({ hierarchy_id: routeId })
      const result = res?.result?.data?.[0] ?? null

      if (result) {
        setParams((prev) => (!prev.hierarchy_id ? { ...prev, hierarchy_id: result.id } : prev))
      }

      return result
    } catch (error) {
      return null
    }
  }, [routeId])

  const {
    data: routeDetail,
    isLoading: isRouteDetailLoading,
    mutate: mutateRouteDetail,
  } = useSWR(
    routeId && todayRoute?.id && routeId !== todayRoute?.id ? SwrKey.detail_routes(routeId) : null,
    routeDetailFetcherHandler,
    { fallbackData: todayRoute }
  )

  const { data: routes, isLoading: isRoutesLoading, mutate: mutateRoutes } = useRoutes()

  const getKey = useCallback(
    (page: number, previousData: PreviousData | null): GetKeyResult | null => {
      if (!params?.hierarchy_id || (previousData && (!previousData?.data?.length || !previousData?.hasMore)))
        return null

      return {
        page,
        ...params,
        key: SwrKey.routeCustomers,
        hasMore: previousData?.hasMore ?? false,
      }
    },
    [params]
  )

  const fetcherHandler = useCallback(
    async ({ page, keyword, type_checkin, hierarchy_id }: GetKeyResult): Promise<PreviousData> => {
      setRevalidatedAll(true)

      try {
        const response = await routeAPI.searchCustomerInRoute({
          keyword,
          hierarchy_id,
          limit: LIMIT,
          type_checkin,
          offset: page * LIMIT,
        })
        const data = response.result?.data || []
        if (!data.length && modeRef.current === 'map') {
          System.showToast({ message: 'Không có khách hàng nào được tìm thấy', type: 'info', duration: 4000 })
        }
        return { data, hasMore: data.length >= LIMIT }
      } catch (error) {
        return { data: [], hasMore: false }
      }
    },
    []
  )

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset?.({ offset: 0, animated: true })
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
  })

  const { data, hasMore }: PreviousData = useMemo(() => {
    if (!rawData?.length) {
      return { data: [], hasMore: false }
    }

    const result = rawData.flatMap((item) => item.data).filter(Boolean)
    const hasMore = rawData?.[rawData.length - 1]?.hasMore ?? false

    if (!coordinate) {
      return { data: result, hasMore }
    }

    return {
      hasMore,
      data: orderBy(
        result.map((item) => ({
          ...item,
          distance: getDistanceByCoordinate(coordinate, {
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
          }),
        })),
        'distance',
        'asc'
      ),
    }
  }, [rawData, coordinate])

  const filter = useCallback((params: Partial<SearchCustomerRouteReq>) => {
    scrollToTop()
    setRevalidatedAll(false)
    setParams((prevParams) => removeEmptyValueFromObject({ ...prevParams, ...params }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMore = useCallback(async () => {
    if (hasMore && !isValidating && rawData?.length) {
      await setSize((size) => size + 1)
    }
  }, [hasMore, isValidating, rawData?.length, setSize])

  const refresh = useCallback(async () => {
    setRevalidatedAll(false)
    mutate()
    mutateRoutes()
    mutateTodayRoute()
    mutateRouteDetail()
    getCurrentLocation()
  }, [mutate, mutateRouteDetail, mutateRoutes, mutateTodayRoute, getCurrentLocation])

  usePreviousRoute(refresh)

  const onViewLocation = useCallback((item: SearchCustomerRouteRes) => {
    openMapWithLngLat({
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name,
    })
  }, [])

  const onCreateOrder = useCallback((item: SearchCustomerRouteRes) => {}, [])

  const onCheckIn = useCallback(
    (item: SearchCustomerRouteRes) => {
      navigation.navigate(Routes.CheckinCustomer, {
        routeId,
        customerId: item.id,
        onSuccess: () => {
          navigation.pop()
        },
      })
    },
    [navigation, routeId]
  )

  const onViewInfo = useCallback(
    (item: SearchCustomerRouteRes) => {
      navigation.navigate(Routes.CustomerDetail, { customerId: item.id })
    },
    [navigation]
  )

  const onUpdateAddress = useCallback(
    (item: SearchCustomerRouteRes) => {
      const shippingAddress = item?.shipping_adress?.[0]
      navigation.navigate(Routes.CreateAddress, {
        defaultValues: {
          street: shippingAddress?.street,
          district_id: shippingAddress?.district_id?.id,
          district_name: shippingAddress?.district_id?.name,
          ward_id: shippingAddress?.ward_id?.id,
          ward_name: shippingAddress?.ward_id?.name,
          state_id: shippingAddress?.state_id?.id,
          state_name: shippingAddress?.state_id?.name,
        },
        onSubmit: (data) => {
          triggerCreateAddress({
            adress_id: shippingAddress.id,
            partner_id: item.id,
            address_new: {
              district_id: data.district_id,
              state_id: data.state_id,
              ward_id: data.ward_id,
              street: data.street,
              country_id: DEFAULT_COUNTRY_ID,
            },
          })
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigation]
  )

  const onCreateInventory = useCallback(
    (item: SearchCustomerRouteRes) => {
      navigation.navigate(Routes.CreateInventory, { customer: item, onSuccess: goBack })
    },
    [goBack, navigation]
  )

  const onRate = useCallback(
    (item: SearchCustomerRouteRes) => {
      navigation.navigate(Routes.CreateRating, {
        defaultValues: { customer_id: { id: item.id, name: item.name } },
        onSuccess: goBack,
      })
    },
    [goBack, navigation]
  )

  const onMenuItemPress = useCallback(
    (action: ECustomerCheckinMenuOption, data: SearchCustomerRouteRes) => {
      switch (action) {
        case ECustomerCheckinMenuOption.Rate:
          onRate(data)
          break
        case ECustomerCheckinMenuOption.CreateInventory:
          onCreateInventory(data)
          break
        case ECustomerCheckinMenuOption.UpdateAddress:
          onUpdateAddress(data)
          break
        case ECustomerCheckinMenuOption.ViewInfo:
          onViewInfo(data)
          break
        case ECustomerCheckinMenuOption.ViewLocation:
          onViewLocation(data)
          break
        default:
          break
      }
    },
    [onRate, onCreateInventory, onUpdateAddress, onViewInfo, onViewLocation]
  )

  const switchMode = useCallback(() => {
    if (modeRef.current === 'list' && !hasLocationPermission) {
      showPopupLocationPermission()
      return
    }

    setMode((mode) => {
      const isListMode = mode === 'list'
      modeAnimatedValue.value = withTiming(isListMode ? 1 : 0)
      if (!isListMode) {
        requestAnimationFrame(scrollToTop)
      }

      const result = isListMode ? 'map' : 'list'
      modeRef.current = result
      return result
    })
  }, [modeAnimatedValue, hasLocationPermission, showPopupLocationPermission, scrollToTop])

  return useMemo(
    () => ({
      data,
      mode,
      params,
      routes,
      hasMore,
      listRef,
      routeDetail,
      isRoutesLoading,
      coordinate,
      isLoadingLocation,
      modeAnimatedValue,
      isLoading: isLoading || isRouteDetailLoading || isTodayRouteLoading,
      unVisitedCount: routeDetail?.no_visited_count ?? 0,
      visitedCount: routeDetail?.visited_count ?? 0,
      filter,
      getMore,
      refresh,
      mutate,
      setMode,
      switchMode,
      scrollToTop,
      onCheckIn,
      onViewInfo,
      onCreateOrder,
      onMenuItemPress,
    }),
    [
      data,
      mode,
      params,
      routes,
      hasMore,
      routeDetail,
      isRoutesLoading,
      coordinate,
      isLoading,
      isLoadingLocation,
      modeAnimatedValue,
      isRouteDetailLoading,
      isTodayRouteLoading,
      filter,
      getMore,
      refresh,
      mutate,
      switchMode,
      scrollToTop,
      onCheckIn,
      onViewInfo,
      onCreateOrder,
      onMenuItemPress,
    ]
  )
}
