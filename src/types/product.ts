import { IdAndName, URLRes } from './core'
import { QueryList } from './http'
import { OrderDraftRes } from './order'

export type ProductTypeGet = 'sale' | 'new' | 'combo' | 'price_increase' | 'price_reduction' | ''

export interface GetProductsReq extends QueryList {
  keyword?: string
  category_id?: number
  partner_id?: number | null
  list_company?: number[]
  type_get?: ProductTypeGet
}

export interface CompanyId {
  company_id: number
  company_name: string
}

export interface GetCategoryReq extends QueryList {
  parent_id?: number
  category_id?: number
  keyword?: string
  barcode?: string
}

export interface CategoryRes {
  id: number
  url: string
  name: string
  description: string
  parent_id: number | false
  image: string[]
  icon: string
}

export interface ProductRes {
  id: number
  id_product_att: number
  name: string
  create_date: string
  product_brand_id: number
  sale_ok: boolean
  active: boolean
  wholesales?: any
  uom: IdAndName
  uom_categ: IdAndName[]
  wishlist: boolean
  star_rating: number
  rating_count: number
  comment_count: number
  sales_count: number
  company_id: number
  company_name: string
  vat: number
  categ_product: IdAndName
  quantity: number
  uom_select?: UomCart
  barcode: string
  product_available: number
  description: string
  price: number
  price_words: string
  price_orgin: number
  price_discount: number
  price_list: number[]
  seller_price: number
  price_table: number[]
  categ_name: string
  attributes: ProductAttribute[]
  variants: AttributeValue[]
  image_url: string[]
  type?: 'product' | 'combo'
  list_products?: ComboProductRes[]
  is_check?: boolean
}

export interface ComboProductRes {
  id: number
  product_tmpl_id: number
  name: string
  image_url: string[]
  quantity_is: number
  reduced_price: number
  qty_uom: string
}

export type ProductCart = ProductRes & {
  is_sale_off?: boolean
  quantity: number
  isCheck: boolean
  price_after_fix?: number
  company_id: number
}

export interface GetProductSaleOffReq extends QueryList {
  product_id: number[]
}

export type ProductSaleOffRes = {
  id: number
  id_product: number
  is_sale_off: true
  uom: IdAndName
  uom_categ: IdAndName[]
  name: string
  type: string
  price: number
  lst_price: number
  image_url: string[]
  max_product: number
  quantity?: number
  selected_uoms?: IdNameAndQty[]
}

export type ProductDetailRes = Pick<
  ProductRes,
  | 'id'
  | 'name'
  | 'create_date'
  | 'sale_ok'
  | 'uom'
  | 'uom_categ'
  | 'wishlist'
  | 'star_rating'
  | 'rating_count'
  | 'comment_count'
  | 'sales_count'
  | 'company_id'
  | 'company_name'
  | 'barcode'
  | 'product_available'
  | 'description'
  | 'price'
  | 'seller_price'
  | 'image_url'
> & {
  product_tmpl_id: number
  default_code: string
  product_brand: IdAndName
  sku: number
  qty_available: number
  standard_price: number
  description_sale: string
  wholesales: []
  categ_id: string
  category: IdAndName
  list_products?: ComboProductRes[]
  type: ProductType
  tags: string
  last_update: string
  purchase_ok: true
}

export type ProductDetail = ProductDetailRes & {
  attributes: ProductAttribute[]
  variants: number[] | undefined
}

export type ProductType = 'product' | 'combo'

export interface GetProductDetailReq {
  uom_id?: number
  barcode?: string
  type?: ProductType
  product_id?: number
  partner_id?: number | null
  list_products?: {
    id: number
    lst_attributes_id: number[]
    uom_id?: number
    qty?: number
  }[]
}

export type ComputePriceReq = {
  price: number
  uom_id: number
}

export type IdNameAndPrice = IdAndName & {
  price: number
}

export type IdNameAndQty = IdAndName & {
  qty: number
}

export type Attribute = IdAndName & {
  price: number
}

export type ProductAttribute = IdAndName & {
  values: Attribute[]
}

export type AttributeValue = IdAndName & {
  value: Attribute
}

export type UomCart = IdAndName & {
  price: number
  qty: number
}

export type CartItem = {
  id: number
  name: string
  order: OrderDraftRes | null
  products: ProductCart[]
  productsGifted: ProductSaleOffRes[]
}

export interface BannerRes {
  name: 'Banner1'
  type: 'banner'
  ratio: 'none'
  images: string[]
}

export type ProductDeal = ProductRes & {
  daily_deal_promotion: {
    price_discount: number
    compute_price: string
    fixed_price: number
    percent_price: number
    deal_id: number
    deal_name: string
    deals_title: string
    start_date: string
    end_date: string
    offer_pricelist: IdAndName
  }
}

export interface GetProductsDealRes {
  deal_id: number
  deal_name: string
  deals_title: string
  deal_description: string
  start_date: string
  end_date: string
  banner: false
  product_promotion: ProductDeal[]
  offer_pricelist: IdAndName
}

export interface GetProductsDealReq extends QueryList {
  partner_id?: number | null
}

export interface GetBannerParams extends QueryList {
  banner_size?: '4:1' | '3:1' | '2:1'
}

export interface Banner {
  banner_id: number
  banner_name: string
  banner_cloud_storage_id: URLRes
  description_url: string
}
