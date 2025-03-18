import { memo, useEffect } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import styles from './styles'

type PercentBarProps = {
  percent: number
  height?: number
  style?: StyleProp<ViewStyle>
}

const PercentBar = memo(({ style, percent, height = 8 }: PercentBarProps) => {
  const animatedWidth = useSharedValue(0)

  useEffect(() => {
    animatedWidth.value = withTiming(percent, { duration: 500 })
  }, [percent])

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }))

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.bar, { height }]}>
        <Animated.View style={[styles.percent, animatedStyle]} />
      </View>
      <Text style={styles.percentLabel}>{`${percent}%`}</Text>
    </View>
  )
})

export default PercentBar
