import { Colors, Spacings, Typography } from '@/theme'
import { LegacyRef, forwardRef, useMemo } from 'react'
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
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

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

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
    ref: LegacyRef<React.ElementRef<typeof View>>
  ) => {
    const isDisabled = disabled || loading

    const textStyles = useMemo<TextStyle>(() => {
      return StyleSheet.flatten([styles.btnText, textStyle])
    }, [textStyle])

    return (
      <Touchable
        hitSlop={hitSlop}
        activeOpacity={0.5}
        onPress={() => onPress?.()}
        disabled={!allowPressWhenDisabled ? isDisabled : undefined}
      >
        <View ref={ref} style={[styles.btn, style, disabled && styles.disabled]}>
          {loading ? <ActivityIndicator size={16} color={textStyles.color as string} /> : prefixIcon}
          {typeof title === 'string' ? (
            <Text numberOfLines={numberOfLines} style={textStyles}>
              {title}
            </Text>
          ) : (
            title
          )}
          {suffixIcon}
        </View>
      </Touchable>
    )
  }
)

export default Button

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Spacings.sm,
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
})
