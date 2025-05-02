import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

interface CouponItemProps {
  disabled?: boolean
  label: string
  style?: ViewStyle
}

export const CouponItem = ({ label, disabled, style }: CouponItemProps) => {
  return (
    <View style={[styles.container, disabled && BaseStyles.opacity50, style]}>
      <View style={[styles.concave, { left: -4 }]} />
      <View style={styles.inner} />
      <Text numberOfLines={1} style={styles.text}>
        {label}
      </Text>
      <View style={[styles.concave, { right: -4 }]} />
    </View>
  )
}

const HEIGHT = 24
const CONCAVE_HEIGHT = 10

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    position: 'relative',
    height: HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    ...Typography.body12Normal,
    color: Colors.primary,
  },
  inner: {
    ...BaseStyles.absoluteInset,
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 4,
  },
  concave: {
    position: 'absolute',
    width: CONCAVE_HEIGHT,
    height: CONCAVE_HEIGHT,
    backgroundColor: Colors.white,
    borderRadius: 50,
    top: HEIGHT / 2 - CONCAVE_HEIGHT / 2,
    zIndex: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
})
