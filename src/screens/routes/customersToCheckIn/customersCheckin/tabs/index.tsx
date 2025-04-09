import { BaseStyles, Colors, Typography } from '@/theme'
import { Option, RouteTypeCheckIn } from '@/types'
import { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type TabsProps = {
  visitedCount: number
  unVisitedCount: number
  typeCheckin: RouteTypeCheckIn
  onChange(value: RouteTypeCheckIn): void
}

export const Tabs = ({ visitedCount, unVisitedCount, typeCheckin, onChange }: TabsProps) => {
  const { width } = useWindowDimensions()

  const options = useMemo<(Option<RouteTypeCheckIn> & { subTitle: string })[]>(
    () => [
      { label: 'Chưa thăm', value: 'no_visited', subTitle: ` (${unVisitedCount})` },
      { label: 'Đã thăm', value: 'visited', subTitle: ` (${visitedCount})` },
      { label: 'Tất cả', value: 'all', subTitle: ` (${visitedCount + unVisitedCount})` },
    ],
    [unVisitedCount, visitedCount]
  )

  const tabWidth = (width - 32 - 4) / options.length
  const [index, setIndex] = useState(options?.findIndex((item) => item.value === typeCheckin) ?? 0)
  const indexAnimatedValue = useSharedValue(index)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: interpolate(indexAnimatedValue.value, [0, 1, 2], [2, tabWidth + 2, tabWidth * 2 + 2], Extrapolation.CLAMP),
      width: tabWidth,
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Animated.View style={[styles.line, animatedStyle]} />
        {options.map((item, idx) => {
          const isActive = idx === index

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.5}
              disabled={isActive}
              style={styles.tabItem}
              onPress={() => {
                setIndex(idx)
                onChange(item.value)
                indexAnimatedValue.value = withTiming(idx)
              }}
            >
              <Text numberOfLines={1} style={isActive ? styles.titleActive : styles.title}>
                {item.label}
              </Text>
              <Text style={isActive ? styles.subTitleActive : styles.subTitle}>{item.subTitle}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  line: {
    backgroundColor: Colors.white,
    height: 32,
    borderRadius: 8,
    position: 'absolute',
  },
  tabs: {
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 2,
    backgroundColor: Colors.background,
    ...BaseStyles.flexRowItemsCenter,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 32,
    flex: 1,
  },
  title: {
    ...Typography.body14SemiBold,
    color: Colors.gray70,
    flexShrink: 1,
  },
  titleActive: {
    ...Typography.body14SemiBold,
    flexShrink: 1,
  },
  subTitle: {
    ...Typography.body12Normal,
    color: Colors.gray70,
  },
  subTitleActive: {
    ...Typography.body12Normal,
  },
})
