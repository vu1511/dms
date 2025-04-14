import { Colors, Typography } from '@/theme'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

/**
 * Props for the UploadProgressBar component.
 */
export type UploadProgressBarProps = {
  /**
   * Whether the progress bar is actively animating (upload in progress).
   */
  isLoading: boolean

  /**
   * The color of the progress fill bar.
   *
   */
  color?: string

  /**
   * The background color of the progress bar container.
   *
   */
  bgColor?: string

  /**
   * The height of the progress bar.
   *
   * @default 2
   */
  height?: number

  /**
   * Custom style applied to the outer container.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional label (usually a percentage or status) to display inside or alongside the bar.
   */
  label?: ReactNode

  /**
   * The border radius of the progress bar container and fill.
   *
   * @default 2
   */
  borderRadius?: number

  /**
   * Defines the simulated progress animation timeline.
   *
   * Each item is a tuple: `[timestampInMs, progressPercentage]`.
   * The component will animate the progress bar to the given percentage at the specified time.
   *
   * > ⚠️ Note: `progressPercentage` should be **less than 100**.
   * >
   * > When `isLoading` becomes `false`, the progress will automatically jump to **100%** to represent completion.
   *
   * Example:
   * ```ts
   * progresses = [
   *   [0, 10],       // At 0ms, progress is 10%
   *   [1000, 30],    // At 1000ms, progress is 30%
   *   [2000, 40],    // At 2000ms, progress is 40%
   *   [3000, 60],    // At 3000ms, progress is 60%
   *   [6000, 80],    // At 6000ms, progress is 80%
   *   [10000, 90],   // At 10000ms, progress is 90%
   * ]
   * ```
   */
  progresses?: [number, number][]

  /**
   * Content to render once the upload is complete (`isLoading` becomes `false`).
   *
   * Useful for rendering confirmation messages, icons, or follow-up UI after a successful upload.
   */
  children?: ReactNode

  /**
   * Total duration (in milliseconds) to simulate the entire progress animation,
   * which can be used to normalize or control timing externally.
   *
   * This prop is optional. If not provided, the duration will be inferred from the
   * highest timestamp in the `progresses` array.
   *
   * @default 300
   */
  duration?: number
}

const UploadProgressBar: React.FC<UploadProgressBarProps> = ({
  style,
  children,
  isLoading,
  height = 2,
  duration = 300,
  borderRadius = 2,
  label = 'Đang tải...',
  bgColor = Colors.inputBg,
  color = Colors.active,
  progresses = [
    [0, 10],
    [1000, 30],
    [2000, 40],
    [3000, 60],
    [6000, 80],
    [10000, 90],
  ],
}) => {
  const progress = useSharedValue(0)
  const timeoutRef = useRef<NodeJS.Timeout[]>([])
  const [shouldRender, setShouldRender] = useState(!isLoading)

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }))

  useEffect(() => {
    progress.value = 0
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []

    if (isLoading) {
      setShouldRender(false)
      progresses.forEach(([ms, percentage]) => {
        timeoutRef.current.push(
          setTimeout(() => {
            progress.value = withTiming(percentage / 100, { duration: duration })
          }, ms)
        )
      })
    }

    if (!isLoading) {
      progress.value = withTiming(1, { duration: duration }, () => {
        runOnJS(setShouldRender)(true)
      })
    }

    return () => {
      timeoutRef.current.forEach(clearTimeout)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, isLoading])

  if (shouldRender) {
    return children
  }

  return (
    <View style={[styles.container, style]}>
      {!label ? null : typeof label === 'string' ? (
        <Text style={styles.text} numberOfLines={1}>
          Đang tải...
        </Text>
      ) : (
        label
      )}
      <View style={[styles.bar, { backgroundColor: bgColor, borderRadius }]}>
        <Animated.View style={[styles.bar, { height: height, backgroundColor: color, borderRadius }, animatedStyle]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    gap: 8,
  },
  bar: {
    backgroundColor: Colors.primary,
  },
  barInner: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  text: {
    ...Typography.body12Normal,
    color: Colors.gray70,
    flexShrink: 1,
  },
})

export default UploadProgressBar
