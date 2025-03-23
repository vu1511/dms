import { CloseIcon, EditSquareIcon, Images } from '@/assets'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { ImagePickerOptions, ImagePickerResult } from '@/types'
import { memo, useCallback, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import BottomSheetModal from '../../bottomSheetModal'
import { IconButton } from '../../button'
import Header from '../../header'
import ImagePicker from '../imagePicker'
import { styles } from './style'

export type AvatarPickerProps = {
  size?: number
  uri?: string
  options?: ImagePickerOptions
  onBlur?: () => void
  onChange?: (value: ImagePickerResult) => void
}

const AvatarPicker = memo(
  ({ onChange: externalOnChange, onBlur, uri: externalUri, size = 120, options }: AvatarPickerProps) => {
    const { onClose, onOpen, ref } = useVisibleRef()
    const [imageUri, setImageUri] = useState<string | undefined>(externalUri)

    const isControlled = typeof externalUri !== undefined
    const uri = isControlled ? externalUri : imageUri

    const handleSetImage = useCallback((images: ImagePickerResult[]) => {
      onClose()

      if (images?.length > 0) {
        setImageUri(images[0].uri)
        externalOnChange?.(images[0])
      }
    }, [])

    return (
      <>
        <View style={BaseStyles.flexCenter}>
          <TouchableOpacity activeOpacity={0.5} onPress={onOpen}>
            <Image
              resizeMode="cover"
              source={uri ? { uri } : Images.blankAvatar}
              style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: Colors.gray20 }}
            />
            <View style={styles.editIcon}>
              <EditSquareIcon size={12} fill={Colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheetModal ref={ref} enableDynamicSizing>
          <Header
            title="Chọn hình ảnh"
            right={<IconButton color={Colors.gray80} size={20} icon={CloseIcon} onPress={onClose} />}
          />
          <ImagePicker onBlur={onBlur} onChange={handleSetImage} {...options} includeBase64 multiple={false} />
        </BottomSheetModal>
      </>
    )
  }
)

export default AvatarPicker
