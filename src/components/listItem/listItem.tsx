import { Colors } from '@/theme'
import { ReactNode } from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { styles } from './style'

export type ListItemProps = {
  onPress?: () => void
  title: string | ReactNode
  numberOfLines?: number
  titleStyle?: StyleProp<TextStyle>
  active?: boolean
  disabled?: boolean
  readOnly?: boolean
  style?: StyleProp<ViewStyle>
  left?: string | ReactNode
  right?: string | ReactNode
}

const ListItem = ({
  onPress,
  style,
  title,
  numberOfLines = 2,
  active,
  readOnly,
  titleStyle,
  left,
  right,
  disabled,
}: ListItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} disabled={readOnly || disabled || !onPress} onPress={() => onPress?.()}>
      <View style={[styles.container, disabled && styles.disabled, style]}>
        {left}
        {typeof title === 'string' ? (
          <Text numberOfLines={numberOfLines} style={[styles.text, titleStyle, active && styles.textActive]}>
            {title}
          </Text>
        ) : (
          title
        )}
        {right ??
          (active ? (
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 6.99997L19.5899 5.58997L8.99991 16.17Z"
                fill={Colors.active}
              />
            </Svg>
          ) : null)}
      </View>
    </TouchableOpacity>
  )
}

export default ListItem
