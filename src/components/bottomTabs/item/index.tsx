import { Colors, Typography } from '@/theme'
import { IconProps } from '@/types'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

interface BottomTabsItemProps {
  label: string
  active?: boolean
  onPress?: () => void
  RenderIcon: (_: IconProps) => JSX.Element
}

export const BottomTabsItem = ({ label, active = false, onPress, RenderIcon }: BottomTabsItemProps) => {
  return (
    <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple(Colors.gray30, true)}>
      <View style={styles.container}>
        <RenderIcon fill={active ? Colors.primary : Colors.gray70} size={24} />
        <Text numberOfLines={1} style={!active ? styles.label : styles.labelActive}>
          {label}
        </Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
    rowGap: 4,
    padding: 8,
  },
  label: {
    ...Typography.body10Normal,
    fontSize: 11,
    color: Colors.gray70,
  },
  labelActive: {
    ...Typography.body10SemiBold,
    fontSize: 11,
    color: Colors.active,
  },
})
