import { idAndNameSchema, imagePickerSchema, phoneSchema } from '@/constants'
import { CreateAccountForm } from '@/types'
import * as Yup from 'yup'

export const createCustomerSchema: Yup.ObjectSchema<CreateAccountForm> = Yup.object().shape({
  image: imagePickerSchema.required('Vui lòng nhập trường này'),
  name: Yup.string().required('Vui lòng nhập trường này'),
  customer_name: Yup.string().required('Vui lòng nhập trường này'),
  phone: phoneSchema,
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .transform((value) => value || undefined),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận phải trùng với mật khẩu mới')
    .transform((value) => value || undefined)
    .when('password', ([password], schema) => {
      return password ? schema.required('Vui lòng nhập mật khẩu xác nhận') : schema
    }),
  address: Yup.object().shape({
    ward_id: Yup.number().required('Vui lòng nhập trường này'),
    district_id: Yup.number().required('Vui lòng nhập trường này'),
    state_id: Yup.number().required('Vui lòng nhập trường này'),
    street: Yup.string().required('Vui lòng nhập trường này'),
    state_name: Yup.string().required('Vui lòng nhập trường này'),
    district_name: Yup.string().required('Vui lòng nhập trường này'),
    ward_name: Yup.string().required('Vui lòng nhập trường này'),
  }),
  // longitude: Yup.string().required('Vui lòng nhập trường này'),
  // latitude: Yup.string().required('Vui lòng nhập trường này'),
  birth_day: Yup.date().nullable(),
  hcategory_id: idAndNameSchema.nullable(),
  route_sale_id: idAndNameSchema.nullable(),
})
