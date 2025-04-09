import { Combo, Product, ProductVariant } from '@/types'

export const isComboInterface = (value: unknown): value is Combo => {
  return typeof value === 'object' && value !== null && 'combo_id' in value
}

export const isProductInterface = (value: unknown): value is Product => {
  return typeof value === 'object' && value !== null && 'product_id' in value
}

export const mappingComboAndProductToProductVariant = (value: Combo | Product): ProductVariant => {
  if (isComboInterface(value)) {
    return {
      type: 'combo',
      id: value.combo_id,
      quantity: null,
      pricelist: null,
      name: value.combo_name,
      code: value.combo_code,
      price: value.price_unit,
      soldQuantity: value.sold_quantity,
      imageUrl: value.attachment_cloud_id?.image_url ?? '',
      units: [],
    }
  }

  return {
    type: 'product',
    id: value.product_id,
    name: value.product_name,
    code: value.product_code,
    price: value.price_unit,
    categoryId: value.category_id?.category_id || null,
    categoryName: value.category_id?.category_name || null,
    unitId: value.uom_id?.uom_id || null,
    unitName: value.uom_id?.uom_name || null,
    priceOriginal: value.origin_price_unit || 0,
    pricelist: value?.price_list ?? null,
    soldQuantity: value.sold_quantity,
    imageUrl: value.representation_image?.image_url ?? '',
    units: value.rel_uom_ids?.length > 0 ? value.rel_uom_ids : [],
    stockQuantity: typeof value.stock_quantity?.quantity === 'number' ? value.stock_quantity?.quantity : null,
  }
}
