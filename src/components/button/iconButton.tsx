/* eslint-disable react/no-unused-prop-types */
import { isAndroid, isIOS } from '@/constants'
import { Colors } from '@/theme'
import { IconProps } from '@/types'
import { forwardRef, memo, useMemo } from 'react'
import {
  Insets,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native'

export type IconButtonProps = {
  size?: number
  color?: string
  loading?: boolean
  disabled?: boolean
  readOnly?: boolean
  onPress?: () => void
  icon: ((props: IconProps) => React.ReactElement) | React.ReactElement
  style?: StyleProp<ViewStyle>
  hitSlop?: null | Insets | number | undefined
}

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight

const SIZE_INCREASE = 12

const IconButton = memo(
  forwardRef<View, IconButtonProps>(
    (
      { onPress, style, icon, size = 24, color = Colors.primary, loading, hitSlop, disabled, readOnly = false },
      ref
    ) => {
      const btnIconStyles = useMemo<StyleProp<ViewStyle>>(() => {
        const btnSize = size + SIZE_INCREASE
        return [
          {
            borderRadius: btnSize / 2,
            width: btnSize,
            height: btnSize,
          },
          isAndroid && { position: 'absolute', left: -SIZE_INCREASE / 2, top: -SIZE_INCREASE / 2 },
          styles.btnIcon,
          style,
        ]
      }, [size, style])

      const btnStyles = useMemo<StyleProp<ViewStyle>>(() => {
        return [styles.btn, isIOS && { position: 'absolute', top: -SIZE_INCREASE / 2, left: -SIZE_INCREASE / 2 }]
      }, [size])

      const wrapperStyle = useMemo<StyleProp<ViewStyle>>(() => {
        return { height: size, width: size }
      }, [size])

      return (
        <View style={wrapperStyle}>
          <Touchable
            hitSlop={hitSlop}
            style={btnStyles}
            onPress={() => onPress?.()}
            underlayColor={Colors.gray20}
            disabled={disabled || loading || readOnly || !onPress}
          >
            <View ref={ref} style={btnIconStyles}>
              {typeof icon === 'function' ? icon({ fill: color, size: size }) : icon}
            </View>
          </Touchable>
        </View>
      )
    }
  )
)

export default IconButton

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-start',
    borderRadius: 100,
  },
  btnIcon: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
})
