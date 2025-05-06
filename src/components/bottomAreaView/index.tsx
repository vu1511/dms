import { BaseStyles, Colors } from '@/theme'
import { memo, ReactNode, useMemo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type BottomAreaViewProps = {
  children?: ReactNode
  bgColor?: string
  shadowVisible?: boolean
  style?: StyleProp<ViewStyle>
}

const BottomAreaView = memo(
  ({ children, bgColor = Colors.white, style, shadowVisible = true }: BottomAreaViewProps) => {
    const { bottom } = useSafeAreaInsets()

    const styles = useMemo(
      () => [
        { backgroundColor: bgColor },
        !!children && BaseStyles.p16,
        bottom > 16 && { paddingBottom: bottom },
        shadowVisible && BaseStyles.shadowLg,
        style,
      ],
      [bgColor, bottom, children, shadowVisible, style]
    )

    return <View style={styles}>{children}</View>
  }
)

export default BottomAreaView
