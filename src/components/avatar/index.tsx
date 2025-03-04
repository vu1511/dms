import { Images } from '@/assets'
import { BaseStyles, Colors, Typography } from '@/theme'
import { getRandomColor, getShortName } from '@/utils'
import { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image, { ImageProps } from '../image'

export type AvatarProps = Omit<ImageProps, 'width' | 'height'> & {
  size?: number
  label?: string
}

const Avatar = memo(({ label = '', size = 40, defaultSource = Images.blankAvatar, ...attributes }: AvatarProps) => {
  const backgroundColor = useMemo(() => getRandomColor(label), [label])

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          ...BaseStyles.flexCenter,
        },
        text: {
          ...Typography.body14Medium,
          color: Colors.white,
          fontSize: size / 2,
          lineHeight: size / 2 + 8,
        },
      }),
    [size, backgroundColor]
  )

  const ErrorComponent = useMemo(() => {
    if (!label) return undefined

    return (
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={1}>
          {getShortName(label)}
        </Text>
      </View>
    )
  }, [label, styles])

  return (
    <Image
      height={size}
      width={size}
      borderRadius={size / 2}
      defaultSource={defaultSource}
      {...attributes}
      errorComponent={ErrorComponent}
    />
  )
})

export default Avatar
