import { Routes } from '@/routes'
import {
  ChangePassword,
  CheckInCustomer,
  CreateAddress,
  CreateCustomer,
  CreateInventory,
  RouteList,
  ScanBarcode,
  SelectCustomer,
  SelectProductVariant,
  UpdateRoute,
} from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from './tabs'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Home} screenOptions={{ headerShown: false, animation: 'ios_from_right' }}>
      <Stack.Screen name={Routes.Home} component={Tabs} />

      <Stack.Screen name={Routes.ChangePassword} component={ChangePassword} />

      <Stack.Group>
        <Stack.Screen name={Routes.RouteList} component={RouteList} />
        <Stack.Screen name={Routes.RouteDetail} component={UpdateRoute} />
        <Stack.Screen name={Routes.CheckinCustomer} component={CheckInCustomer} />
        <Stack.Screen name={Routes.CreateInventory} component={CreateInventory} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name={Routes.SelectCustomer} component={SelectCustomer} />
        <Stack.Screen name={Routes.CreateAddress} component={CreateAddress} />
        <Stack.Screen name={Routes.CreateCustomer} component={CreateCustomer} />
        <Stack.Screen name={Routes.ScanBarcode} component={ScanBarcode} />
        <Stack.Screen name={Routes.SelectProductVariant} component={SelectProductVariant} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
