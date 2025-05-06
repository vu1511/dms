import { BaseStyles, Typography } from '@/theme'
import { ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

export type ChipProps = {
  label: string
  color: string
  right?: ReactNode
  onPress?(): void
  style?: StyleProp<ViewStyle>
}

const Chip = ({ color, label, style, right, onPress }: ChipProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.chip, style]} disabled={!onPress} onPress={() => onPress?.()}>
      <View style={[styles.background, { backgroundColor: color }]} />
      <Text style={[Typography.body12Medium, { color, zIndex: 1 }]}>{label}</Text>
      {right}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chip: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    flexShrink: 1,
  },
  background: {
    ...BaseStyles.absoluteInset,
    opacity: 0.1,
  },
})

export default Chip
