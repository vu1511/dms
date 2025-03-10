import { Colors } from '@/theme'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

export type ListItemSeparatorProps = {
  style?: StyleProp<ViewStyle>
  innerStyle?: StyleProp<ViewStyle>
}

const ListItemSeparator = ({ style, innerStyle }: ListItemSeparatorProps) => {
  return (
    <View style={[styles.outer, style]}>
      <View style={[styles.inner, innerStyle]} />
    </View>
  )
}

export default ListItemSeparator

const styles = StyleSheet.create({
  outer: {
    backgroundColor: Colors.white,
  },
  inner: {
    height: 1,
    backgroundColor: Colors.border,
  },
})
