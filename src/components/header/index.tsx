import { BaseStyles, Colors, Typography } from '@/theme'
import { ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

export type HeaderProps = {
  title?: ReactNode
  edgeWidth?: number
  children?: ReactNode
  left?: ReactNode
  leftStyle?: StyleProp<ViewStyle>
  right?: ReactNode
  rightStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const Header = ({
  children,
  title,
  style,
  edgeWidth = 40,
  containerStyle,
  left,
  right,
  leftStyle,
  rightStyle,
}: HeaderProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.header, !!children && styles.pb8, style]}>
        <View style={[{ width: edgeWidth }, leftStyle]}>{left}</View>
        <View style={styles.headerContent}>
          {!!title &&
            (typeof title === 'string' ? (
              <Text numberOfLines={1} style={styles.headerTitle}>
                {title}
              </Text>
            ) : (
              title
            ))}
        </View>
        <View style={[styles.headerRight, { width: edgeWidth }, rightStyle]}>{right}</View>
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  header: {
    ...BaseStyles.flexRowItemsCenter,
    height: 52,
    paddingHorizontal: 16,
  },
  pb8: {
    paddingBottom: 8,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    ...Typography.body16SemiBold,
    textAlign: 'center',
  },
})

export default Header
