import { Colors } from '@/theme'
import { IdAndName, NameAndValue, Option, QueryList } from '@/types'

export type GetDebtsReq = QueryList & {
  date_type?: string
  state?: string
  keyword?: string
  start_date?: string
  end_date?: string
  payment_state?: string
  move_type?: string
  partner_ids?: number[]
}

export interface DebtsAdditionalDataRes {
  total_payment: number
  total_amount: number
  total_outbound: number
  total_inbound: number
}

export interface GetDebtsRes extends DebtsAdditionalDataRes {
  payments: DebtRes[]
}

export type DebtState = 'draft' | 'posted' | 'cancel'

export type DebtPaymentState = 'not_paid' | 'in_payment' | 'paid' | 'partial' | 'reversed' | 'invoicing_legacy'

export interface DebtRes {
  id: number
  partner: IdAndName & {
    phone: string
    contact_address: string
  }
  company: IdAndName
  payment_state: NameAndValue<DebtPaymentState>
  amount_total: number
  amount_paid: number
  amount_residual: number
  name: string
  create_date: string
  invoice_date: string
  invoice_date_due: string
  date: string
}

export interface GetDebtDetailReq {
  payment_id: number
}

export interface DebtInvoiceLine {
  id: number
  product_id: IdAndName
  name: string
  account_id: IdAndName
  quantity: number
  uom: IdAndName
  price_unit: number
  discount_type: NameAndValue
  discount_value: number
  tax_ids: number
  price_total: number
}

export interface DebtDetailRes extends DebtRes {
  name: string
  state: NameAndValue<DebtState>
  payment_reference: string
  ref: string
  create_date: string
  invoice_date: string
  invoice_date_due: string
  date: string
  journal: { journal_id: number; journal_name: string }
  acquirer_id: IdAndName
  move_type: NameAndValue
  note: string
  tags: string
  amount_untaxed: number
  amount_tax: number
  credit_amount: number
  amount_total: number
  amount_words: string
  invoice_line_ids: DebtInvoiceLine[]
  line_ids: {
    id: number
    account_id: IdAndName
    debit: number
    credit: number
  }[]
}

export const DebtStateColor = {
  draft: Colors.gray80,
  posted: Colors.green,
  cancel: Colors.danger,
} as const

export const DebtPaymentStateColor = {
  not_paid: Colors.gray80,
  in_payment: Colors.orange,
  paid: Colors.green,
  partial: Colors.primary,
  reversed: Colors.purple,
  invoicing_legacy: Colors.blue,
} as const

export enum EDebtsFilterKey {
  PaymentState = 'payment_state',
  MoveType = 'move_type',
  State = 'state',
  DateType = 'date_type',
  StartDate = 'start_date',
  EndDate = 'end_date',
  PartnerIds = 'partner_ids',
}

export const EDebtsFilterKeyName = {
  [EDebtsFilterKey.PaymentState]: 'Trạng thái thanh toán',
  [EDebtsFilterKey.MoveType]: 'Trạng thái di chuyển',
  [EDebtsFilterKey.State]: 'Trạng thái',
  [EDebtsFilterKey.DateType]: 'Mốc thời gian',
  [EDebtsFilterKey.StartDate]: 'Khoảng thời gian',
  [EDebtsFilterKey.EndDate]: 'Khoảng thời gian',
  [EDebtsFilterKey.PartnerIds]: 'Khách hàng',
} as const

export type DebtsFilterLineItem = Option<EDebtsFilterKey> & { items: Option[] }

export enum EDebtsDateType {
  'Today' = 'today',
  'Yesterday' = 'yesterday',
  'Last3Days' = 'last_3_days',
  'ThisWeek' = 'this_week',
  'LastWeek' = 'last_week',
  'ThisMonth' = 'this_month',
  'LastMonth' = 'last_month',
  'ThisQuarter' = 'this_quarter',
  'LastQuarter' = 'last_quarter',
  'FirstQuarter' = 'first_quarter',
  'SecondQuarter' = 'second_quarter',
  'ThirdQuarter' = 'third_quarter',
  'FourthQuarter' = 'fourth_quarter',
  '_6MonthsBefore' = '6_months_before',
  '_6MonthsAfter' = '6_months_after',
  'ThisYear' = 'this_year',
  'LastYear' = 'last_year',
  'CustomDate' = 'custom_date',
}

export const EDebtsDateTypeName = {
  [EDebtsDateType.Today]: 'Hôm nay',
  [EDebtsDateType.Yesterday]: 'Hôm qua',
  [EDebtsDateType.Last3Days]: '3 Ngày trước',
  [EDebtsDateType.ThisWeek]: 'Tuần này',
  [EDebtsDateType.LastWeek]: 'Tuần trước',
  [EDebtsDateType.ThisMonth]: 'Tháng này',
  [EDebtsDateType.LastMonth]: 'Tháng trước',
  [EDebtsDateType.ThisQuarter]: 'Quý này',
  [EDebtsDateType.LastQuarter]: 'Quý trước',
  [EDebtsDateType.FirstQuarter]: 'Quý 1',
  [EDebtsDateType.SecondQuarter]: 'Quý 2',
  [EDebtsDateType.ThirdQuarter]: 'Quý 3',
  [EDebtsDateType.FourthQuarter]: 'Quý 4',
  [EDebtsDateType._6MonthsBefore]: '6 tháng trước',
  [EDebtsDateType._6MonthsAfter]: '6 tháng sau',
  [EDebtsDateType.ThisYear]: 'Năm nay',
  [EDebtsDateType.LastYear]: 'Năm trước',
  [EDebtsDateType.CustomDate]: 'Tuỳ chỉnh',
} as const

export interface GetDebtsFilterRes {
  [EDebtsFilterKey.PaymentState]: {
    not_paid: string
    in_payment: string
    paid: string
    partial: string
    reversed: string
    invoicing_legacy: string
  }
  [EDebtsFilterKey.MoveType]: {
    entry: string
    out_invoice: string
    out_refund: string
    in_invoice: string
    in_refund: string
    out_receipt: string
    in_receipt: string
  }
  [EDebtsFilterKey.State]: {
    draft: string
    posted: string
    cancel: string
  }
  [EDebtsFilterKey.DateType]: {
    [EDebtsDateType.Today]: string
    [EDebtsDateType.Yesterday]: string
    [EDebtsDateType.Last3Days]: string
    [EDebtsDateType.ThisWeek]: string
    [EDebtsDateType.LastWeek]: string
    [EDebtsDateType.ThisMonth]: string
    [EDebtsDateType.LastMonth]: string
    [EDebtsDateType.ThisQuarter]: string
    [EDebtsDateType.LastQuarter]: string
    [EDebtsDateType.FirstQuarter]: string
    [EDebtsDateType.SecondQuarter]: string
    [EDebtsDateType.ThirdQuarter]: string
    [EDebtsDateType.FourthQuarter]: string
    [EDebtsDateType._6MonthsBefore]: string
    [EDebtsDateType._6MonthsAfter]: string
    [EDebtsDateType.ThisYear]: string
    [EDebtsDateType.LastYear]: string
    [EDebtsDateType.CustomDate]: string
  }
  [EDebtsFilterKey.StartDate]: string
  [EDebtsFilterKey.EndDate]: string
  [EDebtsFilterKey.PartnerIds]: IdAndName[]
}
