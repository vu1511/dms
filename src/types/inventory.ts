import { IdAndName } from './core'
import { QueryList } from './http'
import { Product, ProductVariant } from './productV2'
import { StarRating } from './rating'
import { RatingTagRes } from './route'

export interface CreateInventoryStoreLine {
  product_id: number
  uom_id: number
  exp_date: string
  product_quantity: number
  note?: string
}

export interface CreateInventoryReq {
  customer_id: number
  rating_star?: StarRating
  rating_tags?: number[]
  rating_content: string
  inventory_store_lines: CreateInventoryStoreLine[]
}

export type CreateInventoryForm = Omit<CreateInventoryReq, 'inventory_store_lines' | 'customer_id'> & {
  customer_id: IdAndName
  inventory_store_lines: InventoryLineForm[]
}

export type InventoryLineForm = ProductVariant & {
  note?: string
  exp_date: Date
  quantity: number
  inventory_store_line_id?: number
}

export interface CreateInventoryRes {}

export interface GetInventoriesReq extends QueryList {
  customer_id?: number
  inventory_date?: string
  start_date?: string
  end_date?: string
  full_data?: boolean
}

export interface InventoryLineRes {
  inventory_store_line_id: number
  inventory_store_line_name: number
  uom: IdAndName
  exp_date: string
  product_quantity: number
  note: string
  product: Product
}

export interface InventoryRes {
  inventory_store_id: number
  inventory_store_name: string
  inventory_date: string
  customer: IdAndName
  user: IdAndName
  rating_star: { rating_star_int: number; rating_star_name: string }
  rating_tags: RatingTagRes[]
  rating_content: string
  inventory_store_lines: InventoryLineRes[]
}

export interface GetDetailInventoryReq {
  inventory_store_id: number
}

export interface InventoryDetailRes {}

export type UpdateInventoryLineReq = Partial<CreateInventoryStoreLine> & {
  inventory_store_line_id: number
}

export type UpdateInventoryReq = {
  customer_id?: number
  inventory_store_id: number
  inventory_store_lines: UpdateInventoryLineReq[]
}

export type DeleteInventoryReq = GetDetailInventoryReq

export interface DeleteInventoryLineReq extends DeleteInventoryReq {
  inventory_store_line_id: number
}
