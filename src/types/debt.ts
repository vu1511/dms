import { Colors } from '@/theme'
import { IdAndName, NameAndValue, QueryList } from '@/types'

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

export interface GetDebtsFilterRes {
  payment_state: {
    not_paid: string
    in_payment: string
    paid: string
    partial: string
    reversed: string
    invoicing_legacy: string
  }
  move_type: {
    entry: string
    out_invoice: string
    out_refund: string
    in_invoice: string
    in_refund: string
    out_receipt: string
    in_receipt: string
  }
  state: {
    draft: string
    posted: string
    cancel: string
  }
  date_type: {
    today: string
    yesterday: string
    last_3_days: string
    this_week: string
    last_week: string
    this_month: string
    last_month: string
    this_quarter: string
    last_quarter: string
    first_quarter: string
    second_quarter: string
    third_quarter: string
    fourth_quarter: string
    '6_months_before': string
    '6_months_after': string
    this_year: string
    last_year: string
    custom_date: string
  }
  start_date: string
  end_date: string
  partner_ids: IdAndName[]
}
