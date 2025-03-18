import {
  Banner,
  BannerRes,
  CategoryRes,
  CompanyRes,
  ComputePriceReq,
  GetBannerParams,
  GetCategoryReq,
  GetProductDetailReq,
  GetProductSaleOffReq,
  GetProductsDealReq,
  GetProductsDealRes,
  GetProductsReq,
  HTTPResponse,
  HTTPResponseV2,
  IdNameAndPrice,
  ProductDetailRes,
  ProductRes,
  ProductSaleOffRes,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const productAPI = {
  getProducts: (params: GetProductsReq): Promise<{ result: ProductRes[] }> => {
    return axiosInstance.post('/api/v2.0/product/top', {
      params,
    })
  },

  getBanners: (): Promise<HTTPResponse<BannerRes[]>> => {
    return axiosInstance.post('/api/v3.0/interface/get_image', {
      params: {},
    })
  },

  getProductsDeal: (params?: GetProductsDealReq): Promise<HTTPResponse<GetProductsDealRes[]>> => {
    return axiosInstance.post('/daily_deal_controller/get_daily_deal', {
      params: params || {},
    })
  },

  getCategories: (params?: GetCategoryReq): Promise<HTTPResponse<CategoryRes[]>> => {
    return axiosInstance.post('/api/v2.0/product/category', {
      params,
    })
  },

  getProductsSaleOff: (
    params: GetProductSaleOffReq
  ): Promise<HTTPResponse<{ list_discount_off: []; list_sale_off: ProductSaleOffRes[] }>> => {
    return axiosInstance.post('/api/v2.0/product/list_sale_off', {
      params,
    })
  },

  getProductDetail: (params: GetProductDetailReq): Promise<HTTPResponse<{ detail: ProductDetailRes }>> => {
    return axiosInstance.post('/api/v2.0/product_product/detail', {
      params,
    })
  },

  computeProductPrice: (params: ComputePriceReq): Promise<HTTPResponse<{ detail: IdNameAndPrice[] }>> => {
    return axiosInstance.post('/api/v2.0/product_product/compute_price', {
      params,
    })
  },

  getCompanies: (params: any = {}): Promise<HTTPResponse<[{ lst_companies: CompanyRes[] }]>> => {
    return axiosInstance.post('/api/v2.0/employee/get_list_companies', {
      params,
    })
  },

  getProductVariants: (params?: GetProductsReq): Promise<HTTPResponse<ProductRes[]>> => {
    return axiosInstance.post('/api/v3.0/product/get_product_variant', {
      params,
    })
  },

  getBannerHome: (params: GetBannerParams): Promise<HTTPResponseV2<Banner[]>> => {
    return axiosInstance.get('/description_content_controller/banner_information', {
      params: params,
    })
  },
}
