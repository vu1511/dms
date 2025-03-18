import { IdAndName } from './core'
import { QueryList } from './http'
import { AccountType, PartnerRes, ShippingAddress } from './user'

export interface Customer {}

export interface RouteRes {
  id: number
  name: string
  user_id: IdAndName[]
  code: string
  date_sale: string
  date_start: string
  date_end: string
  number_total: number
}

export interface RouteDetailReq extends QueryList {
  account_type?: AccountType | 'all'
  keyword?: string
  hierarchy_id: number
}

export interface RouteDetailRes {
  id: number
  name: string
  code: string
  description: string
  user_id: IdAndName
  date_sale: string
  date_start: string
  date_end: string
  number_total: number
  number_checkin: number
  ward_id: IdAndName[]
  district_id: IdAndName[]
  state_id: IdAndName[]
  country_id: IdAndName[]
  partner_ids: [PartnerRes[]]
  partner_current: number[]
}

export interface TodayRouteDetailRes extends RouteDetailRes {
  visited_count: number
  no_visited_count: number
}

export type RouteTypeCheckIn = 'all' | 'visited' | 'no_visited'

export interface SearchCustomerRouteReq extends QueryList {
  type_checkin?: RouteTypeCheckIn
  hierarchy_id: number
  keyword?: string
}

export interface SearchCustomerRouteRes {
  id: number
  name: string
  active: true
  account_type: AccountType
  customer_type: string
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
  checkin: boolean
}

export interface RatingTagRes {
  tag_id: number
  tag_content: string
  is_selected?: boolean
}
