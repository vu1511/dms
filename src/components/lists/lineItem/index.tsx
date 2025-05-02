import { BaseStyles, Colors, Typography } from '@/theme'
import { memo, ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

export type LineItemProps = {
  onPress?(): void
  left?: ReactNode
  label: ReactNode
  right?: ReactNode
  value?: ReactNode
  numberOfLines?: number
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  valueStyle?: StyleProp<TextStyle>
}

const LineItem = memo(
  ({
    onPress,
    label,
    value,
    left,
    style,
    right,
    valueStyle,
    contentStyle,
    labelStyle,
    numberOfLines = 2,
  }: LineItemProps) => (
    <TouchableOpacity disabled={!onPress} activeOpacity={0.5} style={[styles.line, style]} onPress={() => onPress?.()}>
      {left}
      <View style={[styles.content, contentStyle]}>
        {typeof label === 'string' || typeof label === 'number' ? (
          <Text numberOfLines={numberOfLines} style={[styles.label, labelStyle]}>
            {label}
          </Text>
        ) : (
          label
        )}
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text numberOfLines={numberOfLines} style={[styles.value, valueStyle]}>
            {value}
          </Text>
        ) : (
          value
        )}
      </View>
      {right}
    </TouchableOpacity>
  )
)

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
  },
  content: {
    ...BaseStyles.flexRowSpaceBetween,
    flex: 1,
    alignItems: 'flex-start',
    columnGap: 8,
  },
  label: {
    ...Typography.body14Normal,
    color: Colors.gray70,
    width: 120,
  },
  value: {
    ...Typography.body14Medium,
    color: Colors.gray80,
    flexShrink: 1,
    textAlign: 'right',
  },
})

export default LineItem
