import { CloseIcon, Images } from '@/assets'
import { BottomSheetModal, Header, IconButton } from '@/components'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { ImagePickerOptions, ImagePickerResult } from '@/types'
import { memo, useCallback, useMemo, useState } from 'react'
import { Image, ImageStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import ImagePickerSource from '../imagePickerSource'

export type AvatarPickerProps = {
  uri?: string
  size?: number
  title?: string
  error?: boolean
  options?: ImagePickerOptions
  onBlur?: () => void
  onChange?: (value: ImagePickerResult) => void
}

const AvatarPicker = memo(
  ({
    onBlur,
    onChange: externalOnChange,
    title = 'Chọn hình ảnh',
    uri: externalUri,
    size = 100,
    options,
    error,
  }: AvatarPickerProps) => {
    const { onClose, onOpen, ref } = useVisibleRef()
    const [imageUri, setImageUri] = useState<string | undefined>(externalUri)

    const isControlled = typeof externalUri !== undefined
    const uri = isControlled ? externalUri : imageUri

    const styles = useMemo<ViewStyle>(
      () => ({
        ...BaseStyles.flexCenter,
        borderWidth: 1,
        borderStyle: 'dashed',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: error ? Colors.danger : Colors.gray50,
        backgroundColor: error ? Colors.dangerBg : Colors.inputBg,
      }),
      [error, size]
    )

    const avatarStyles = useMemo<ImageStyle>(
      () => ({
        width: size - 8,
        height: size - 8,
        borderRadius: size / 2,
        backgroundColor: Colors.gray20,
      }),
      [size]
    )

    const source = useMemo(() => (uri ? { uri } : Images.blankAvatar), [uri])

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
          <TouchableOpacity activeOpacity={0.5} onPress={onOpen} style={styles}>
            <Image resizeMode="cover" source={source} style={avatarStyles} />
          </TouchableOpacity>
        </View>

        <BottomSheetModal ref={ref} enableDynamicSizing>
          <Header
            title={title}
            right={<IconButton color={Colors.gray80} size={20} icon={CloseIcon} onPress={onClose} />}
          />
          <ImagePickerSource onBlur={onBlur} onChange={handleSetImage} {...options} includeBase64 multiple={false} />
        </BottomSheetModal>
      </>
    )
  }
)

export default AvatarPicker
