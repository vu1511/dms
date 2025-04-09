import {
  AttributeMinor,
  Category,
  Combo,
  DailyDealRes,
  FilterProductReq,
  GetCategoryParams,
  GetDailyDealsReq,
  GetDetailDailyDealReq,
  GetListAttributeMinorParams,
  GetProductByAttributeMinorParams,
  GetProductByCategoryParams,
  GetProductDetailV2Req,
  HTTPListResponsePromiseV2,
  HTTPProductFilterResponse,
  HTTPResponse,
  HTTPResponsePromiseV2,
  HTTPResponseV2,
  Product,
  ProductDescription,
  ProductDetailV2,
  ProductParams,
  ProductVariant,
} from '@/types'
import { mappingComboAndProductToProductVariant } from '@/utils'
import { axiosInstance } from './axiosInstance'

const productV2API = {
  getProductVariants: async (params: FilterProductReq): Promise<HTTPProductFilterResponse<ProductVariant[]>> => {
    const response: HTTPProductFilterResponse<(Combo | Product)[]> = await axiosInstance.post(
      `/product_controller/list_product_by_filter`,
      { params: { ...params, all_product: true } }
    )
    const products = response.data?.result

    return {
      ...response,
      data: {
        ...response.data,
        result: products?.length ? products.map(mappingComboAndProductToProductVariant) : [],
      },
    }
  },

  filterProduct: (params: FilterProductReq): Promise<HTTPProductFilterResponse<(Product | Combo)[]>> => {
    return axiosInstance.post(`/product_controller/list_product_by_filter`, { params })
  },

  getProductDetail: (
    params: GetProductDetailV2Req
  ): HTTPResponsePromiseV2<{ product_data: ProductDetailV2; descendants_structor: Category[] }> => {
    return axiosInstance.get(`/product_controller/detail_product`, {
      params,
    })
  },

  getProductDescription: (product_id: number): HTTPResponsePromiseV2<ProductDescription[]> => {
    return axiosInstance.get(`/description_content_controller/description_content`, {
      params: { product_id },
    })
  },

  getCategories: (params: GetCategoryParams): HTTPListResponsePromiseV2<Category[]> => {
    return axiosInstance.get(`/category_controller/list_category_major`, {
      params,
    })
  },

  getCategoryMinors: (params: GetCategoryParams): HTTPListResponsePromiseV2<Category[]> => {
    return axiosInstance.get('/category_controller/list_category_minor', {
      params,
    })
  },

  getAtributeMinors: (params: GetListAttributeMinorParams): HTTPListResponsePromiseV2<AttributeMinor[]> => {
    return axiosInstance.get(`/category_controller/list_attribute_minor`, {
      params,
    })
  },

  getListVisceraAttribute: () => {
    return axiosInstance.get('/category_controller/list_viscera_attribute_value')
  },

  getProductsByAttributeMinor: (params: GetProductByAttributeMinorParams) => {
    return axiosInstance.get(`/category_controller/list_product_by_attribute_minor`, {
      params: {
        ...params,
        attribute_value_ids: params?.attribute_value_ids?.length ? [`${params.attribute_value_ids.join(', ')}`] : [],
      },
    })
  },

  getProductsByCategoryMinor: (params: GetProductByCategoryParams) => {
    return axiosInstance.get(`/product_controller/list_product_by_category_minor`, {
      params: {
        ...params,
        product_type: `["product_product"]`,
      },
    })
  },

  getProductsByCategoryMajor: (params: GetProductByCategoryParams): Promise<HTTPResponseV2<Product[]>> => {
    return axiosInstance.get(`/product_controller/list_product_by_category_major`, {
      params: {
        ...params,
        product_type: `["product_product"]`,
      },
    })
  },

  getAccessoryProduct: (params: ProductParams): Promise<HTTPResponseV2<Product[]>> => {
    return axiosInstance.get(`/product_controller/list_accessory_product`, {
      params,
    })
  },

  getDailyDeals: (params: GetDailyDealsReq): Promise<HTTPResponseV2<DailyDealRes[]>> => {
    return axiosInstance.get(`/daily_deal_controller/daily_deal`, {
      params,
    })
  },

  getDetailDailyDeal: (params: GetDetailDailyDealReq): Promise<HTTPResponse<DailyDealRes>> => {
    return axiosInstance.get(`/daily_deal_controller/detail_daily_deal`, {
      params,
    })
  },
}

export { productV2API }
