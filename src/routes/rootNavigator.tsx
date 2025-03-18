import { Routes } from '@/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from './tabs'
import { ChangePassword } from '@/screens'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        // statusBarStyle: 'dark',
        // statusBarTranslucent: true,
        // statusBarColor: COLORS.transparent,
      }}
    >
      <Stack.Screen name={Routes.Home} component={Tabs} />
      <Stack.Screen name={Routes.ChangePassword} component={ChangePassword} />
      {/* <Stack.Screen name={Routes.History} component={History} />
      <Stack.Screen name={Routes.Route} component={Plan} />
      <Stack.Screen name={Routes.VisitHistory} component={VisitHistory} />
      <Stack.Screen name={Routes.SelectCustomerByRole} component={SelectCustomerByRole} />
      <Stack.Screen name={Routes.ScanBarCodeRMA} component={ScanBarCodeRMA} />
      <Stack.Screen name={Routes.QuickOrder} component={QuickOrder} />
      <Stack.Screen name={Routes.Notification} component={Notification} />
      <Stack.Screen name={Routes.Report} component={Report} />
      <Stack.Screen options={{ gestureEnabled: false }} name={Routes.CreateReturn} component={CreateReturn} />
      <Stack.Screen name={Routes.ReturnMaterial} component={ReturnMaterial} />
      <Stack.Screen name={Routes.DetailReturnMaterial} component={DetailReturnMaterial} />
      <Stack.Screen name={Routes.Debts} component={Debts} />
      <Stack.Screen name={Routes.DebtDetail} component={DebtDetail} />
      <Stack.Screen options={{ gestureEnabled: false }} name={Routes.UpdateInventory} component={CreateInventory} />
      <Stack.Screen options={{ gestureEnabled: false }} name={Routes.CreateInventory} component={CreateInventory} />
      <Stack.Screen name={Routes.SelectProduct} component={Product} />
      <Stack.Screen name={Routes.InventorySelectProduct} component={InventorySelectProduct} />
      <Stack.Screen name={Routes.Timekeeping} component={TimeKeeping} />
      <Stack.Screen name={Routes.MapViewSelectCoordinate} component={MapViewSelectCoordinate} />
      <Stack.Screen name={Routes.MultiTakePhotos} component={MultiTakePhotos} />
      <Stack.Screen name={Routes.OutletInfo} component={OutletInfo} />
      <Stack.Screen name={Routes.RatingOutlet} component={RatingOutlet} />
      <Stack.Screen name={Routes.Contact} component={Contact} />
      <Stack.Screen name={Routes.AccountInfo} component={AccountInfo} />
      <Stack.Screen name={Routes.DetailOrder} component={DetailOrder} />
      <Stack.Screen name={Routes.ManagerAccount} component={ManagerAccount} />
      <Stack.Screen name={Routes.ReportEmployee} component={ReportEmployee} />
      <Stack.Screen name={Routes.ChildAccount} component={ChildAccount} />
      <Stack.Screen name={Routes.CreateAccount} options={{ gestureEnabled: false }} component={CreateAccount} />
      <Stack.Screen name={Routes.Promotion} component={Promotion} />
      <Stack.Screen name={Routes.PromotionDetail} component={PromotionDetail} />
      <Stack.Screen name={Routes.ContactUs} component={ContactUs} />
      <Stack.Screen name={Routes.SelectAddress} component={SelectAddress} />
      <Stack.Screen name={Routes.Address} component={CreateAddress} />
      <Stack.Screen name={Routes.ScanBarcode} component={ScanBarcode} />
      <Stack.Screen name={Routes.InfoCheckin} component={InfoCheckin} />
      <Stack.Screen name={Routes.UpdateRoute} component={UpdateRoute} />
      <Stack.Screen name={Routes.DetailRoute} component={DetailRoute} />
      <Stack.Screen name={Routes.Plan} component={Plan} />
      <Stack.Screen name={Routes.Cart} component={Cart} />
      <Stack.Screen name={Routes.Checkout} component={Checkout} />
      <Stack.Screen name={Routes.PaymentGateway} component={PaymentGateway} />
      <Stack.Screen name={Routes.SelectCustomer} component={SelectCustomer} />
      <Stack.Screen name={Routes.AdminSite} component={AdminSite} />
      <Stack.Screen name={Routes.WishList} component={Wishlist} />
      <Stack.Screen name={Routes.DetailProduct} component={DetailProduct} />
      <Stack.Screen name={Routes.FilterProduct} component={FilterProduct} />
      <Stack.Screen name={Routes.CheckinCustomer} component={CheckinCustomer} />
      <Stack.Screen
        name={Routes.ProductFilter}
        component={ProductFilter}
        options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
      />
      <Stack.Screen name={Routes.ResetPassword} component={ResetPassword} />
       */}
    </Stack.Navigator>
  )
}
