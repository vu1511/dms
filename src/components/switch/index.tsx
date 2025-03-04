import { BaseStyles, Colors } from '@/theme'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { type Insets, Pressable, type StyleProp, type ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const PADDING = 2

export type SwitchProps = {
  /**
   * Controlled value of the switch.
   * Determines if the switch is in controlled mode.
   */
  value?: boolean

  /**
   * Initial value of the switch when uncontrolled.
   * Default value is `false`
   */
  defaultValue?: boolean

  /**
   * Makes the switch read-only, allowing visual updates but preventing state changes from user input.
   * Default value is `false`.
   */
  readOnly?: boolean

  /**
   * Disables the switch, preventing user interactions.
   * Default value is `false`.
   */
  disabled?: boolean

  /**
   * Background color when the switch is ON.
   * Default value is `#16A1FD`
   */
  activeColor?: string

  /**
   * Background color when the switch is OFF.
   * Default value is `#dcdde1`
   */
  inActiveColor?: string

  /**
   * Color of the thumb (slider).
   * Default value is `#ffffff`
   */
  thumbColor?: string

  /**
   * Width of the switch track.
   * Default value is `52`.
   */
  switchWidth?: number

  /**
   * Height of the switch track.
   * Default value is `30`.
   */
  switchHeight?: number

  /**
   * Diameter of the thumb.
   * Default value is `26`.
   */
  thumbSize?: number

  /**
   * Additional touchable area for interactions
   */
  hitSlop?: null | Insets | number | undefined

  /**
   * Callback called with the new value when it changes.
   */
  onChange?: (value: boolean) => void
}

const Switch = memo(
  ({
    onChange,
    hitSlop,
    disabled = false,
    readOnly = false,
    value: externalActive,
    defaultValue = false,
    thumbColor = Colors.white,
    switchWidth = 52,
    switchHeight = 30,
    thumbSize = 26,
    activeColor = Colors.active,
    inActiveColor = '#dcdde1',
  }: SwitchProps) => {
    const isControlled = typeof externalActive === 'boolean'
    const [internalActive, setInternalActive] = useState(defaultValue)
    const active = isControlled ? externalActive : internalActive

    const translateXAnimated = useSharedValue(active ? switchWidth - thumbSize - PADDING * 2 : 0)
    const backgroundAnimated = useSharedValue(active ? activeColor : inActiveColor)

    useEffect(() => {
      translateXAnimated.value = withSpring(active ? switchWidth - thumbSize - PADDING * 2 : 0, { duration: 1000 })
      backgroundAnimated.value = withTiming(active ? activeColor : inActiveColor)
    }, [active, translateXAnimated])

    const toggleSwitch = useCallback(() => {
      if (isControlled) {
        onChange?.(!externalActive)
      } else {
        setInternalActive((prev) => {
          const newState = !prev
          onChange?.(newState)
          return newState
        })
      }
    }, [onChange, externalActive, isControlled])

    const animatedCircleStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateXAnimated.value }],
    }))

    const animatedBgStyle = useAnimatedStyle(() => ({
      backgroundColor: backgroundAnimated.value,
    }))

    const switchStyle = useMemo<StyleProp<ViewStyle>>(() => {
      return [
        {
          width: switchWidth,
          height: switchHeight,
          borderRadius: switchHeight / 2,
          justifyContent: 'center',
          paddingHorizontal: PADDING,
        },
        animatedBgStyle,
      ]
    }, [switchHeight, switchWidth, animatedBgStyle])

    const thumbStyle = useMemo<StyleProp<ViewStyle>>(() => {
      return [
        {
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          backgroundColor: thumbColor,
        },
        animatedCircleStyle,
      ]
    }, [thumbSize, thumbColor, animatedCircleStyle])

    return (
      <Pressable
        hitSlop={hitSlop}
        testID="switch-btn"
        onPress={toggleSwitch}
        disabled={disabled || readOnly}
        style={[BaseStyles.alignSelfStart, disabled && BaseStyles.opacity50]}
      >
        <Animated.View style={switchStyle} testID="switch-area">
          <Animated.View style={thumbStyle} testID="switch-thumb" />
        </Animated.View>
      </Pressable>
    )
  }
)

export default Switch
