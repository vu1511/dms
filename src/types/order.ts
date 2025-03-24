import { IdAndName, IdAndQty } from './core'
import { QueryList } from './http'
import { ProductType } from './product'
import { PromotionOrderRes } from './promotion'

export interface ProductSpecial {
  id: number
  id_product: number
  product_uom: number
  quantity: number
}

export type BookingType = 'delivery_status' | 'state' | 'paid_status' | 'return_delivery_status' | 'return_paid_status'

export type DateType =
  | 'today'
  | 'this_week'
  | 'last_week'
  | 'this_month'
  | 'last_month'
  | 'this_quarter'
  | 'last_quarter'
  | 'this_year'
  | 'last_year'

export type OrderState = 'all' | 'draft' | 'sale' | 'done' | 'cancel' | 'delivery' | 'received' | 'paid' | 'refund'

export interface ProductInOrder {
  company_id: number
  coupon_code?: string
  payment_term_id?: number
  products: { [key: number]: { qty: number; uom_id: number; price?: number }[] }
  list_combo?: IdAndQty[]
  product_special: ProductSpecial[]
}

export interface CreateDraftOrderReq {
  api_version: '2.1'
  partner_shipping_id: number
  appointment_time?: string
  coupon_code?: string
  customer_id: number
  image?: string | null
  latitude?: string | null
  longitude?: string | null
  list_combo?: { id: number; qty: number }[]
  list_products: ProductInOrder[]
  loyalty_point?: number
  note?: string
  order_id?: number | null
}

export interface OrderLineView {
  name: string
  price_subtotal: number
  price_total: number
  price_unit: number
  product_discount: number
  product_id: number
  product_uom: string
  qty: number
}

export interface OrderDraftRes {
  order_id: number
  company_id: number
  company_name: string
  detail_order: {
    id: number
    promotion_code: string
    partner_id: number
    combo_id: []
    order_line: DraftOrderLine[]
    shipping_fee: number
    amount_untaxed: number
    amount_tax: number
    reduce_price_combo_view: number
    amount_total: number
  }
  shipping_fee: number
  amount_untaxed: number
  amount_tax: number
  reduce_price_combo_view: number
  discount_by_loyal: number
  amount_total: number
  delivery_selected?: DeliveryMethodRes
  payment_selected?: Payment
  discount: PromotionOrderRes[]
  promotion_total: number
  amount_subtotal: number
}

export type GetOrderDraftRes = {
  sale_orders: OrderDraftRes[]
  amount_total: number
}

export interface CreateOrderDoneReq {
  image?: string
  longitude?: string
  latitude?: string
  order_id: number[]
  note?: string
  tag_ids?: number[]
  date_order?: string
}

export type createOrderDoneFunction = Pick<CreateOrderDoneReq, 'note' | 'date_order'> & {
  tag_ids?: IdAndName[]
}

export interface GetDeliveryMethodsReq {
  sale_id: number
}

export interface ConfirmDeliveryMethodReq {
  sale_carrier: {
    sale_id: number
    carrier_id: number
    delivery_price: number
  }[]
  required_note: string
  payment_type: string
  delivery_message: string
}

export interface ConfirmDeliveryMethodRes {}

export interface DeliveryMethodRes {
  carrier_name: string
  carrier_id: number
  shipping_fee: number
  shipping_active: boolean
  shipping_icon: string
  description: string
}

export interface OrderProductAttribute {
  id: number
  name: string
  value_id: number
  value_name: string
}

export interface DraftOrderLine {
  id: number
  product_id: number
  type: ProductType
  name: string
  quantity: number
  image: string
  product_uom: string
  price_unit: number
  product_discount: number
  discount_line: {
    type: 'percent'
    value: number
  }
  price: number
  discount_price: number
  attributes: OrderProductAttribute[]
}

export interface SelectedDelivery extends DeliveryMethodRes {
  company_id: number
  order_id: number
}

export interface CreateOrderDoneRes {
  sale_order_id: number
  amount_total: number
  name: string
}

export interface GetStatusOrderRes {
  state: {
    all: 'Tất cả'
    draft: 'Đơn nháp'
    sale: 'Xác nhận'
    done: 'Hoàn Thành'
    cancel: 'Đã hủy'
    delivery: 'Đang giao'
    received: 'Đã giao'
    paid: 'Thanh toán'
    refund: 'Trả hàng'
  }
  delivery_status: {
    all: 'Tất cả'
    no_name: 'Chưa giao hàng'
    partially_delivered: 'Giao một phần'
    fully_delivered: 'Đã giao hết'
  }
  return_delivery_status: {
    all: 'Tất cả'
    no_name: 'Không'
    return_partially_delivered: 'Trả hàng một phần'
    return_fully_delivered: 'Trả hàng toàn bộ'
  }
  paid_status: {
    all: 'Tất cả'
    no_paid: 'Chưa thanh toán'
    partially_paid: 'Thanh toán một phần'
    fully_paid: 'Thanh toán toàn bộ'
  }
  return_paid_status: {
    all: 'Tất cả'
    no_paid: 'Không'
    return_fully_paid: 'Hoàn tiền toàn phần'
    return_partially_paid: 'Hoàn tiền một phần'
  }
}

export type OrderBookingProduct = {
  product_id: number
  name: string
  re_order: boolean
  price: number
  quantity: number
  unit_price: number
  product_available: number
  sales_count: number
  barcode: string
  default_code: string
  product_uom: string
  uom: IdAndName
  uom_reorder: IdAndName
  uom_categ: IdAndName[]
  discount: number
  discount_type: string
  product_discount: number
  sub_discount_total: number
  image_url: string[]
}

export interface OrderBookingRes {
  state_view: { name: string; value: OrderState }
  payment_term_id: { id: false; name: false }
  state: OrderState
  state_name: string
  state_delivery: string
  state_delivery_name: string
  state_paid: string
  state_paid_name: string
  state_return_delivery: string
  state_return_delivery_name: string
  state_return_paid: string
  state_return_paid_name: string
  name: string
  qrcode: string
  total_product: number
  promotion_total: number
  company_id: number
  company_name: string
  code_delivery: false
  url_tracking_delivery: false
  partner_id: number
  create_date: string
  date_planned: string
  partner_name: string
  partner_phone: string
  partner_address: string
  delivery_name: string
  delivery_phone: string
  delivery_address: string
  delivery_id: number
  star: number
  discount_by_loyal: number
  loyal_point_sale: number
  translate_point: number
  partner_point: number
  amount_paid: number
  detail_paid: false
  amount_total: number
  amount_subtotal: number
  partner_credit: number
  products: OrderBookingProduct[]
  note: string
  tag_ids: IdAndName[]
  delivery_message: string
  is_rate: string
  sell_by: string
  customer_location: {
    longitude: string
    latitude: string
  }
  purchase_order: {}
  price_list: IdAndName[]
  from_origin: string
  type_product: string
  discount: PromotionOrderRes[]
}

export interface GetOrderHistoryListReq extends QueryList {
  booking_type?: BookingType
  booking_state?: string
  date_starting?: string
  date_ending?: string
  date_type?: DateType
  keyword?: string
  partner_id?: number
}

export interface OrderRes {
  order_id: number
  partner_id: number
  partner_name: string
  company_id: number
  company_name: string
  name: string
  create_date: string
  state_view: { name: string; value: OrderState }
  state: OrderState
  state_name: string
  state_delivery: string
  state_delivery_name: string
  state_paid: string
  state_paid_name: string
  state_return_delivery: string
  state_return_delivery_name: string
  state_return_paid: string
  state_return_paid_name: string
  sell_by: string
  note: string
  delivery_message: string
  coupon_code: []
  amount_total: number
}

export interface GetOrderHistoryRes {
  sales_summary: { total_sale: number; total_amount: number }
  list_booking: OrderRes[]
}

export interface GetOrderProcessReq {
  order_id: number
  order_state: string
}

export interface GetOrderProcessRes {}

export interface CreatePaymentParams {
  acquirer_id: number
  sale_order_id: number
  returned_url: string
}

export interface ConfirmTransactionParams {
  sale_order_id: number
}

export interface Payment {
  acquirer_id: number
  name: string
  provider: string
  state: string
  image_url: string
}

export interface UpdateOrderDraft {
  order_id: Array<number>
  partner_shipping_id?: number | null
  acquirer_id?: number | null
  translate_point?: number | null
}

export interface UpdateOrderDraftRes {
  amount_total: number
  fee_acquirer: number
  id: number
  name: string
  discount_by_loyal: number
  translate_point: number
  loyalty_points: number
  loyal_point_sale: number
}

export interface UpdateOrderHook {
  showBackdrop?: boolean
  handleSuccess?: (data: UpdateOrderDraftRes[]) => void
  handleError?: () => void
  params: {
    partner_shipping_id?: number
    acquirer_id?: number
    company_id?: number
    order_id: number[]
    translate_point?: number
  }
}

export interface ConfirmPaymentMethodResponse {
  id: number
  name: string
  amount_total: number
  fee_acquirer: number
}
