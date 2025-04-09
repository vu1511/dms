import { CategoryIcon, EditSquareIcon, LocationIcon, StarIcon, StoreIcon } from '@/assets'
import { IconProps, IdAndName, ImagePickerResult, Option } from './core'
import { QueryList } from './http'

export type AccountType = 'th' | 'nvkd' | 'npp' | 'gsbh' | 'asm' | 'rsm' | 'manager'

export const AccountTypeNames = {
  nvkd: 'Nhân viên kinh doanh',
  npp: 'Nhà phân phối',
  th: 'Cửa hàng bán lẻ',
  asm: 'Giám sát khu vực',
  rsm: 'Giám sát khu vực',
  gsbh: 'Giám sát bán hàng',
  manager: 'Quản lý',
} as const

export type CustomerType = 'internal' | 'collaborators'

export interface ShippingAddress {
  id: number
  name: string
  phone: string
  street: string
  ward_id: {
    id: number
    name: string
  }
  district_id: {
    id: number
    name: string
  }
  state_id: {
    id: number
    name: string
  }
  country_id: {
    id: number
    name: string
  }
  full_adress: string
}

export interface PartnerRes {
  id: number
  name: string
  active: boolean
  account_type: AccountType
  customer_type: 'internal' | string
  street: string
  shipping_adress: ShippingAddress[]
  selected_address?: ShippingAddress | null
  phone: string
  email: string
  category: string
  longitude: string
  latitude: string
  sale_standard: number
  total_order: number
  total: number
  credit: number
  credit_limit: number
  img_url: string
  history_checkin: []
  checkin?: boolean
  is_delete?: boolean
}

export interface GetCustomerReq extends QueryList {
  account_type?: AccountType
  account_id?: number
  keyword?: string
  barcode?: string
}

export type CustomerRes = Omit<PartnerRes, 'history_checkin'>

export type OrderCustomer = Omit<CustomerRes, 'shipping_adress'> & {
  shipping_address: ShippingAddress
}

export interface GetAddressReq {
  district_id?: number
  state_id?: number
}

export interface CreateAddressReq {
  adress_id?: number | null
  partner_id: number
  address_new: {
    street: string
    state_id: number
    district_id: number
    ward_id: number
    country_id: number
  }
}
export interface DeleteAddress {
  adress_id: number | null
  partner_id: number
}
export interface PartnerId {
  partner_id: number
}

export interface AddressRes {
  id: number
  street: string
  ward_id: IdAndName
  district_id: IdAndName
  state_id: IdAndName
  country_id: IdAndName
  full_adress: string
}

export interface CreateAddressForm {
  street: string
  state_id: number
  state_name: string
  district_id: number
  district_name: string
  ward_id: number
  ward_name: string
}

export interface UserInfo {
  id: number
  name: string
  birthday: string
  phone: string
  email: string
  vat: string
  website: string
  mobile: string
  sex: string
  description: string
  total_order: number
  note: string[]
  im_status: string
  device_id: string
  street: string
  member?: string
  is_checkin?: boolean
  shipping_adress: {
    country_id: string
    country_name_id: number
    district_id: string
    district_name_id: number
    full_adress: string
    id: number
    name: string
    phone: string
    state_id: string
    state_name_id: number
    street: string
    ward_id: string
    ward_name_id: number
  }[]
  image: string
  image_url: string
  barcode: string | false
  total_sale_order: number
  notification_counts: number
  count_companies: number
  company_id: number
  company_name: string
  list_company: number[]
  account_type: AccountType
  customer_type: 'collaborators' | 'internal' | ''
  total: number
  customer_name: string
  birth_day: string
  longitude: string
  latitude: string
  address: ShippingAddress
  partner_id: number
  partner_credit: number
  partner_debit: number
  total_return: number
  total_cancer: number
  category: IdAndName
  warning_blocked: string
  loyalty_point: number
  loyalty_type: ELoyaltyType
  loyalty_rate: number
  loyalty_by_rule: LoyaltyByRule
  loyalty_type_config: ELoyaltyTypeConfig
}

export type Loyalty = {
  loyalty_point: number
  loyalty_program_id: string
  partner_id: number
  partner_name: string
  order_id: number
  order_name: string
  date: string
  image: string
  amount_total: number
  type_use: string
}

export enum ELoyaltyType {
  DIAMOND = 'diamond',
  GOLD = 'gold',
  SILVER = 'silver',
  OLD = 'old',
  BASIC = 'basic',
}

export enum ELoyaltyTypeConfig {
  BY_POINT = 'by_point',
  BY_RANGE = 'by_range',
}

export type LoyaltyByRule = {
  id: number
  money: number
  point: number
}

export interface PhoneForm {
  phone: string
}

export interface LoginDomainForm {
  domain: string
  phone: string
  password: string
}
export interface LoginPassword extends PhoneForm {
  password: string
}

export interface LoginPasswordRes {
  token: string
  refresh_token: string
}

export type GetloyaltyHistoryReq = QueryList & {
  partner_id?: number
}

export type TokenRes = LoginPasswordRes

export interface LoginWithThirdParty {
  name_user?: string
  type?: 'facebook' | 'google' | 'stringee' | 'firebase'
  stringee_access_token?: string
  firebase_access_token?: string
}

export interface AttendanceCheckinReq {
  latitude: number
  longitude: number
  store_status?: string
  location_name?: string
  customer_id: number
  company_id?: number
  os_name?: 'android' | 'ios'
  browser_name?: 'DMS_SATAVAN'
  image?: string
  barcode?: string
}

export interface AttendanceCheckinRes {}

export interface GetCustomersHierarchyReq extends QueryList {
  keyword?: string
}

export interface CustomerHierarchyRes {
  id: number
  name: string
  active: true
  image: string
  account_type: AccountType
  customer_type: CustomerType
  street: string
  shipping_adress: ShippingAddress[]
  phone: string
  longitude: string
  latitude: string
  sale_standard: number
  total_order: number
  total: number
  is_check?: boolean
}

export interface UpdateUserInfo {
  partner_id?: number
  birth_day?: string
  name?: string
  sex?: string
  phone?: string
  image?: string
  name_customs?: string
  email?: string
  longitude?: number
  latitude?: number
  address?: CreateAddressForm
}

export type UpdateUserInfoForm = Omit<UpdateUserInfo, 'address'> & {
  address?: AddressRes
}

export interface RefreshTokenReq {
  refresh_token: string
}

export interface CreateAccountReq {
  name: string
  phone: string
  password?: string
  confirm_password?: string
  address: CreateAccountAddress
  longitude: string
  latitude: string
  birth_day: string
  image: string
  customer_name: string
  route_sale_id?: number
  hcategory_id?: number
}

export type CreateAccountForm = Omit<
  CreateAccountReq,
  'address' | 'hcategory_id' | 'birth_day' | 'route_sale_id' | 'image' | 'longitude' | 'latitude'
> & {
  birth_day?: Date | null
  address: CreateAddressForm
  hcategory_id?: IdAndName | null
  route_sale_id?: IdAndName | null
  image: ImagePickerResult
}

export type UpdateAccountReq = Partial<CreateAccountReq>

export interface CreateAccountAddress {
  ward_id: number
  district_id: number
  state_id: number
  country_id: number
  street: string
}

export interface GetAccountsReq extends QueryList {
  account_type?: string
  keyword?: string
  sale_type?: 'sale' | 'no_sale'
  barcode?: string
}

export interface GetReportInfoReq {
  date_type?: string
  partner_id?: number
}

export interface ReportInfoRes {
  sale_amount_today: number
  revenue_today: number
  sale_factor_level_id: number
  sale_standard: number
  cumulative_sale: number
  number_sale_order: number
  number_new_customer: number
  number_old_customer: number
  user_data: {
    number_image: string
    number_image_per_date: { date: string; number_images: number }[]
  }
  manager_data: {
    number_image: string
    number_image_per_date: { date: string; number_images: number }[]
    number_customer: number
    number_checkin: number
  }
  top_sale_product: []
  revenue_by_date: []
  ranking: number
  sale_man_ids: number[]
  credit: number
  credit_limit: number
  debt_recovery: number
  total_sale_draft: number
  total_sale_stock: number
  total_sale_invoice: number
  number_standard: number
}

export interface AttendanceRes {
  id: number
  name: string
  store_status: { name: string; value: string }
  partner_id: number
  customer_info: {
    id: number
    name: string
    adress: string
    phone: string
    email: string
    website: string
    name_customs: string
    birth_day: string
    longitude: string
    latitude: string
    full_adress: string
  }
  check_in: string
  check_out: string
  longitude: number
  latitude: number
  location_name: string
  image: string
}

export interface GetAttendanceReq extends QueryList {
  type_checkin?: 'no_sale' | 'sale'
  partner_id?: number
  customer_id?: number
}

export interface OTPForm {
  code: string
}

export interface ResetPasswordReq {
  firebase_access_token?: string
  stringee_access_token?: string
  password: string
  re_password: string
}

export type UserGenderType = 'male' | 'female' | 'other'

export type CustomerGroupRes = {
  id: number
  name: string
  code: string
  parent_id: IdAndName
  category_complete_name: string
}

export type AttendanceCheckinV2Req = {
  hierarchy_id: number
  customer_id: number
  longitude: number
  latitude: number
  image: string
  location_name: string
  os_name: string
  store_status?: 'close' | 'open'
}

export interface CompanyRes {
  id: number
  work_address_id: number
  address: string
  phone: string
  email: string
  website: string
  time_work: string
  latitude: string
  longitude: string
  name: string
  industry_id: number[]
  banner_img: string[]
  image: string
}

export enum ECustomerCheckinMenuOption {
  ViewInfo,
  ViewLocation,
  CreateInventory,
  Rate,
  UpdateAddress,
}

export const CustomerCheckinMenuOptions: (Option<ECustomerCheckinMenuOption> & {
  icon: (props: IconProps) => JSX.Element
})[] = [
  {
    label: 'Thông tin',
    icon: StoreIcon,
    value: ECustomerCheckinMenuOption.ViewInfo,
  },
  {
    label: 'Xem đường đi',
    icon: LocationIcon,
    value: ECustomerCheckinMenuOption.ViewLocation,
  },
  {
    label: 'Kiểm tồn',
    icon: CategoryIcon,
    value: ECustomerCheckinMenuOption.CreateInventory,
  },

  {
    label: 'Đánh giá',
    icon: StarIcon,
    value: ECustomerCheckinMenuOption.Rate,
  },
  {
    label: 'Sửa địa chỉ',
    icon: EditSquareIcon,
    value: ECustomerCheckinMenuOption.UpdateAddress,
  },
]
