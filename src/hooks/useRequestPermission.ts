import { System } from '@/core'
import { openAppSettings } from '@/utils'
import { useEffect, useState } from 'react'
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
      requestPermission()
    }
  }, [])

  const showPopupPermission = () => {
    System.showPopup({
      message: title,
      description: desc,
      cancelBtnText: 'Đóng',
      confirmBtnText: 'Xác nhận',
      onCancel: () => {},
      onConfirm: openAppSettings,
    })
  }

  async function requestPermission(): Promise<boolean> {
    setIsLoading(true)
    try {
      const result = await request(permission)
      if (result === RESULTS.GRANTED) {
        setHasPermission(true)
      } else {
        setHasPermission(false)
        showPopupPermission()
      }
      return result === RESULTS.GRANTED
    } catch (error) {
      showPopupPermission()
      setHasPermission(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    hasPermission,
    openAppSettings,
    requestPermission,
    showPopupPermission,
  }
}
