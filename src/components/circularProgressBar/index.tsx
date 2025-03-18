import { Colors, Typography } from '@/theme'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export type CircularProgressBarProps = {
  percentage: number // Value between 0 - 100
  radius?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  duration?: number
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  radius = 50,
  strokeWidth = 8,
  color = Colors.primary,
  backgroundColor = Colors.gray30,
  duration = 1000,
}) => {
  const size = radius * 2
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(percentage, { duration })
  }, [percentage])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value / 100),
  }))

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`} // Rotates to start from the top
          animatedProps={animatedProps}
        />
      </Svg>
      {/* Percentage Text */}
      <View style={[styles.textContainer, { width: size, height: size }]}>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    ...Typography.body18Bold,
  },
})

export default CircularProgressBar
