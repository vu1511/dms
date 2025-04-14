import { AttachmentUrlRes, IdAndName, IdAndUrl, ImagePickerResult, StarRating } from '@/types'
import * as Yup from 'yup'
import { Regex } from './regex'

export const idAndNameSchema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string(),
}) as Yup.ObjectSchema<IdAndName>

export const idAndNameRequiredSchema: Yup.ObjectSchema<IdAndName> = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string().required(),
})

export const idAndUrlSchema = Yup.object().shape({
  id: Yup.number(),
  url: Yup.string(),
}) as Yup.ObjectSchema<IdAndUrl>

export const emailSchema = Yup.string()
  .required('Vui lòng nhập email')
  .matches(Regex.email, 'Vui lòng nhập đúng định dạng email')

export const phoneSchema = Yup.string()
  .required('Vui lòng nhập số điện thoại')
  .matches(Regex.phone, 'Vui lòng nhập đúng định dạng số điện thoại')

export const domainSchema = Yup.string().required('Vui lòng nhập tên miền')

export const attachmentSchema: Yup.ObjectSchema<AttachmentUrlRes> = Yup.object().shape({
  attachment_id: Yup.number().required(),
  attachment_url: Yup.string().required(),
})

export const loginPasswordSchema = Yup.string()
  .required('Vui lòng nhập mật khẩu')
  .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')

export const ratingStarSchema = Yup.string().oneOf(['1', '2', '3', '4', '5']) as Yup.StringSchema<StarRating>

export const imagePickerSchema = Yup.object().shape({
  uri: Yup.string().required(),
  base64: Yup.string(),
  size: Yup.number().required(),
  height: Yup.number().required(),
  width: Yup.number().required(),
  mime: Yup.string().required(),
}) as Yup.ObjectSchema<ImagePickerResult>
