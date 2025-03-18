import { IdAndName, ValueId } from './core'
import { Pagination, QueryList } from './http'
import { CompanyId } from './product'
import {
  CategoryIdAndName,
  GetPromotionApplyOnCategory,
  GetPromotionApplyOnCategoryReq,
  GetPromotionApplyOnCompany,
  GetPromotionApplyOnCompanyReq,
  GetPromotionApplyOnProduct,
  GetPromotionsAppliedOnProductReq,
  ImageId,
  PromotionRes,
} from './promotion'

export interface AddToCartReq {
  company_id: number
  product_id?: number
  uom_id?: number
  combo_id?: number
  quantity?: number
  price_unit?: number
  partner_id?: number | null
}

export interface AddManyToCartReq {
  company_id: number
  order_data: Omit<AddToCartReq, 'company_id'>[]
  partner_id?: number | null
}

export interface AddToCartRes {
  compute_type: 'add' | 'update'
}

export interface CartUom {
  uom_id: number
  uom_name: string
  price_unit: number
  factor: number
}

export interface ProductAttributeId {
  attribute_id: number
  attribute_name: string
}

export interface CartProductAttributeRes {
  attribute: ProductAttributeId
  attribute_value: ValueId
}

export interface CartProductAttributeValue extends ProductAttributeId, ValueId {}

export interface GetProductsInCartReq extends QueryList {
  limit_category?: number
  limit_product?: number
  partner_id?: number | null
}

export interface GetProductsInCartRes {
  result: CartCompanyRes[]
  paginate: Pagination
  is_check: boolean
  total_company_checked: number
}

export interface GetCartCategoriesInCompanyReq extends QueryList {
  shopping_cart_id: number
  limit_product: number
  partner_id?: number | null
}

export interface GetCartProductsInCategoryReq extends QueryList {
  cart_category_id: number
  partner_id?: number | null
}

export interface CartProductVariants {
  attribute_id: ProductAttributeId
  attribute_value: ValueId[]
}

export interface RelProductRes {
  product_id: number
  product_code: string
  product_name: string
  price_unit: number
  product_tmpl_id: number
  stock: CartProductStock
  representation_image: ImageId
  product_type: string | boolean
  attribute_ids: CartProductAttributeRes[]
}

export interface CartRelProductRes extends RelProductRes {
  shopping_cart_product_id: number
  is_check: boolean
  quantity: number
}

export type RelProductResQty = RelProductRes & { quantity: number }

export type CartItemProductRes = Pick<
  RelProductRes,
  'product_id' | 'product_name' | 'product_code' | 'attribute_ids'
> & {
  representation_image: string
}

export interface CartComboRes {
  combo_id: number
  combo_name: string
  price_unit: number
  attachment_cloud_id: {
    id: number
    url: string
  }
}

export interface CartProductStock {
  uom_name: number
  factor: number
  quantity: number
}

export interface CartProductRes {
  shopping_cart_product_id: number
  combo_id: CartComboRes
  stock: CartProductStock
  product_id: RelProductRes
  rel_product_ids: RelProductRes[]
  attribute_ids: CartProductVariants[]
  uom_id: CartUom
  rel_uom_ids: CartUom[]
  quantity: number
  price_unit: number
  is_check: boolean
  has_promotion: boolean
  price_list: {
    [key: number]: {
      [key: number]: number
    }
  }
  promotions_product_applied?: PromotionRes[]
  is_product_promotion_loading?: boolean
}

type Icon = {
  id: number
  url: string
  name: string
  data_type: string
}

export interface CartCategoryRes {
  cart_category_id: number
  category_id: CategoryIdAndName
  icon: Icon
  is_check: boolean
  has_promotion: boolean
  shopping_cart_product: CartProductRes[]
  paginate: Pagination
  promotions_category_applied?: PromotionRes[]
  is_promotion_category_loading?: boolean
}

export interface CartCompanyRes {
  shopping_cart_id: number
  company_id: CompanyId
  is_check: boolean
  has_promotion: boolean
  total_category: number
  total_product: number
  total_category_checked: number
  total_product_checked: number
  shopping_cart_category: CartCategoryRes[]
  paginate_cart_category: Pagination
  promotions_applied?: PromotionRes[]
  is_promotion_loading?: boolean
}

export interface ProductDiscount {
  id: number
  id_product: number
  is_sale_off: boolean
  uom: IdAndName
  name: string
  type: 'fixed'
  price: number
  lst_price: number
  image_url: string[]
  max_product: number
  active?: boolean
  quantity: number
}

export enum UpdateCartItemDiscountType {
  Fixed = 'fixed',
  Percent = 'percent',
}

export interface UpdateCartItemReq {
  cart_product_id: number
  product_id?: number
  uom_id?: number
  combo_id?: number
  quantity: number
  price_unit: number
  is_check: boolean
  partner_id?: number | null
  discount_type?: UpdateCartItemDiscountType
  discount?: number
}

export type UpdateCartItemRes = CartProductRes

export interface DeleteCartItemReq {
  cart_product_ids: number[]
  partner_id?: number | null
}

export interface GetProductCountInCartRes {
  cart_product_count: number
  product_in_cart_count: number
}

export interface CheckProductsInCartReq {
  shopping_cart_ids?: number[]
  cart_category_ids?: number[]
  is_check: boolean
  partner_id?: number | null
}

export interface DeleteCartItemsReq {
  company_ids?: number[]
  category_ids?: number[]
  partner_id?: number
}

export interface CheckedCartProduct {
  id: RelProductRes
  company_id: number
  category_id: number
}

export interface CheckedCartCategory {
  id: number
  company_id: number
}

export interface CheckedCart {
  companies: number[]
  categories: CheckedCartCategory[]
  products: CheckedCartProduct[]
}

export interface MutateProductParams {
  companyIndex: number
  categoryIndex: number
  productIndex: number
}

export type GetMoreProductInCategory = Omit<MutateProductParams, 'productIndex'> & {
  category: CartCategoryRes
}

export type GetMoreCategoryInCompany = Pick<MutateProductParams, 'companyIndex'> & {
  company: CartCompanyRes
}

export type UpdateCartProductType = 'variant' | 'uom' | 'quantity' | 'price'

export type UpdateProduct = MutateProductParams & {
  product: CartProductRes
  type: UpdateCartProductType
}

export interface ToggleCheckProduct extends MutateProductParams {
  shopping_cart_product_id: number
}

export interface ResetPromotionsApplied {
  data: GetProductsInCartRes
  companyId: number
  categoryId?: number
  productId?: number
}

// export interface getPromotionsCanApplyReq {
//   productResult: GetPromotionApplyOnProduct | GetPromotionApplyOnProduct[] | undefined
//   categoryResult: GetPromotionApplyOnCategory | GetPromotionApplyOnCategory[]
//   companyResult: HTTPListResponse<PromotionRes>
// }

export interface GetPromotionsCanApplyFunctionReq {
  cart: GetProductsInCartRes
  companyParams?: GetPromotionApplyOnCompanyReq
  categoryParams?: GetPromotionApplyOnCategoryReq
  productParams?: GetPromotionsAppliedOnProductReq | undefined
}

export interface MutateCartSummary {
  shopping_cart_ids: number[]
  cart_category_ids: number[]
  shopping_cart_product_ids: number[]
  customer_id: number
  get_all_products_checked?: boolean
  cart: GetProductsInCartRes
}

export interface AppendPromotionsToCart {
  cart: GetProductsInCartRes
  companyResult?: GetPromotionApplyOnCompany[] | undefined
  categoryResult?: (GetPromotionApplyOnCategory & { company_id: number })[] | undefined
  productResult?: (GetPromotionApplyOnProduct & { company_id: number })[] | undefined
}
export interface CheckedPromotion {
  id: number
  id_product: number
  is_sale_off: boolean
  uom: IdAndName
  name: string
  type: 'fixed'
  price: number
  lst_price: number
  image_url: string[]
  max_product: number
  active?: boolean
  quantity: number
}
