/* eslint-disable react/no-unused-prop-types */
import { isAndroid, isIOS } from '@/constants'
import { BaseStyles, Colors } from '@/theme'
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
  sizeIncrease?: number
  color?: string
  backgroundColor?: string
  loading?: boolean
  disabled?: boolean
  readOnly?: boolean
  onPress?: () => void
  icon: ((props: IconProps) => React.ReactElement) | React.ReactElement
  style?: StyleProp<ViewStyle>
  hitSlop?: null | Insets | number | undefined
}

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight

const IconButton = memo(
  forwardRef<View, IconButtonProps>(
    (
      {
        onPress,
        style,
        icon,
        size = 24,
        sizeIncrease = 12,
        color = Colors.primary,
        backgroundColor = Colors.transparent,
        loading,
        hitSlop,
        disabled,
        readOnly = false,
      },
      ref
    ) => {
      const isBgTransparent = backgroundColor === Colors.transparent

      const btnIconStyles = useMemo<StyleProp<ViewStyle>>(() => {
        const btnSize = size + sizeIncrease
        return [
          {
            width: btnSize,
            height: btnSize,
            backgroundColor,
            borderRadius: btnSize / 2,
          },
          isAndroid &&
            isBgTransparent && {
              position: 'absolute',
              left: -sizeIncrease / 2,
              top: -sizeIncrease / 2,
            },
          disabled && BaseStyles.opacity50,
          styles.btnIcon,
          style,
        ]
      }, [size, style, backgroundColor, isBgTransparent, sizeIncrease, disabled])

      const btnStyles = useMemo<StyleProp<ViewStyle>>(
        () => [
          styles.btn,
          isIOS &&
            isBgTransparent && {
              position: 'absolute',
              top: -sizeIncrease / 2,
              left: -sizeIncrease / 2,
            },
        ],
        [isBgTransparent, sizeIncrease]
      )

      const wrapperStyle = useMemo<StyleProp<ViewStyle>>(() => ({ height: size, width: size }), [size])

      const RenderContent = useMemo(() => {
        return (
          <Touchable
            hitSlop={hitSlop}
            style={btnStyles}
            onPress={() => onPress?.()}
            underlayColor="rgba(153, 153, 153, 0.2)"
            disabled={disabled || loading || readOnly || !onPress}
          >
            <View ref={ref} style={btnIconStyles}>
              {typeof icon === 'function' ? icon({ fill: color, size: size }) : icon}
            </View>
          </Touchable>
        )
      }, [btnIconStyles, btnStyles, color, disabled, hitSlop, icon, loading, readOnly, ref, size, onPress])

      if (isBgTransparent) {
        return <View style={wrapperStyle}>{RenderContent}</View>
      }

      return RenderContent
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
