import { Colors, Typography } from '@/theme'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Button } from '../../button'

export type EmptyProps = {
  title?: string | JSX.Element
  children?: JSX.Element
  icon?: JSX.Element
  titleBtn?: string
  style?: StyleProp<ViewStyle>
  onBtnPress?: () => void
}

const Empty = ({ onBtnPress, icon, children, titleBtn, style, title = 'Không có dữ liệu' }: EmptyProps) => {
  return (
    <View style={[styles.container, style]}>
      {icon ?? (
        <SvgXml xml='<svg width="124" height="101" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><title>No data</title><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>' />
      )}
      {typeof title === 'string' ? <Text style={styles.title}>{title}</Text> : title}
      {titleBtn ? <Button title={titleBtn} onPress={() => onBtnPress?.()} /> : null}
      {children}
    </View>
  )
}

export default Empty

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    ...Typography.body16Normal,
    color: Colors.gray60,
    textAlign: 'center',
  },
})
