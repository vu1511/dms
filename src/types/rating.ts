import { AttachmentUrlRes, IdAndName, Option, TimeValue, URLRes } from './core'
import { QueryList } from './http'
import { CompanyId } from './product'
import { Product } from './productV2'
import { RatingTagRes } from './route'
import { AccountType, UserGenderType } from './user'

export type RatingType =
  | 'checkin'
  | 'product_store'
  | 'product_product'
  | 'product_damaged'
  | 'processing'
  | 'inventory'

export const RatingTypeLabel = {
  checkin: 'Check-in',
  product_store: 'Kệ trưng bày',
  product_product: 'Đối thủ',
  product_damaged: 'Sản phẩm hư hỏng',
  processing: 'processing',
  inventory: 'inventory',
} as const

export enum ECustomerRatingType {
  QuantityProduct = 'quantity_product',
  QualityProduct = 'quality_product',
  EmployeeAttitude = 'employee_attitude',
  Delivery = 'delivery',
}

export const CustomerCommentTypeLabel = {
  [ECustomerRatingType.QuantityProduct]: 'Chất lượng sản phẩm',
  [ECustomerRatingType.QualityProduct]: 'Số lượng sản phấm',
  [ECustomerRatingType.EmployeeAttitude]: 'Thái độ nhân viên',
  [ECustomerRatingType.Delivery]: 'Dịch vụ giao hàng',
} as const

export type AllRatingType = RatingType | `${ECustomerRatingType}`

export const AllRatingTypeOptions: Option<AllRatingType>[] = [
  {
    label: 'Dịch vụ giao hàng',
    value: ECustomerRatingType.Delivery,
  },
  {
    label: 'Số lượng sản phấm',
    value: ECustomerRatingType.QuantityProduct,
  },
  {
    label: 'Chất lượng sản phẩm',
    value: ECustomerRatingType.QualityProduct,
  },
  {
    label: 'Thái độ nhân viên',
    value: ECustomerRatingType.EmployeeAttitude,
  },
  {
    label: RatingTypeLabel.product_store,
    value: 'product_store',
  },
  {
    label: RatingTypeLabel.product_product,
    value: 'product_product',
  },
  {
    label: RatingTypeLabel.product_damaged,
    value: 'product_damaged',
  },
]

export type StarRating = '1' | '2' | '3' | '4' | '5'

export type StarRatingNumber = 1 | 2 | 3 | 4 | 5

export type RatingCommonData = {
  imageUrls: string[]
  ratingStar: number
  ratingContent: string
  ratingDate: string
  ratingTags: RatingTagRes[]
  ratingType: AllRatingType
}

export interface CreateRatingPhotoReq {
  customer_id: number
  rating_product_lines: [
    {
      rating_type: RatingType
      image: number[]
      rating_star: StarRating
      rating_tags: number[]
      rating_content: string
    },
  ]
}

export interface CreateRatingForm {
  image: AttachmentUrlRes[]
  rating_star: StarRating
  rating_tags: number[]
  rating_content: string
}

export type CreateRatingFormSubmit = Omit<CreateRatingForm, 'image'> & {
  image: number[]
  rating_type: RatingType
}

export interface CreateRatingPhotoRes {}

export type RatingAttachmentType = 'image' | 'video'

export type RatingAttachmentReq = { file: string; type: RatingAttachmentType }

export type CreateAttachmentReq = {
  attachments: RatingAttachmentReq[]
}

export type CreateRatingAttachmentReq = CreateAttachmentReq

export type IdAndUrl = {
  id: number
  url: string
}

export interface RatingPhotoRes {
  rating_product_line_id: number
  rating_product_line_name: string
  rating_type: RatingType
  image_url: IdAndUrl[]
  rating_star: { rating_star_int: number; rating_star_name: string }
  rating_tags: RatingTagRes[]
  rating_content: string
  rating_date: string
}

export interface GetRatingPhotoReq extends QueryList {
  customer_id?: number
  rating_type?: RatingType
  rating_date?: string
  start_date?: string
  end_date?: string
}

export interface GetCustomerCommentsReq extends QueryList {
  customer_id?: number
  full_data: true
}

export interface CreateCustomerCommentReq {
  customer_id: number
  comment_lines: (Omit<CreateRatingForm, 'image'> & {
    rating_type: ECustomerRatingType
    attachment_images: number[]
  })[]
}

export interface CreateCustomerCommentRes {}

export interface GetRatingPhotoTagsReq {
  type: Omit<RatingType, 'checkin'>
  rating_star?: StarRating
}

export type StarString = '1' | '2' | '3' | '4' | '5'

export interface AttachmentProps {
  product_id: number
  attachments: {
    file: string
    type: 'picture' | 'video'
  }[]
}

export interface DeleteRatingProps {
  history_line_id: number
  product_id: number
}

export interface GetRatingsByStarParams {
  product_tmpl_id: number
  star_ratings: StarString[]
  offset?: number
  limit?: number
}

export interface CreateRatingProps extends CreateRatingReq {
  onSuccess?: () => void
  onError?: () => void
}

export interface CreateRatingReq {
  product_id: number
  star_rating: StarRatingRangeReq
  history_line_id: Array<number>
  content: string
  tag_ids?: Array<number>
  image_ids?: Array<number>
  attachment_ids?: Array<number>
  limit?: number
  offset?: number
}

export type StarRatingRangeReq = 1 | 2 | 3 | 4 | 5

export type StarRatingRange = 0 | 1 | 2 | 3 | 4 | 5

export interface RatingRes {
  history_line_id: number
  sale_order: RatingSaleOrderRes
  product: Product
  comment_rating: Rating
}

export interface RatingSaleOrderRes {
  sale_order_id: number
  sale_name: string
  partner_id: RatingPartner
  company_id: CompanyId
  amount_total: number
  promotion: {}
}

export interface RatingPartner {
  partner_id: number
  partner_name: string
  phone: string
  gender: UserGenderType
  avatar_url: URLRes
}

export interface Rating extends Comment {}

export interface GetProductCommentsReq extends QueryList {
  product_id: Number
}

export interface ProductComment {
  comment_id: number
  author: {
    company_id: number
    partner_id: number
    partner_name: string
    phone: string
    gender: UserGenderType
    avatar_url: URLRes
    account_type: AccountType
  }
  content: string
  product_id: IdAndName
  date: string
  time_duration: TimeValue
  editable: boolean
  deletable: false
}

export interface CreateProductComentReq {
  product_id: number
  content: string
}

export interface CreateProductRatingReq {
  content: string
  product_id: number
  star_rating: StarRatingNumber
  history_line_id: number[]
  tag_ids?: number[]
  attachment_ids?: number[]
  image_ids?: number[]
}

export interface DeleteProductRatingReq {
  product_id: number
  history_line_id: number
}

export interface CustomerCommentRes {
  customer_comment_id: number
  customer_comment_name: string
  customer: IdAndName
  user: IdAndName
  comment_date: string
  comment_line_ids: [
    {
      comment_line_id: number
      comment_line_name: string
      company_id: CompanyId
      customer_id: {
        company_id: number
        partner_id: number
        partner_name: string
        phone: string
        gender: string
        avatar_url: {
          id: number
          url: string
          image_url: string
          name: string
          data_type: string
        }
        account_type: AccountType
        medicine_account_type: false
        business_type: false
        gpp_certification_image_url: {
          id: string
          url: string
          image_url: string
          name: string
          data_type: string
        }
        business_registration_certification_image_url: {
          id: false
          url: false
          image_url: false
          name: false
          data_type: false
        }
        business_operation_name: false
        business_operation_owner: false
        business_phone: false
        establish_date: false
        country_id: { country_id: number; country_name: string }
        province_id: { province_id: number; province_name: string }
        district_id: {
          district_id: number
          district_name: string
        }
        ward_id: { ward_id: number; ward_name: string }
        street: string
        full_address: string
        email: false
        date_of_birth: false
      }
      rating_type: { code: ECustomerRatingType; name: string }
      rating_star: { rating_star_int: number; rating_star_name: string }
      rating_tags: [{ tag_id: number; tag_content: string }, { tag_id: number; tag_content: string }]
      comment_date: string
      rating_content: string
      attachment_images: [
        {
          type_data: string
          id: number
          url: string
        },
      ]
    },
  ]
}
