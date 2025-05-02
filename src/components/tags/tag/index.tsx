import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

/**
 * TODO: support outlined - flat mode, color, backgroundColor
 *  */
export type TagProps = {
  label: string
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: () => void
  isActive?: boolean
  disabled?: boolean
  readOnly?: boolean
}

const Tag = ({ label, disabled, isActive, onPress, readOnly, style, labelStyle }: TagProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onPress?.()}
      disabled={disabled || readOnly}
      style={[styles.tag, style, isActive && styles.tagActive, disabled && styles.disabled]}
    >
      <Text numberOfLines={1} style={[styles.tagText, labelStyle, isActive && styles.tagTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tag: {
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
  tagActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  disabled: {
    opacity: 0.5,
  },
  tagText: {
    ...Typography.body12Medium,
    lineHeight: 16,
    flexShrink: 1,
    color: Colors.gray70,
  },
  tagTextActive: {
    color: Colors.primary,
  },
})

export default Tag
