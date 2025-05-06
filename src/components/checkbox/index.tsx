import { BaseStyles, Colors, Spacings } from '@/theme'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { type Insets, Pressable, StyleProp, View, ViewStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

export type CheckboxProps = {
  /**
   * Determines the type of the checkbox, one of `checkbox`, `radio`.
   * Default value is `checkbox`.
   */
  type?: 'checkbox' | 'radio'

  /**
   * Makes the checkbox read-only, allowing visual updates but preventing state changes from user input.
   * Default value is `false`.
   */
  readOnly?: boolean

  /**
   * Disables the checkbox, preventing user interactions.
   * Default value is `false`.
   */
  disabled?: boolean

  /**
    Diameter of the checkbox.
    Default value is `20`.
  */
  size?: number

  /**
    Background color when the checkbox is OFF.
    Default value is `#d9d9d9`
  */
  inActiveColor?: string

  /**
    Background color when the checkbox is ON.
    Default value is `#16A1FD`
  */
  activeColor?: string

  /**
    Controlled value of the checkbox.
    Determines if the checkbox is in controlled mode.
  */
  value?: boolean

  /**
    Initial value of the checkbox when uncontrolled.
    Default value is `false`
  */
  defaultValue?: boolean

  /**
    Additional touchable area for interactions  
  */
  hitSlop?: null | Insets | number | undefined

  /**
    Callback called with the new value when it changes.
  */
  onChange?: (checked: boolean) => void
}

const Checkbox = memo(
  ({
    onChange,
    value,
    hitSlop,
    type = 'checkbox',
    defaultValue = false,
    disabled = false,
    readOnly = false,
    size = 20,
    activeColor = Colors.primary,
    inActiveColor = '#d9d9d9',
  }: CheckboxProps) => {
    const isControlled = typeof value === 'boolean'
    const [internalChecked, setInternalChecked] = useState(defaultValue)
    const checked = isControlled ? value : internalChecked

    const scale = useSharedValue(checked ? 1 : 0)
    const opacity = useSharedValue(checked ? 1 : 0)
    const background = useSharedValue(checked ? 1 : 0)

    useEffect(() => {
      background.value = withTiming(checked ? 1 : 0, { duration: 200 })
      opacity.value = withTiming(checked ? 1 : 0, { duration: 150 })
      if (checked) {
        scale.value = withSpring(1, { damping: 20, stiffness: 500 })
      } else {
        scale.value = withTiming(0, { duration: 150 })
      }
    }, [background, checked, opacity, scale])

    const toggleCheckbox = useCallback(() => {
      if (isControlled) {
        onChange?.(!value)
      } else {
        setInternalChecked((prev) => {
          const newState = !prev
          onChange?.(newState)
          return newState
        })
      }
    }, [isControlled, value, onChange])

    const animatedBackground = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(background.value, [0, 1], ['transparent', activeColor]),
      borderColor: interpolateColor(background.value, [0, 1], [inActiveColor, activeColor]),
    }))

    const checkmarkStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }))

    const sizeStyle = useMemo(() => ({ height: size, width: size }), [size])

    const wrapperStyle = useMemo(() => [sizeStyle, disabled && BaseStyles.opacity50], [disabled, sizeStyle])

    const checkboxStyle = useMemo<StyleProp<ViewStyle>>(() => {
      return [
        animatedBackground,
        sizeStyle,
        {
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: type === 'checkbox' ? Spacings.xs : size / 2,
        },
      ]
    }, [animatedBackground, sizeStyle, type, size])

    const radioCheckIconStyle = useMemo(
      () => ({
        width: size * 0.5,
        height: size * 0.5,
        backgroundColor: 'white',
        borderRadius: size / 2,
      }),
      [size]
    )

    return (
      <Pressable
        hitSlop={hitSlop}
        style={wrapperStyle}
        testID="checkbox-btn"
        onPress={toggleCheckbox}
        disabled={disabled || readOnly}
      >
        <Animated.View testID="checkbox-area" style={checkboxStyle}>
          <Animated.View testID="checkbox-icon-wrapper" style={checkmarkStyle}>
            {type === 'checkbox' ? (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID="checkbox-icon">
                <Path
                  fill="white"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 6.99997L19.5899 5.58997L8.99991 16.17Z"
                />
              </Svg>
            ) : (
              <View testID="checkbox-radio-icon" style={radioCheckIconStyle} />
            )}
          </Animated.View>
        </Animated.View>
      </Pressable>
    )
  }
)

export default Checkbox
