import { CreateAddressForm, IconProps, IdAndName, UpdateRouteReq } from '@/types'
import { type RouteProp as RNRouteProp } from '@react-navigation/native'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'

export enum Routes {
  Home = 'Home',
  Login = 'Login',
  RouteList = 'RouteList',
  ChangePassword = 'ChangePassword',
  UpdateRoute = 'UpdateRoute',
  CreateCustomer = 'CreateCustomer',
  CreateAddress = 'CreateAddress',
  // History = 'History',
  // PrinterConfig = 'PrinterConfig',
  // CreateReturn = 'CreateReturn',
  // DetailReturnMaterial = 'DetailReturnMaterial',
  // ReturnMaterial = 'ReturnMaterial',
  // BeforeUpdateInfo = 'BeforeUpdateInfo',
  // AddProduct = 'AddProduct',
  // ContactUs = 'ContactUs',
  // SelectProduct = 'SelectProduct',
  // CreateAccount = 'CreateAccount',
  // ServiceByCategory = 'ServiceByCategory',
  // Book = 'Book',
  // DetailProduct = 'DetailProduct',
  // Cart = 'Cart',
  // Checkout = 'Checkout',
  // AccountInfo = 'AccountInfo',
  // Promotion = 'Promotion',
  // PromotionDetail = 'PromotionDetail',
  // Contact = 'Contact',
  // MoreAccount = 'MoreAccount',
  // Notification = 'Notification',
  // OrderSuccess = 'OrderSuccess',
  // DetailOrder = 'DetailOrder',
  // Timekeeping = 'Timekeeping',
  // Product = 'Product',
  // UpdateInfo = 'UpdateInfo',
  // SelectPromotion = 'SelectPromotion',
  // ScanBarcode = 'ScanBarcode',
  // ManagerAccount = 'ManagerAccount',
  // SelectCustomer = 'SelectCustomer',
  // ResetPassword = 'ResetPassword',
  // ChildAccount = 'ChildAccount',
  // Attendance = 'Attendance',
  // Report = 'Report',
  // ReportEmployee = 'ReportEmployee',
  // ProductSaleOff = 'ProductSaleOff',
  // WishList = 'WishList',
  // Address = 'Address',
  // SelectAddress = 'SelectAddress',
  // QuickOrder = 'QuickOrder',
  // OutletInfo = 'OutletInfo',
  // DetailRoute = 'DetailRoute',
  // InfoCheckin = 'InfoCheckin',
  // RatingOutlet = 'RatingOutlet',
  // UpdateRoute = 'UpdateRoute',
  // MultiTakePhotos = 'MultiTakePhotos',
  // AccountsForCheckin = 'AccountsForCheckin',
  // Plan = 'Plan',
  // Category = 'Category',
  // Visit = 'Visit',
  // Route = 'Route',
  // VisitHistory = 'VisitHistory',
  // SelectCustomerByRole = 'SelectCustomerByRole',
  // AdminSite = 'AdminSite',
  // MapViewSelectCoordinate = 'MapViewSelectCoordinate',
  // ScanBarCodeRMA = 'ScanBarCodeRMA',
  // CreateInventory = 'CreateInventory',
  // InventorySelectProduct = 'InventorySelectProduct',
  // OTP = 'OTP',
  // UpdateInventory = 'UpdateInventory',
  // Debts = 'Debts',
  // DebtDetail = 'DebtDetail',
  // FilterProduct = 'FilterProduct',
  // ProductFilter = 'ProductFilter',
  // DealDetail = 'DealDetail',
  // PaymentGateway = 'PaymentGateway',
  // PrintOrder = 'PrintOrder',
  // CheckinCustomer = 'CheckinCustomer',
}

export const Tabs = {
  HomeTab: 'HomeTab',
  OrderTab: 'OrderTab',
  WorkTab: 'WorkTab',
  HistoryTab: 'HistoryTab',
  AccountTab: 'AccountTab',
  AuthTab: 'AuthTab',
}

export type StackParamsList = {
  Home: undefined
  Login: undefined
  RouteList: undefined
  ChangePassword: undefined
  UpdateRoute: {
    data: Required<Omit<UpdateRouteReq, 'delete_partner_ids' | 'partner_ids'>>
  }
  CreateCustomer: {
    route?: IdAndName
    showRoute?: boolean
    onSuccess?: () => void
  }
  CreateAddress: {
    defaultValues?: CreateAddressForm
    onSubmit?: (data: CreateAddressForm) => void | Promise<void>
  }
}

export type StackParamsListKey = keyof StackParamsList

export type Navigation = NativeStackNavigationProp<StackParamsList, StackParamsListKey>

export type RouteProp<RouteName extends keyof StackParamsList> = RNRouteProp<StackParamsList, RouteName>

export interface RouteData {
  route: string
  label: string
  Component: () => JSX.Element | null
  Icon: (props: IconProps) => JSX.Element
  IconActive: (props: IconProps) => JSX.Element
}
