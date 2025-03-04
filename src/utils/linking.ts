import { Linking, Platform } from 'react-native'

export const openAppSettings = async () => {
  try {
    if (Platform.OS === 'ios') {
      await Linking.openURL('app-settings:')
    } else if (Platform.OS === 'android') {
      await Linking.openSettings()
    }
  } catch (error) {}
}

export const openZaloProfile = (phone: string) => {
  if (!phone) return

  if (Platform.OS === 'ios') {
    Linking.openURL(`https://zalo.me/${phone}`)
  } else if (Platform.OS === 'android') {
    Linking.openURL(`tel:${phone}`)
  }
}

type OpenGoogleMap = {
  name: string
  longitude: number | string
  latitude: number | string
}

export const openMapWithLngLat = ({ latitude, longitude, name }: OpenGoogleMap) => {
  try {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    })
    const latLng = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `${scheme}${name}@${latLng}`,
      android: `${scheme}${latLng}(${name})`,
    })
    Linking.openURL(url as string)
  } catch (error) {}
}
