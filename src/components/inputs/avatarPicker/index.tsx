import { CloseIcon, EditSquareIcon, Images } from '@/assets'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { ImagePickerOptions, ImagePickerResult } from '@/types'
import { memo, useCallback, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import BottomSheetModal from '../../bottomSheetModal'
import { IconButton } from '../../button'
import Header from '../../header'
import ImagePicker from '../imagePicker'
import { styles } from './style'

export type AvatarPickerProps = {
  uri?: string
  size?: number
  title?: string
  errorMsg?: string
  onBlur?: () => void
  options?: ImagePickerOptions
  onChange?: (value: ImagePickerResult) => void
}

const AvatarPicker = memo(
  ({
    onBlur,
    onChange: externalOnChange,
    title = 'Chọn hình ảnh',
    uri: externalUri,
    size = 120,
    options,
    errorMsg,
  }: AvatarPickerProps) => {
    const { onClose, onOpen, ref } = useVisibleRef()
    const [imageUri, setImageUri] = useState<string | undefined>(externalUri)

    const isControlled = typeof externalUri !== undefined
    const uri = isControlled ? externalUri : imageUri

    const handleSetImage = useCallback(
      (images: ImagePickerResult[]) => {
        onClose()

        if (images?.length > 0) {
          setImageUri(images[0].uri)
          externalOnChange?.(images[0])
        }
      },
      [externalOnChange, onClose]
    )

    return (
      <>
        <View style={[BaseStyles.flexCenter, BaseStyles.rGap8]}>
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
          {!!errorMsg && <Text style={BaseStyles.inputErrorMessage}>{errorMsg}</Text>}
        </View>

        <BottomSheetModal ref={ref} enableDynamicSizing>
          <Header
            title={title}
            right={<IconButton color={Colors.gray80} size={20} icon={CloseIcon} onPress={onClose} />}
          />
          <ImagePicker onBlur={onBlur} onChange={handleSetImage} {...options} includeBase64 multiple={false} />
        </BottomSheetModal>
      </>
    )
  }
)

export default AvatarPicker
