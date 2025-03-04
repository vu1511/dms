import { openAppSettings } from '@/utils'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Permission, RESULTS, request } from 'react-native-permissions'

export type useRequestPermissionProps = {
  permission: Permission
  requestOnMount?: boolean
  title?: string
  desc?: string
}

export const useRequestPermission = ({
  permission,
  requestOnMount = true,
  title = 'Cấp quyền cho ứng dụng',
  desc = 'Vui lòng cấp quyền cho ứng dụng để thực hiện chức năng này',
}: useRequestPermissionProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasPermission, setHasPermission] = useState<boolean>(false)

  useEffect(() => {
    if (requestOnMount) {
      requestCameraPermission()
    }
  }, [])

  const showPopupRequirePermission = () => {
    Alert.alert(title, desc, [
      { text: 'Quay lại', style: 'cancel' },
      { text: 'Cài đặt', onPress: openAppSettings },
    ])
  }

  async function requestCameraPermission(): Promise<boolean> {
    setIsLoading(true)
    try {
      const result = await request(permission)
      if (result === RESULTS.GRANTED) {
        setHasPermission(true)
      } else {
        setHasPermission(false)
        showPopupRequirePermission()
      }
      return result === RESULTS.GRANTED
    } catch (error) {
      showPopupRequirePermission()
      setHasPermission(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    hasPermission,
    isLoading,
    openAppSettings,
    requestCameraPermission,
    showPopupRequirePermission,
  }
}
