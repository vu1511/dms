import { PERMISSIONS } from 'react-native-permissions'
import { useRequestPermission, useRequestPermissionProps } from './useRequestPermission'
import { Platform } from 'react-native'

export const usePhotoLibraryPermission = (props?: Omit<useRequestPermissionProps, 'permission'>) => {
  return useRequestPermission({
    permission: Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    desc: 'Vui lòng cấp quyền truy cập thư viện cho ứng dụng để thực hiện chức năng này',
    ...props,
  })
}
