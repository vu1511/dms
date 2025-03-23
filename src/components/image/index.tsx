import { Images } from '@/assets'
import { BaseStyles, Colors } from '@/theme'
import { Image as ExpoImage, ImageProps as ExpoImageProps, ImageSource, useImage } from 'expo-image'
import { memo, useMemo, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import ActivityIndicator from '../activityIndicator'

type Source = ImageSource | string

export type ImageProps = Pick<ExpoImageProps, 'recyclingKey' | 'contentFit'> & {
  height?: number
  width?: number
  borderRadius?: number
  style?: StyleProp<ViewStyle>
  errorComponent?: React.ReactElement
  source: Source
  defaultSource?: Source
}

const Image = memo(
  ({
    source,
    defaultSource = Images.blank,
    style,
    recyclingKey,
    contentFit = 'cover',
    borderRadius,
    width = 100,
    height = 100,
    errorComponent,
  }: ImageProps) => {
    const [isError, setIsError] = useState(false)

    const image = useImage(source, {
      maxWidth: width * 2,
      maxHeight: height * 2,
      onError: () => setIsError(true),
    })

    const placeholder = useMemo(
      () => ({
        blurhash: 'L1P?:g-;-.-;_3fQfQfQ-:fQayfQ',
        width: 20,
        height: 20,
      }),
      []
    )

    return (
      <View style={[{ width, height, borderRadius, overflow: 'hidden' }, style]}>
        {!image && !isError ? (
          <View style={styles.loadingView}>
            <ActivityIndicator size={Math.max(width, height) / 2} color={Colors.gray50} />
          </View>
        ) : null}

        {isError ? (
          (errorComponent ?? (
            <ExpoImage
              transition={500}
              cachePolicy="none"
              style={styles.image}
              source={defaultSource}
              contentFit={contentFit}
            />
          ))
        ) : (
          <ExpoImage
            source={image}
            transition={500}
            style={styles.image}
            contentFit={contentFit}
            placeholder={placeholder}
            placeholderContentFit="contain"
            recyclingKey={recyclingKey}
          />
        )}
      </View>
    )
  }
)

export default Image

export const styles = StyleSheet.create({
  loadingView: {
    ...BaseStyles.absoluteInset,
    ...BaseStyles.flexCenter,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
