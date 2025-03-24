import { CloseIcon } from '@/assets'
import { IconButton } from '@/components/button'
import { BaseStyles, Colors, Spacings, Typography } from '@/theme'
import { forwardRef, ReactNode, useCallback, useEffect, useState } from 'react'
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type TextInputProps = Omit<RNTextInputProps, 'style'> & {
  onClearValue?(): void
  error?: boolean
  errorMsg?: string
  label?: string
  left?: ReactNode
  right?: ReactNode
  required?: boolean
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
}

const LABEL_HEIGHT = 18
const HEIGHT = 56

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      style,
      label,
      left,
      right,
      error = false,
      errorMsg,
      inputStyle,
      required = false,
      readOnly = false,
      disabled = false,
      value: externalValue,
      defaultValue,
      placeholder,
      onFocus,
      onBlur,
      onPress,
      onClearValue,
      onChangeText,
      ...rest
    },
    ref
  ) => {
    const isControlled = externalValue !== undefined

    const [isFocused, setIsFocused] = useState(false)
    const [text, setText] = useState(defaultValue)
    const value = isControlled ? externalValue : text

    const isLabelOnTop = isFocused || value
    const labelPosition = useSharedValue(isLabelOnTop ? 8 : (HEIGHT - LABEL_HEIGHT) / 2)
    const labelFontSize = useSharedValue(isLabelOnTop ? 12 : 16)
    const border = useSharedValue(error ? Colors.danger : isFocused ? Colors.active : Colors.inputBg)

    useEffect(() => {
      border.value = error ? Colors.danger : isFocused ? Colors.active : Colors.inputBg
    }, [border, error, isFocused])

    useEffect(() => {
      labelPosition.value = isLabelOnTop ? 8 : (HEIGHT - LABEL_HEIGHT) / 2
      labelFontSize.value = isLabelOnTop ? 12 : 16
    }, [isLabelOnTop, labelFontSize, labelPosition])

    const animatedLabelPositionStyle = useAnimatedStyle(() => {
      return {
        top: withTiming(labelPosition.value, { duration: 200 }),
      }
    })

    const animatedLabelFontSizeStyle = useAnimatedStyle(() => {
      return {
        fontSize: withTiming(labelFontSize.value, { duration: 200 }),
      }
    })

    const animatedBorderStyle = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(border.value, { duration: 200 }),
      }
    })

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(e)
        setIsFocused(true)
      },
      [setIsFocused, onFocus]
    )

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(e)
        setIsFocused(false)
      },
      [onBlur]
    )

    const handleChangeText = useCallback(
      (text: string) => {
        onChangeText?.(text)
        if (!isControlled) {
          setText(text)
        }
      },
      [isControlled, onChangeText]
    )

    return (
      <View style={[styles.container, style]}>
        <Pressable disabled={!onPress} onPress={onPress}>
          <Animated.View style={[styles.content, animatedBorderStyle, disabled && styles.disabled]}>
            {left && <View style={styles.inputLeft}>{left}</View>}
            <View style={styles.inputContainer}>
              {label && (
                <Animated.View style={[styles.labelArea, animatedLabelPositionStyle]}>
                  <Animated.Text style={[styles.label, animatedLabelFontSizeStyle]}>
                    {label}
                    {required && <Text style={styles.labelRequired}> *</Text>}
                  </Animated.Text>
                </Animated.View>
              )}
              <RNTextInput
                ref={ref}
                value={value}
                multiline={false}
                autoCorrect={false}
                autoCapitalize="none"
                style={[styles.input, inputStyle]}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChangeText={handleChangeText}
                placeholder={label && !isLabelOnTop ? undefined : placeholder}
                readOnly={readOnly || disabled}
                {...rest}
              />
            </View>
            {!!(onClearValue || right) && (
              <View style={styles.inputRight}>
                {!!(value && onClearValue) && (
                  <IconButton icon={CloseIcon} size={16} color={Colors.gray60} onPress={onClearValue} />
                )}
                {right}
              </View>
            )}
          </Animated.View>
        </Pressable>
        {error && !!errorMsg && <Text style={BaseStyles.inputErrorMessage}>{errorMsg}</Text>}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    rowGap: 4,
  },
  content: {
    borderRadius: Spacings.sm,
    height: HEIGHT,
    overflow: 'hidden',
    backgroundColor: Colors.inputBg,
    borderColor: Colors.inputBg,
    borderWidth: 1.5,
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.5,
  },
  inputContainer: {
    flex: 1,
  },
  inputLeft: {
    paddingLeft: 12,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
    columnGap: 24,
    height: '100%',
  },
  input: {
    ...Typography.body16Normal,
    lineHeight: undefined,
    flex: 1,
    zIndex: 1,
    paddingTop: 24,
    paddingBottom: 4,
    paddingHorizontal: 12,
  },
  label: {
    ...Typography.body12Normal,
    lineHeight: LABEL_HEIGHT,
  },
  labelRequired: {
    color: Colors.red,
  },
  labelArea: {
    height: LABEL_HEIGHT,
    position: 'absolute',
    left: 12,
    right: 12,
  },
})

export default TextInput
