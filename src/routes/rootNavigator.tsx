import { Routes } from '@/routes'
import {
  ChangePassword,
  CheckInCustomer,
  CheckinHistories,
  CreateAddress,
  CreateCustomer,
  CreateInventory,
  CreateRating,
  customerDetail,
  DebtDetail,
  Debts,
  Inventories,
  LoyaltyHistories,
  MapViewSelectCoordinate,
  OrderDetail,
  OrderHistories,
  RatingHistories,
  RouteList,
  ScanBarcode,
  SelectCustomer,
  SelectProductVariant,
  UpdateRoute,
  UpdateUserInfo,
} from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from './tabs'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Home} screenOptions={{ headerShown: false, animation: 'ios_from_right' }}>
      <Stack.Screen name={Routes.Home} component={Tabs} />
      <Stack.Screen name={Routes.ChangePassword} component={ChangePassword} />

      {/* Routes feature */}
      <Stack.Group>
        <Stack.Screen name={Routes.RouteList} component={RouteList} />
        <Stack.Screen name={Routes.RouteDetail} component={UpdateRoute} />
        <Stack.Screen name={Routes.CheckinCustomer} component={CheckInCustomer} />
        <Stack.Screen name={Routes.CreateInventory} component={CreateInventory} />
        <Stack.Screen name={Routes.CreateRating} component={CreateRating} />
        <Stack.Screen name={Routes.CustomerDetail} component={customerDetail} />
        <Stack.Screen name={Routes.DebtDetail} component={DebtDetail} />
      </Stack.Group>

      {/* Shared screens */}
      <Stack.Group>
        <Stack.Screen name={Routes.SelectCustomer} component={SelectCustomer} />
        <Stack.Screen name={Routes.CreateAddress} component={CreateAddress} />
        <Stack.Screen name={Routes.CreateCustomer} component={CreateCustomer} />
        <Stack.Screen name={Routes.UpdateUserInfo} component={UpdateUserInfo} />
        <Stack.Screen name={Routes.ScanBarcode} component={ScanBarcode} />
        <Stack.Screen name={Routes.SelectProductVariant} component={SelectProductVariant} />
        <Stack.Screen name={Routes.MapViewSelectCoordinate} component={MapViewSelectCoordinate} />
        <Stack.Screen name={Routes.Inventories} component={Inventories} />
        <Stack.Screen name={Routes.CheckinHistories} component={CheckinHistories} />
        <Stack.Screen name={Routes.Debts} component={Debts} />
        <Stack.Screen name={Routes.RatingHistories} component={RatingHistories} />
        <Stack.Screen name={Routes.OrderHistories} component={OrderHistories} />
        <Stack.Screen name={Routes.LoyaltyHistories} component={LoyaltyHistories} />
      </Stack.Group>

      {/* Shared screens */}
      <Stack.Group>
        <Stack.Screen name={Routes.OrderDetail} component={OrderDetail} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
