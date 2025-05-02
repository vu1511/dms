import { CloseIcon, Images } from '@/assets'
import { BottomSheetModal, Header, IconButton, Image } from '@/components'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { ImagePickerOptions, ImagePickerResult } from '@/types'
import { memo, useCallback, useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { SvgXml } from 'react-native-svg'
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

    const btnStyle = useMemo<ViewStyle>(
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
          <TouchableOpacity activeOpacity={0.5} onPress={onOpen} style={btnStyle}>
            <Image
              source={source}
              contentFit="cover"
              cachePolicy="none"
              width={size - 8}
              height={size - 8}
              borderRadius={size / 2}
            />
            <View style={styles.avatarIcon}>
              <SvgXml
                width={12}
                height={12}
                color={Colors.gray60}
                xml='<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg>'
              />
            </View>
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

const styles = StyleSheet.create({
  avatarIcon: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    ...BaseStyles.flexCenter,
    borderRadius: 22 / 2,
    backgroundColor: Colors.gray20,
  },
})

export default AvatarPicker
