import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

export type ChipProps = {
  label: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  isActive?: boolean
  disabled?: boolean
  readOnly?: boolean
}

const Chip = ({ label, disabled, isActive, onPress, readOnly, style }: ChipProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onPress?.()}
      disabled={disabled || readOnly}
      style={[styles.chip, isActive && styles.chipActive, disabled && styles.disabled, style]}
    >
      <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chip: {
    ...BaseStyles.flexCenter,
    alignSelf: 'flex-start',
    flexShrink: 1,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  disabled: {
    opacity: 0.5,
  },
  chipText: {
    ...Typography.body12Medium,
    lineHeight: 16,
    color: Colors.gray70,
  },
  chipTextActive: {
    color: Colors.primary,
  },
})

export default Chip
