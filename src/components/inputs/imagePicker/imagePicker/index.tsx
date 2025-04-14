import { CloseIcon, PhotoIcon } from '@/assets'
import { BottomSheetModal, Header, IconButton, Image, UploadProgress } from '@/components'
import { useVisibleRef } from '@/hooks'
import { Colors } from '@/theme'
import { AttachmentUrlRes, ImagePickerOptions, ImagePickerResult } from '@/types'
import { toImageUrl } from '@/utils'
import { memo, useCallback, useMemo, useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import ImagePickerSource from '../imagePickerSource'
import { styles } from './style'

export type ImagePickerProps = {
  limit?: number
  size?: number
  title?: string
  error?: boolean
  value?: AttachmentUrlRes[]
  options?: ImagePickerOptions
  contentStyle?: StyleProp<ViewStyle>
  onBlur?: () => void
  onChange?: (value: AttachmentUrlRes[]) => void
  onUpload?: (value: ImagePickerResult[]) => Promise<{ isSuccess: boolean; data: AttachmentUrlRes[] }>
}

/*
  TODO: 
  1. scroll to image to delete or add
  2. support single image
*/

const ImagePicker = memo(
  ({
    onBlur,
    onUpload,
    onChange,
    contentStyle,
    limit = 5,
    title = 'Chọn hình ảnh',
    value: externalValues,
    size = 80,
    options,
    error,
  }: ImagePickerProps) => {
    const { onClose, onOpen, ref } = useVisibleRef()
    const [internalImages, setInternalImages] = useState<AttachmentUrlRes[]>(externalValues ?? [])
    const [numberOfImagesLoading, setNumberOfImagesLoading] = useState<number>(0)

    const hasImagesLoading = numberOfImagesLoading > 0
    const isControlled = !!externalValues?.length
    const images = isControlled ? externalValues : internalImages
    const imagesLength = images.length

    const sizeStyle = useMemo(() => ({ width: size, height: size }), [size])

    const handleChange = useCallback(
      async (imageResults: ImagePickerResult[]) => {
        if (!imageResults?.length || imageResults.length + imagesLength > limit) {
          return
        }

        onClose()

        if (onUpload) {
          setNumberOfImagesLoading(imageResults.length)

          try {
            const { isSuccess, data } = await onUpload(imageResults)
            if (!isSuccess) {
              return
            }

            const nextImages = [...images, ...data]
            setInternalImages(nextImages)
            onChange?.(nextImages)
          } finally {
            setNumberOfImagesLoading(0)
          }
        } else {
          onChange?.(imageResults.map((i) => ({ attachment_id: i.id, attachment_url: i.uri })))
        }
      },
      [imagesLength, limit, onClose, onUpload, onChange, images]
    )

    const deleteImage = useCallback(
      (imageId: number) => {
        const nextImages = images.filter((image) => image.attachment_id !== imageId)
        setInternalImages(nextImages)
        onChange?.(nextImages)
      },
      [images, onChange]
    )

    const renderItem = useCallback(
      (item: AttachmentUrlRes) => {
        return (
          <View key={item.attachment_id} style={[styles.imageItem, sizeStyle]}>
            <Image width={size} height={size} contentFit="cover" source={toImageUrl(item.attachment_url)} />
            <View style={styles.deleteBtn}>
              <IconButton
                size={12}
                sizeIncrease={8}
                icon={CloseIcon}
                color={Colors.white}
                backgroundColor={Colors.black50}
                onPress={() => deleteImage(item.attachment_id)}
              />
            </View>
          </View>
        )
      },
      [deleteImage, size, sizeStyle]
    )

    return (
      <>
        <Animated.ScrollView
          horizontal
          fadingEdgeLength={24}
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          scrollEnabled={imagesLength > 0 || hasImagesLoading}
          contentContainerStyle={[styles.contentContainer, contentStyle]}
        >
          {imagesLength < limit && (
            <TouchableOpacity
              onPress={onOpen}
              activeOpacity={0.5}
              disabled={hasImagesLoading}
              style={[styles.placeholder, sizeStyle, error && styles.placeholderError]}
            >
              <PhotoIcon size={size / 4} fill={error ? Colors.danger : Colors.gray70} />
              <Text style={[styles.label, error && styles.colorDanger]}>
                {imagesLength}/{limit}
              </Text>
            </TouchableOpacity>
          )}
          {images.map(renderItem)}
          {hasImagesLoading && (
            <>
              {Array.from({ length: numberOfImagesLoading }).map((_, index) => (
                <View key={index} style={[styles.placeholder, sizeStyle]}>
                  <View style={{ paddingHorizontal: 8, width: '100%' }}>
                    <UploadProgress height={3} isLoading bgColor={Colors.white} />
                  </View>
                </View>
              ))}
            </>
          )}
        </Animated.ScrollView>

        <BottomSheetModal ref={ref} enableDynamicSizing>
          <Header
            title={title}
            right={<IconButton color={Colors.gray80} size={20} icon={CloseIcon} onPress={onClose} />}
          />
          <ImagePickerSource
            onBlur={onBlur}
            onChange={handleChange}
            {...options}
            multiple
            selectionLimit={limit - imagesLength}
          />
        </BottomSheetModal>
      </>
    )
  }
)

export default ImagePicker
