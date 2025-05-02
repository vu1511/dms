import { BaseStyles, Colors } from '@/theme'
import { useEffect, useState } from 'react'
import { Portal } from 'react-native-portalize'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import ActivityIndicator from '../activityIndicator'

export type BackdropProps = {
  isVisible?: boolean
}

const Backdrop = ({ isVisible, ...rest }: BackdropProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible)

  const opacity = useSharedValue(0)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      opacity.value = withTiming(1, { duration: 300 })
    } else {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setShouldRender)(false)
      })
    }
  }, [isVisible, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  if (!shouldRender) return null

  return (
    <Portal>
      <Animated.View style={[{ flex: 1, backgroundColor: Colors.black50, ...BaseStyles.flexCenter }, animatedStyle]}>
        <ActivityIndicator size={32} color={Colors.white} {...rest} />
      </Animated.View>
    </Portal>
  )
}

export default Backdrop
