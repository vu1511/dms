import { Platform } from 'react-native'
import { PERMISSIONS } from 'react-native-permissions'
import { useRequestPermission, useRequestPermissionProps } from './useRequestPermission'

export const usePhotoLibraryPermission = (props?: Omit<useRequestPermissionProps, 'permission'>) => {
  return useRequestPermission({
    permission:
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : (Platform.Version as number) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    desc: 'Vui lòng cấp quyền truy cập thư viện cho ứng dụng để thực hiện chức năng này',
    ...props,
  })
}
