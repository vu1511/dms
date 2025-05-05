import { BaseStyles, Colors } from '@/theme'
import { ReactNode, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  SlideInRight,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type MovableScreenProps = {
  visible: boolean
  movableScreen: ReactNode
  duration?: number
  children: ReactNode
}

const MovableScreen = ({ children, movableScreen, duration = 250, visible }: MovableScreenProps) => {
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withTiming(visible ? 0 : 1, { duration })
  }, [duration, opacity, visible])

  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <>
      {visible && (
        <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.movableScreen}>
          {movableScreen}
        </Animated.View>
      )}
      <Animated.View style={[BaseStyles.flex1, animatedOpacityStyle]}>{children}</Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  movableScreen: {
    ...BaseStyles.absoluteInset,
    flex: 1,
    zIndex: 10,
    backgroundColor: Colors.white,
  },
})

export default MovableScreen
