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

const IconButton = memo(
  forwardRef<View, IconButtonProps>(
    (
      { onPress, style, icon, size = 24, color = Colors.primary, loading, hitSlop, disabled, readOnly = false },
      ref
    ) => {
      const btnIconStyles = useMemo(() => {
        const btnSize = size + 12
        return [
          {
            borderRadius: btnSize / 2,
            width: btnSize,
            height: btnSize,
          },
          styles.btnIcon,
          style,
        ]
      }, [size, style])

      return (
        <Touchable
          hitSlop={hitSlop}
          style={styles.btn}
          onPress={() => onPress?.()}
          underlayColor={Colors.gray20}
          disabled={disabled || loading || readOnly || !onPress}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless(size - 4)}
        >
          <View ref={ref} style={btnIconStyles}>
            {typeof icon === 'function' ? icon({ fill: color, size: size }) : icon}
          </View>
        </Touchable>
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
