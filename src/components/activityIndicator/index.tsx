import { BaseStyles, Colors } from '@/theme'
import React, { memo, useEffect } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

export type ActivityIndicatorProps = {
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = memo(
  ({ color = Colors.gray80, size = 24, style }: ActivityIndicatorProps) => {
    const rotation = useSharedValue(0)

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }))

    useEffect(() => {
      rotation.value = withRepeat(withTiming(360, { duration: 600, easing: Easing.linear }), -1)
    }, [rotation])

    return (
      <View style={[BaseStyles.flexCenter, style]}>
        <Animated.View style={[{ width: size, height: size }, animatedStyles]}>
          <Svg fill="none" viewBox="0 0 24 24" width={size} height={size}>
            <Path
              fill={color}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 5a7 7 0 0 0-5.218 11.666A1 1 0 0 1 5.292 18a9 9 0 1 1 13.416 0 1 1 0 1 1-1.49-1.334A7 7 0 0 0 12 5Z"
            />
          </Svg>
        </Animated.View>
      </View>
    )
  }
)

export default ActivityIndicator
