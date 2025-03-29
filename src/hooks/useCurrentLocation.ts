import { System } from '@/core'
import { LngLat } from '@/types'
import { openAppSettings } from '@/utils'
import * as Location from 'expo-location'
import { useCallback, useEffect, useMemo, useState } from 'react'

type Options = {
  requestOnMount?: boolean
}

export const useCurrentLocation = (options?: Options) => {
  const { requestOnMount = true } = options || {}

  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [coordinate, setCoordinate] = useState<LngLat | null | undefined>()
  const [isValidating, setIsValidating] = useState<boolean>(false)

  useEffect(() => {
    if (requestOnMount) {
      getCurrentLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showPopupPermission = useCallback(() => {
    System.showPopup({
      message: 'Cấp quyền vị trí cho ứng dụng',
      description: 'Vui lòng cấp quyền vị trí cho ứng dụng để thực hiện chức năng này',
      onCancel: () => {},
      onConfirm: openAppSettings,
    })
  }, [])

  const requestPermission = useCallback(async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      setHasPermission(granted)
      return granted
    } catch (error) {
      setHasPermission(false)
      return false
    }
  }, [])

  const getCurrentLocation = useCallback(async (): Promise<LngLat | null> => {
    try {
      setIsValidating(true)
      const hasPermission = await requestPermission()
      if (!hasPermission) {
        showPopupPermission()
        return null
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High,
        distanceInterval: 15000,
      })

      const { longitude, latitude } = location.coords
      const coordinate = { longitude, latitude }

      setCoordinate(coordinate)
      return coordinate
    } catch (error) {
      setCoordinate(null)
      return null
    } finally {
      setIsValidating(false)
    }
  }, [requestPermission, showPopupPermission])

  return useMemo(
    () => ({
      coordinate,
      hasPermission,
      isValidating,
      isLoading: isValidating && coordinate === undefined,
      getCurrentLocation,
      showPopupPermission,
    }),
    [hasPermission, coordinate, isValidating, getCurrentLocation, showPopupPermission]
  )
}
