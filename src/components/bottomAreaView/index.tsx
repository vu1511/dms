import { Colors } from '@/theme'
import { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type BottomAreaViewProps = {
  children?: ReactNode
  bgColor?: string
  shadowVisible?: boolean
  style?: StyleProp<ViewStyle>
}

const BottomAreaView = ({ children, bgColor = Colors.white, style, shadowVisible = true }: BottomAreaViewProps) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={[
        { backgroundColor: bgColor },
        !!children && styles.p16,
        bottom > 16 && { paddingBottom: bottom },
        shadowVisible && styles.shadow,
        style,
      ]}
    >
      {children}
    </View>
  )
}

export default BottomAreaView

const styles = StyleSheet.create({
  p16: {
    padding: 16,
  },
  shadow: {
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
})
