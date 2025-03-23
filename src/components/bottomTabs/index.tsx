import { RouteData } from '@/routes'
import { Colors } from '@/theme'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomTabsItem } from './item'

type Props = BottomTabBarProps & {
  routes: RouteData[]
}

const BottomTabs = ({ state, navigation, routes }: Props) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: bottom / 2 }]}>
      {routes.map(({ Icon, IconActive, label, route }, index) => {
        const active = state.index === index

        return (
          <BottomTabsItem
            key={route}
            label={label}
            active={active}
            RenderIcon={active ? IconActive : Icon}
            onPress={() => {
              navigation.navigate(route)
            }}
          />
        )
      })}
    </View>
  )
}

export default BottomTabs

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.gray80,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
})
