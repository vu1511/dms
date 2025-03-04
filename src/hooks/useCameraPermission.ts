import { Platform } from 'react-native'
import { PERMISSIONS } from 'react-native-permissions'
import { useRequestPermission, useRequestPermissionProps } from './useRequestPermission'

export const useCameraPermission = (props?: Omit<useRequestPermissionProps, 'permission'>) => {
  return useRequestPermission({
    permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA,
    desc: 'Vui lòng cấp quyền camera cho ứng dụng để thực hiện chức năng này',
    ...props,
  })
}
