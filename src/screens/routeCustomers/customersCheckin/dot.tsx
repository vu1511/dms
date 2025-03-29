import { Colors } from '@/theme'
import { memo } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

type DotProps = {
  size?: number
  style?: ViewStyle
  isCheckin?: boolean
  borderVisible?: boolean
}

export const Dot = memo(({ style, isCheckin, borderVisible, size = 14 }: DotProps) => {
  return (
    <View
      style={[
        borderVisible && styles.dotBorder,
        isCheckin ? styles.dotOnline : styles.dotOffline,
        style,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    />
  )
})

const styles = StyleSheet.create({
  dotBorder: {
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  dotOnline: {
    backgroundColor: '#49BC78',
  },
  dotOffline: {
    backgroundColor: '#DE350B',
  },
})
