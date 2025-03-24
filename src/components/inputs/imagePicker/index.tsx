import { CameraIcon, PhotoIcon } from '@/assets'
import { useCameraPermission, usePhotoLibraryPermission } from '@/hooks'
import { Colors } from '@/theme'
import { ImagePickerOptions, ImagePickerResult } from '@/types'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image, openCamera } from 'react-native-image-crop-picker'
import { type ImagePickerResponse, launchImageLibrary as onLaunchImageLibrary } from 'react-native-image-picker'
import { styles } from './style'

export type ImagePickerProps = ImagePickerOptions & {
  onBlur?: () => void
  setLoading?: (state: boolean) => void
  onChange: (data: ImagePickerResult[]) => void
}

const ImagePicker = ({ setLoading, onChange, onBlur, ...options }: ImagePickerProps) => {
  const { requestPermission: requestCameraPermission, hasPermission: hasCameraPermisson } = useCameraPermission({
    requestOnMount: false,
  })

  const { requestPermission: requestPhotoLibraryPermission, hasPermission: hasPhotoLibraryPermission } =
    usePhotoLibraryPermission({
      requestOnMount: false,
    })

  const launchImageLibrary = async (): Promise<ImagePickerResponse | null> => {
    if (!hasPhotoLibraryPermission) {
      const isGranted = await requestPhotoLibraryPermission()

      if (!isGranted) {
        return null
      }
    }

    return onLaunchImageLibrary({
      mediaType: 'photo',
      includeBase64: options?.includeBase64 ?? false,
      quality: options?.compressImageQuality ?? 0.5,
      selectionLimit: options?.selectionLimit ?? 1,
    })
  }

  const launchCamera = async (): Promise<Image | null> => {
    if (!hasCameraPermisson) {
      const isGranted = await requestCameraPermission()

      if (!isGranted) {
        return null
      }
    }

    return openCamera({
      mediaType: 'photo',
      cropping: options?.cropping ?? false,
      multiple: options?.multiple ?? false,
      cropperStatusBarColor: Colors.white,
      selectionLimit: options?.selectionLimit,
      includeBase64: options?.includeBase64 ?? false,
      compressImageQuality: options?.compressImageQuality ?? 0.5,
      cropperToolbarTitle: options?.cropperToolbarTitle ?? 'Chỉnh sửa hình ảnh',
    })
  }

  const handleSelect = async (type: 'camera' | 'library') => {
    setLoading?.(true)
    try {
      if (type === 'camera') {
        const image = await launchCamera()
        if (image) {
          onChange?.([
            {
              uri: image.path,
              height: image.height,
              mime: image.mime,
              size: image.size,
              width: image.width,
              base64: image?.data ?? '',
            },
          ])
        }
      } else {
        const response = await launchImageLibrary()
        if (response?.didCancel) {
          onBlur?.()
        } else if (response?.assets?.length) {
          onChange?.(
            response.assets.map((image) => ({
              uri: image.uri ?? '',
              mime: image.type ?? '',
              width: image.width ?? 0,
              height: image.height ?? 0,
              size: image.fileSize ?? 0,
              base64: image.base64 ?? '',
            }))
          )
        }
      }
    } catch (error) {
      onBlur?.()
    } finally {
      setLoading?.(false)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} style={styles.btnItem} onPress={() => handleSelect('library')}>
        <PhotoIcon size={28} fill={Colors.gray70} />
        <Text style={styles.btnItemText}>Thư viện</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity activeOpacity={0.5} style={styles.btnItem} onPress={() => handleSelect('camera')}>
        <CameraIcon size={32} fill={Colors.gray70} />
        <Text style={styles.btnItemText}>Chụp ảnh</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ImagePicker
