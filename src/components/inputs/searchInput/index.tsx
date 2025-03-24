/* eslint-disable react-hooks/exhaustive-deps */
import { Colors } from '@/theme'
import debounce from 'lodash/debounce'
import { forwardRef, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { styles } from './style'

export type SearchInputProps = Omit<TextInputProps, 'onChangeText' | 'onChange'> & {
  /**
   * Defines the debounce delay in milliseconds. If this prop is provided,
   * `onChangeText` will be triggered after the specified delay.
   */
  delay?: number

  /**
   * Style for the input container.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Style for the input field.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Left element inside the input field.
   */
  left?: ReactNode

  /**
   * Size of the search icon.
   */
  searchIconSize?: number

  /**
   * Color of the search icon.
   */
  searchIconColor?: string

  /**
   * Size of the clear (close) icon.
   */
  clearIconSize?: number

  /**
   * Right element inside the input field.
   * This element will be visible only when the input is empty.
   */
  right?: ReactNode

  /**
   * Callback fired when the clear (close) icon is pressed.
   */
  onClearValue?: () => void

  /**
   * Callback fired when the input value changes.
   * - If `delay` is provided, `onChangeText` is debounced and wrapped with `useCallback([])`,
   *   meaning it will not capture the latest state updates within its closure.
   * - If `delay` is not provided, `onChangeText` behaves normally without debounce.
   */
  onChange?: (val: string) => void
}

const SearchInput = forwardRef<TextInput, SearchInputProps>(
  (
    {
      delay,
      style,
      inputStyle,
      left,
      right,
      defaultValue,
      placeholder = 'Tìm kiếm',
      value: externalValue,
      searchIconColor = Colors.gray50,
      searchIconSize = 16,
      clearIconSize = 18,
      onChange: externalOnChange,
      onClearValue,
      onFocus,
      onBlur,
      ...attributes
    },
    ref
  ) => {
    const [value, setValue] = useState<string | undefined>(defaultValue)
    const valueRef = useRef<string | undefined>(value)

    const isFocused = useSharedValue(false)

    const borderAnimatedStyle = useAnimatedStyle(() => ({
      borderColor: withTiming(isFocused.value ? Colors.active : Colors.transparent, { duration: 200 }),
    }))

    useEffect(() => {
      if (externalValue !== valueRef.current) {
        handleSetValue(externalValue)
      }
    }, [externalValue])

    const handleSetValue = useCallback((value: string | undefined) => {
      setValue(value)
      valueRef.current = value
    }, [])

    const debounceFn = useCallback(
      debounce((value: string) => {
        externalOnChange?.(value)
      }, delay),
      []
    )

    const handleChange = useCallback(
      (value: string) => {
        handleSetValue(value)
        if (typeof delay === 'number' && delay > 0) {
          debounceFn(value)
        } else {
          externalOnChange?.(value)
        }
      },
      [debounceFn, delay, externalOnChange, handleSetValue]
    )

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(e)
        isFocused.value = true
      },
      [onFocus]
    )

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(e)
        isFocused.value = false
      },
      [onBlur]
    )

    const clearValue = useCallback(() => {
      handleChange('')
      onClearValue?.()
    }, [onClearValue])

    return (
      <Animated.View style={[styles.inputContainer, borderAnimatedStyle, style]}>
        {left ?? (
          <Svg width={searchIconSize} height={searchIconSize} viewBox="0 0 14 14" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.94997 11.9C2.66389 11.9 0 9.23609 0 5.95C0 2.66391 2.66389 0 5.94997 0C9.23604 0 11.8999 2.66391 11.8999 5.95C11.8999 7.3408 11.4228 8.62014 10.6232 9.63324L13.7949 12.805C14.0683 13.0784 14.0683 13.5216 13.7949 13.7949C13.5215 14.0683 13.0783 14.0683 12.805 13.7949L9.63324 10.6232C8.62014 11.4228 7.34078 11.9 5.94997 11.9ZM9.21227 9.12178C9.19602 9.13533 9.18024 9.14973 9.16498 9.16499C9.14974 9.18023 9.13535 9.196 9.1218 9.21224C8.30228 10.0091 7.18351 10.4999 5.95013 10.4999C3.43724 10.4999 1.40015 8.4628 1.40015 5.9499C1.40015 3.43701 3.43724 1.3999 5.95013 1.3999C8.46301 1.3999 10.5001 3.43701 10.5001 5.9499C10.5001 7.18339 10.0093 8.30223 9.21227 9.12178Z"
              fill={searchIconColor}
            />
          </Svg>
        )}
        <TextInput
          ref={ref}
          value={value}
          autoCorrect={false}
          testID="search-input"
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={Colors.gray50}
          style={[styles.inputText, inputStyle]}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={handleChange}
          {...attributes}
        />
        {value ? (
          <TouchableOpacity hitSlop={8} activeOpacity={0.5} onPress={clearValue}>
            <Svg
              stroke={Colors.gray50}
              fill={Colors.gray50}
              strokeWidth="0"
              viewBox="0 0 512 512"
              height={clearIconSize}
              width={clearIconSize}
            >
              <Path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
            </Svg>
          </TouchableOpacity>
        ) : (
          right
        )}
      </Animated.View>
    )
  }
)

export default SearchInput
