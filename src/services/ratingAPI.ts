import {
  AttachmentUrlRes,
  CreateCustomerCommentReq,
  CreateCustomerCommentRes,
  CreateProductComentReq,
  CreateProductRatingReq,
  CreateRatingAttachmentReq,
  CreateRatingPhotoReq,
  CreateRatingPhotoRes,
  CustomerCommentRes,
  DeleteProductRatingReq,
  GetCustomerCommentsReq,
  GetProductCommentsReq,
  GetRatingPhotoReq,
  GetRatingPhotoTagsReq,
  HTTPDataResponse,
  HTTPListResponsePromiseV2,
  HTTPResponsePromiseV2,
  ProductComment,
  RatingPhotoRes,
  RatingTagRes,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const ratingAPI = {
  updateRatingProduct: (params: any): Promise<HTTPDataResponse<any>> => {
    return axiosInstance.post('/comment_controller/update_rating_product', {
      params,
    })
  },

  getRatingByProduct: (params: any): Promise<HTTPDataResponse<any>> => {
    return axiosInstance.post('/comment_controller/get_rating_by_product', {
      params,
    })
  },

  deleteRating: (params: any): Promise<HTTPDataResponse<any>> => {
    return axiosInstance.post('/comment_controller/delete_rating_product', {
      params,
    })
  },

  getProductHistory: (params: any): Promise<HTTPDataResponse<any>> => {
    return axiosInstance.post('/comment_controller/get_purchase_product_history', {
      params,
    })
  },

  createAttachment: (params: CreateRatingAttachmentReq): Promise<HTTPDataResponse<AttachmentUrlRes[]>> => {
    return axiosInstance.post('/manage_rating_product_by_image_controller/create_attachment_data', {
      params,
    })
  },

  getRatingTags: (params: GetRatingPhotoTagsReq): Promise<HTTPDataResponse<RatingTagRes[]>> => {
    return axiosInstance.post('/manage_tag_controller/get_list_tags', {
      params,
    })
  },

  createRatingByPhoto: (params: CreateRatingPhotoReq): Promise<HTTPDataResponse<CreateRatingPhotoRes>> => {
    return axiosInstance.post('/manage_rating_product_by_image_controller/create_rating_product_by_image', { params })
  },

  createRatingComment: (params: CreateCustomerCommentReq): Promise<HTTPDataResponse<CreateCustomerCommentRes[]>> => {
    return axiosInstance.post('/manage_customer_comment_controller/create_customer_comment', {
      params,
    })
  },

  getRatingData: (params: GetCustomerCommentsReq): Promise<HTTPDataResponse<CustomerCommentRes[]>> => {
    return axiosInstance.post('/manage_customer_comment_controller/get_list_customer_comment', {
      params,
    })
  },

  getRatingPhotos: (params: GetRatingPhotoReq): Promise<HTTPDataResponse<RatingPhotoRes[]>> => {
    return axiosInstance.post('/manage_rating_product_by_image_controller/get_list_rating_product_line', { params })
  },

  getProductComments: (params: GetProductCommentsReq): HTTPListResponsePromiseV2<ProductComment[]> => {
    return axiosInstance.get(`/comment_controller/rating_by_product`, {
      params: { ...params, comment_type: `['comment']` },
    })
  },
  deleteProductComment: (comment_id: number): HTTPResponsePromiseV2<any> => {
    return axiosInstance.delete(`/comment_controller/delete_comment_product`, {
      params: { comment_id },
    })
  },

  getProductRatingTags: (product_id: number): HTTPListResponsePromiseV2<any> => {
    return axiosInstance.delete(`/comment_controller/rating_tag`, {
      params: { product_id },
    })
  },

  createProductComment: (params: CreateProductComentReq): HTTPResponsePromiseV2<ProductComment> => {
    return axiosInstance.post(`/comment_controller/create_comment_product`, {
      params,
    })
  },

  createProductAttachment: (params: CreateRatingAttachmentReq): HTTPResponsePromiseV2<any> => {
    return axiosInstance.post(`/comment_controller/create_attachment`, {
      params,
    })
  },

  createProductRating: (params: CreateProductRatingReq): HTTPResponsePromiseV2<any> => {
    return axiosInstance.post(`/comment_controller/update_rating_product`, {
      params,
    })
  },

  deleteProductRating: (params: DeleteProductRatingReq): HTTPResponsePromiseV2<any> => {
    return axiosInstance.delete(`/comment_controller/rating_product`, {
      params,
    })
  },

  getGroupRatingStarCount: (product_id: number): HTTPResponsePromiseV2<any> => {
    return axiosInstance.delete(`/comment_controller/group_rating_star_count`, {
      params: { product_id },
    })
  },
}
