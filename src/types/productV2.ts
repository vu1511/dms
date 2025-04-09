import { AttributeId, AttributeMinor } from './attribute'
import { Category } from './category'
import { IdAndName, Option, ValueId } from './core'
import { Pagination, QueryList } from './http'
import { ProductType } from './product'
import { ImageId } from './promotion'
import { StarRatingRange, StarRatingRangeReq, StarString } from './rating'

// use in api v2
export interface ProductParams {
  type_get?: 'price_reduction' | 'price_increase' | 'new' | 'top_sale' | 'combo' | 'sale' | ''
  limit?: number
  offset?: number
  keyword?: string
  category_id?: number | false
  categ_id?: number | false
  product_id?: number
  partner_id?: number
  attribute_ids?: any[]
}

export type ProductClassification = 'dietary_supplement' | 'medicine' | 'combo'

export enum EGetProductType {
  All = 'all',
  Combo = 'product_combo',
  Product = 'product_product',
}

export type GetProductType = EGetProductType.Combo | EGetProductType.Product

export enum GetProductTypeFilter {
  All = 'all',
  Combo = 'product_combo',
  Product = 'product_product',
}

export const ProductTypeName = {
  [EGetProductType.All]: 'Tất cả',
  [EGetProductType.Combo]: 'Combo',
  [EGetProductType.Product]: 'Sản phẩm',
} as const

export const ProductTypeOptions: Option<EGetProductType>[] = [
  {
    label: ProductTypeName[EGetProductType.All],
    value: EGetProductType.All,
  },
  {
    label: ProductTypeName[EGetProductType.Product],
    value: EGetProductType.Product,
  },
  {
    label: ProductTypeName[EGetProductType.Combo],
    value: EGetProductType.Combo,
  },
] as const

export interface GetProductByAttributeMinorParams extends QueryList {
  attribute_id?: number
  attribute_value_ids?: number[]
}

export interface GetProductByCategoryParams extends QueryList {
  category_id?: number
  product_type?: GetProductType[]
}

export interface CompanyIdName {
  company_id: number
  company_name: string
}

export type ProductfilterSortType = 'sold_quantity' | 'price_increase' | 'price_decrease' | 'new_product' | undefined

export const ProductFilterSortOptions: Option<ProductfilterSortType | null>[] = [
  { label: 'Tất cả', value: null },
  { label: 'Mới nhất', value: 'new_product' },
  { label: 'Bán chạy', value: 'sold_quantity' },
  { label: 'Giá giảm dần', value: 'price_decrease' },
  { label: 'Giá tăng dần', value: 'price_increase' },
] as const

export interface FilterProductReq extends QueryList {
  product_type?: GetProductType
  category_ids?: number[]
  category_minor_ids?: number[]
  attributes?: { attribute_id: number; attribute_value_ids: number[] }[]
  sort_by?: ProductfilterSortType
  price_min?: number | undefined
  price_max?: number | undefined
  keyword?: string
  all_product?: boolean
  partner_id?: number
}

export interface ProductDetailResV2 {
  descendants_structor: Category[]
  product_data: ProductDetailV2
}

export interface Product {
  company_id: number
  product_id: number
  category_id: Category
  product_code: string
  barcode: string
  product_name: string
  representation_image: ImageId
  image_ids: ImageId[]
  price_unit: number
  origin_price_unit: number
  sold_quantity: number
  uom_id: ProductUom
  create_date: Date
  attribute_minor_ids: AttributeMinor[]
  rel_uom_ids: ProductUom[]
  packaging_specifications: string
  promotion_category: string
  attribute_ids: ProductAttributeV2[]
  rel_attribute_ids: ProductRelAttribute[]
  has_variant: boolean
  star_rating: StarRatingRange
  rating_count: number
  product_available: number
  quantity: number
  stock_quantity: ProductUom
  product_type: ProductClassification
  price_list: { [key: number]: { [key: number]: number } }
}

export interface Combo {
  combo_id: number
  combo_name: string
  combo_code: string
  create_date: string
  price_unit: number
  sold_quantity: number
  product_type: ProductType
  attachment_cloud_id: {
    data_type: string
    id: number
    image_url: string
    name: string
    url: string
  }
}

export interface ProductVariant {
  id: number
  name: string
  code: string
  type: ProductType
  price: number
  priceOriginal: number | null
  stockQuantity: number | null
  soldQuantity: number
  imageUrl: string
  units: ProductUom[]
  unitId: number | null
  unitName: string | null
  categoryId: number | null
  categoryName: string | null
  pricelist: { [key: number]: { [key: number]: number } } | null
}

export interface ProductUom {
  uom_id: number
  uom_name: string
  uom_full_standard_name?: string
  factor?: number
  quantity?: number
}

export interface ProductAttributeV2 {
  attribute: AttributeId
  attribute_value: ValueId
}

export interface ProductAttributeSelected {
  attribute: AttributeId
  attribute_value: ValueId[]
}

export interface ProductRelAttribute {
  attribute_id: AttributeId
  attribute_value: ValueId[]
}

export interface ListAttributeId {
  id: number
  lst_attributes_id: Array<number>
}

export interface DescriptionContentTab {
  content_id: number
  tab_id: number
  tab_name: string
  content: string
  extra_content: string
}

export type DescriptionContentChild = Omit<DescriptionContent, 'child'>

export interface DescriptionContent {
  category_id: number
  category_name: string
  content: string
  extra_content: string
  tab: DescriptionContentTab[]
  child: DescriptionContentChild[]
}

export interface GetProductDetailV2Req {
  product_id?: number
  combo_id?: number
  product_code?: string
  partner_id?: number
}

export interface ProductDetailV2 extends Product {
  rel_product_ids: Product[]
  liked: boolean
  liked_count: number
  image_urls: ImageId[]
  cover_image_link: ImageId
  image_links: []
  description_content: DescriptionContent[]
  category_minor_ids: Category[]
  categories?: Category[] // this field just for quickOrder feature to filter by category
  company_ids?: CompanyIdName
  combo_id?: number
  combo_name?: string
  combo_code?: string
  item_count?: number
  attachment_cloud_ids?: []
  item_ids?: {
    item_id: number
    product_id: Product
    uom_id: ProductUom
    quantity: number
    price_unit: number
    price_total: number
  }[]
}

export interface ProductDescriptionTab {
  content_id: number
  tab_id: number
  tab_name: string
  content: string
  extra_content: string
}

export interface ProductDescriptionChild extends ProductDescription {}

export interface ProductDescription {
  category_id: number
  category_name: string
  content: string
  extra_content: string
  tab: ProductDescriptionTab[]
  child: ProductDescriptionChild[]
}

export interface PurchasedProduct {
  history_line_id: number
  sale_order: {
    sale_id: number
    sale_name: string
  }
  product: PurchaseProduct
  comment_rating: CommentRating
}

export interface PurchaseProduct {
  product_tmpl_id: number
  product_id: number
  product_name: string
  qty_product: number
  price_unit: number
  amount_total: number
  image_url: Array<string>
}

export interface CommentRating {
  comment_id: number
  message: string | false
  star_rating: StarString
  star_rating_int: StarRatingRangeReq
  rating_tag: TagRating[]
  date: string
  partner_id: number
  partner_name: string
  partner_avatar: string
  content: string
  product_id: {
    id: number
    name: string
  }
  time_duration: {
    time_value: number
    time_type: TIME_TYPE
  }
  editable: boolean
  attachment_ids: {
    id: number
    file: string
    mimetype: 'image/jpeg' | 'image/png'
  }[]
  image_urls: {
    image_id: number
    image_url: string
  }[]
}

export interface TagRating {
  tag_id: number
  tag_content: string
}

export type TIME_TYPE = 'day' | 'second' | 'hour' | 'minute' | 'year' | 'month' | 'week'

export type ProductListRes = {
  descendants_structor: Category[]
  category_child: Category[]
  product_data: Product[]
  paginate: Pagination
}

export type GetDailyDealsReq = QueryList & {
  partner_id?: number
}

export type GetDetailDailyDealReq = QueryList & {
  partner_id?: number
  deal_id: number
}

export interface DailyDealRes {
  deal_id: number
  deal_name: string
  deals_title: string
  deal_description: string
  start_date: string
  end_date: string
  banner: string
  offer_pricelist: IdAndName
  product_promotion: Product[]
}
