/* eslint-disable react/no-unused-prop-types */
import { Colors, Spacings, Typography } from '@/theme'
import { forwardRef, memo, useMemo } from 'react'
import { Insets, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import ActivityIndicator from '../activityIndicator'

export type ButtonProps = {
  onPress?: () => void
  type?: 'button' | 'text'
  loading?: boolean
  disabled?: boolean
  readOnly?: boolean
  title?: string | React.ReactElement
  left?: React.ReactElement
  right?: React.ReactElement
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  hitSlop?: null | Insets | number | undefined
}

// const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const Button = memo(
  forwardRef<View, ButtonProps>(
    (
      {
        type = 'button',
        title,
        onPress,
        style,
        textStyle,
        left,
        right,
        loading,
        hitSlop,
        disabled = false,
        readOnly = false,
      },
      ref
    ) => {
      const btnStyles = useMemo<ViewStyle>(() => {
        return StyleSheet.flatten([type === 'button' ? styles.btn : styles.textBtn, style, disabled && styles.disabled])
      }, [type, style, disabled])

      const textStyles = useMemo<TextStyle>(() => {
        return StyleSheet.flatten([type === 'button' ? styles.btnLabel : styles.textBtnLabel, textStyle])
      }, [type, textStyle])

      const Loading = useMemo(() => {
        return <ActivityIndicator size={textStyles.lineHeight as number} color={textStyles.color as string} />
      }, [textStyles])

      return (
        <TouchableOpacity
          ref={ref}
          hitSlop={hitSlop}
          style={btnStyles}
          activeOpacity={0.5}
          onPress={() => onPress?.()}
          disabled={disabled || loading || readOnly || !onPress}
        >
          {left && (loading ? Loading : left)}
          {typeof title === 'string' ? (
            <Text numberOfLines={1} style={textStyles}>
              {title}
            </Text>
          ) : (
            title
          )}
          {loading && !left ? Loading : right}
        </TouchableOpacity>
      )
    }
  )
)

export default Button

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  btn: {
    height: 48,
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderRadius: Spacings.sm,
    backgroundColor: Colors.primary,
  },
  btnLabel: {
    flexShrink: 1,
    ...Typography.body16SemiBold,
    color: Colors.white,
  },
  textBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    columnGap: 4,
    flexShrink: 1,
  },
  textBtnLabel: {
    flexShrink: 1,
    ...Typography.body16Medium,
    color: Colors.primary,
  },
})
