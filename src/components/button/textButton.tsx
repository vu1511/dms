import { Colors, Typography } from '@/theme'
import { LegacyRef, forwardRef, useMemo } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import ActivityIndicator from '../activityIndicator'

export type ButtonProps = {
  onPress?: () => void
  hitSlop?: number
  loading?: boolean
  disabled?: boolean
  numberOfLines?: number
  title?: string | React.ReactElement
  prefixIcon?: React.ReactElement
  suffixIcon?: React.ReactElement
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  allowPressWhenDisabled?: boolean
}

const Button = forwardRef(
  (
    {
      title,
      onPress,
      style,
      textStyle,
      prefixIcon,
      suffixIcon,
      disabled,
      loading,
      hitSlop,
      numberOfLines = 1,
      allowPressWhenDisabled = false,
    }: ButtonProps,
    ref: LegacyRef<React.ElementRef<typeof TouchableOpacity>>
  ) => {
    const isDisabled = disabled || loading

    const textStyles = useMemo<TextStyle>(() => {
      return StyleSheet.flatten([styles.btnText, textStyle])
    }, [textStyle])

    return (
      <TouchableOpacity
        ref={ref}
        hitSlop={hitSlop}
        activeOpacity={0.5}
        onPress={() => onPress?.()}
        disabled={!onPress || (!allowPressWhenDisabled ? isDisabled : undefined)}
        style={[styles.btn, style, disabled && styles.disabled]}
      >
        {loading ? <ActivityIndicator size={16} color={textStyles.color as string} /> : prefixIcon}
        {typeof title === 'string' ? (
          <Text numberOfLines={numberOfLines} style={textStyle}>
            {title}
          </Text>
        ) : (
          title
        )}
        {suffixIcon}
      </TouchableOpacity>
    )
  }
)

export default Button

const Loading = ({ color }: { color: string }) => {
  return <ActivityIndicator size={16} color={color} />
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  btnText: {
    ...Typography.body16SemiBold,
    color: Colors.white,
  },
  text: {
    ...Typography.body16Medium,
    color: Colors.primary,
  },
  textBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
  },
})
