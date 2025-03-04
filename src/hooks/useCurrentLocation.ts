import { LngLat } from '@/types'
import { openAppSettings } from '@/utils'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

export const useCurrentLocation = (callback?: (data: LngLat) => void) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [coordinate, setCoordinate] = useState<LngLat | undefined>()
  const [isloading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getCurrentLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showPopupRequireLocationPermission = () => {
    Alert.alert('Cấp quyền vị trí cho ứng dụng', 'Vui lòng cấp quyền vị trí cho ứng dụng để thực hiện chức năng này', [
      { text: 'Quay lại', style: 'cancel' },
      { text: 'Cài đặt', onPress: openAppSettings },
    ])
  }

  async function getCurrentLocation(): Promise<LngLat | undefined> {
    try {
      setIsLoading(true)
      const hasPermission = await requestPermission()
      if (!hasPermission) {
        showPopupRequireLocationPermission()
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High,
        distanceInterval: 15000,
      })

      const { longitude, latitude } = location.coords
      const coordinate = { longitude, latitude }

      setCoordinate(coordinate)
      callback?.(coordinate)
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  async function requestPermission() {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    setHasPermission(granted)
    return granted
  }

  return {
    hasPermission,
    coordinate,
    isloading,
    getCurrentLocation,
    showPopupRequireLocationPermission,
  }
}
