import { Colors } from '@/theme'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

export type ListItemSeparatorProps = {
  style?: StyleProp<ViewStyle>
  innerStyle?: StyleProp<ViewStyle>
}

const ListItemSeparator = ({ style, innerStyle }: ListItemSeparatorProps) => {
  return (
    <View style={[styles.outer, style]}>
      <View style={[styles.inner, innerStyle]} />
    </View>
  )
}

export type DotSeparatorProps = {
  color?: string
  style?: StyleProp<ViewStyle>
}

const DotSeparator = ({ color = '#8A96A6', style }: DotSeparatorProps) => {
  return (
    <View style={[styles.dotWrapper, style]}>
      <Text style={[styles.dot, { color }]}>.</Text>
    </View>
  )
}

export { ListItemSeparator, DotSeparator }

const styles = StyleSheet.create({
  outer: {
    backgroundColor: Colors.white,
  },
  inner: {
    height: 1,
    backgroundColor: Colors.border,
  },

  dotWrapper: {
    justifyContent: 'center',
  },
  dot: {
    fontSize: 18,
    lineHeight: 13,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})
