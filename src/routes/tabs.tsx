import {
  BagFillIcon,
  BagIcon,
  ClockFillIcon,
  ClockIcon,
  HomeFillIcon,
  HomeIcon,
  UserSquareFillIcon,
  UserSquareIcon,
  WorkFillIcon,
  WorkIcon,
} from '@/assets'
import { BottomTabs } from '@/components'
import { RouteData, Tabs as RouteTabs } from '@/routes'
import { Account, CustomersToCheckIn, Home } from '@/screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, unmountOnBlur: false, tabBarHideOnKeyboard: true }}
      tabBar={(props) => <BottomTabs {...props} routes={bottomTabs} />}
    >
      {bottomTabs.map(({ Component, route }) => (
        <Tab.Screen key={route} name={route} component={Component} />
      ))}
    </Tab.Navigator>
  )
}

const bottomTabs: RouteData[] = [
  {
    route: RouteTabs.HomeTab,
    label: 'Trang chủ',
    Component: Home,
    Icon: HomeIcon,
    IconActive: HomeFillIcon,
  },
  {
    route: RouteTabs.WorkTab,
    label: 'Công việc',
    Component: CustomersToCheckIn,
    Icon: WorkIcon,
    IconActive: WorkFillIcon,
  },
  {
    route: RouteTabs.OrderTab,
    label: 'Đặt hàng',
    Component: () => null,
    Icon: BagIcon,
    IconActive: BagFillIcon,
  },
  {
    route: RouteTabs.HistoryTab,
    label: 'Lịch sử',
    Component: () => null,
    Icon: ClockIcon,
    IconActive: ClockFillIcon,
  },
  {
    route: RouteTabs.AccountTab,
    label: 'Cá nhân',
    Component: Account,
    Icon: UserSquareIcon,
    IconActive: UserSquareFillIcon,
  },
]
