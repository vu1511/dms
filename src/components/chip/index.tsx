import { BaseStyles, Typography } from '@/theme'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

export type ChipProps = {
  label: string
  color: string
  style?: StyleProp<ViewStyle>
}

const Chip = ({ color, label, style }: ChipProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.chip, style]}>
        <View style={[styles.background, { backgroundColor: color }]} />
        <Text style={[Typography.body12Medium, { color, zIndex: 1 }]}>{label}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexShrink: 1,
  },
  chip: {
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
