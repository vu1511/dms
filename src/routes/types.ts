import { ScanBarcodeProps } from '@/components'
import {
  CreateAddressForm,
  CustomerRes,
  FilterProductReq,
  GetCustomerReq,
  IconProps,
  IdAndName,
  InventoryRes,
  ProductVariant,
  UpdateRouteReq,
} from '@/types'
import { type RouteProp as RNRouteProp } from '@react-navigation/native'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'

export enum Routes {
  // Tabs
  HomeTab = 'HomeTab',
  OrderTab = 'OrderTab',
  WorkTab = 'WorkTab',
  HistoryTab = 'HistoryTab',
  AccountTab = 'AccountTab',
  AuthTab = 'AuthTab',

  // Screens
  Home = 'Home',
  Login = 'Login',
  RouteList = 'RouteList',
  ChangePassword = 'ChangePassword',
  RouteDetail = 'RouteDetail',
  CreateCustomer = 'CreateCustomer',
  CreateAddress = 'CreateAddress',
  AccountInfo = 'AccountInfo',
  CheckinCustomer = 'CheckinCustomer',
  CreateInventory = 'CreateInventory',
  SelectCustomer = 'SelectCustomer',
  SelectProductVariant = 'SelectProductVariant',
  ScanBarcode = 'ScanBarcode',
  CreateRating = 'CreateRating',
}

export const Tabs = {
  [Routes.HomeTab]: Routes.HomeTab,
  [Routes.OrderTab]: Routes.OrderTab,
  [Routes.WorkTab]: Routes.WorkTab,
  [Routes.HistoryTab]: Routes.HistoryTab,
  [Routes.AccountTab]: Routes.AccountTab,
  [Routes.AuthTab]: Routes.AuthTab,
} as const

export type StackParamsList = {
  // Tabs
  [Routes.HomeTab]: undefined
  [Routes.OrderTab]: undefined
  [Routes.WorkTab]: undefined
  [Routes.HistoryTab]: undefined
  [Routes.AccountTab]: undefined
  [Routes.AuthTab]: undefined

  // Screens
  [Routes.Home]: undefined
  [Routes.Login]: undefined
  [Routes.RouteList]: undefined
  [Routes.AccountInfo]: undefined
  [Routes.ChangePassword]: undefined
  [Routes.RouteDetail]: {
    data: Required<Omit<UpdateRouteReq, 'delete_partner_ids' | 'partner_ids'>>
  }
  [Routes.CreateCustomer]: {
    route?: IdAndName
    showRoute?: boolean
    onSuccess?: () => void
  }
  [Routes.CreateAddress]: {
    defaultValues?: CreateAddressForm
    onSubmit?: (data: CreateAddressForm) => void | Promise<void>
  }
  [Routes.CheckinCustomer]: {
    routeId: number
    customerId: number
    onSuccess(): void
  }
  [Routes.SelectCustomer]: {
    id?: number
    initialParams?: GetCustomerReq
    onChange?(value: CustomerRes): void
  }
  [Routes.SelectProductVariant]: {
    unitSelectable?: boolean
    defaultValues?: ProductVariant[]
    selectLimit?: number // for multi values
    onChange?: (value: ProductVariant) => void | Promise<void>
    onChangeMany?: (value: ProductVariant[]) => void | Promise<void>
    initialParams?: Partial<FilterProductReq>
  }
  [Routes.CreateInventory]: {
    customer?: IdAndName
    defaultValues?: InventoryRes
    onDelete?: () => void
    onSuccess?: () => void
  }
  [Routes.ScanBarcode]: ScanBarcodeProps
  [Routes.CreateRating]: {
    customerId: number
    onSuccess?: () => void
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
