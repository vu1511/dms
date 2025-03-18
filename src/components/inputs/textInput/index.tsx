import { Colors, Spacings, Typography } from '@/theme'
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

const LABEL_HEIGHT = 16
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
    }, [error, isFocused])

    useEffect(() => {
      labelPosition.value = isLabelOnTop ? 8 : (HEIGHT - LABEL_HEIGHT) / 2
      labelFontSize.value = isLabelOnTop ? 12 : 16
    }, [isLabelOnTop])

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
      [setIsFocused, onFocus]
    )

    const handleChangeText = useCallback(
      (text: string) => {
        onChangeText?.(text)
        if (!isControlled) {
          setText(text)
        }
      },
      [isControlled]
    )

    return (
      <View style={styles.container}>
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
            {right && <View style={styles.inputRight}>{right}</View>}
          </Animated.View>
        </Pressable>
        {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
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
    paddingRight: 12,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  errorMsg: {
    ...Typography.body14Normal,
    color: Colors.danger,
  },
})

export default TextInput
