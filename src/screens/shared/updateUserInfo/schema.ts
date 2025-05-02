import { coordinateSchema, imagePickerSchema } from '@/constants'
import { UpdateUserInfoForm } from '@/types'
import * as Yup from 'yup'

export const userInfoSchema = Yup.object().shape({
  birth_day: Yup.string().nullable(),
  coordinate: coordinateSchema,
  name: Yup.string().required('Vui lòng nhập trường này'),
  sex: Yup.string().nullable(),
  phone: Yup.string().required('Vui lòng nhập trường này'),
  image: imagePickerSchema,
  address: Yup.object()
    .shape({
      street: Yup.string().required('Vui lòng nhập trường này'),
      state_id: Yup.number().required('Vui lòng nhập trường này'),
      state_name: Yup.string().required('Vui lòng nhập trường này'),
      district_id: Yup.number().required('Vui lòng nhập trường này'),
      district_name: Yup.string().required('Vui lòng nhập trường này'),
      ward_id: Yup.number().required('Vui lòng nhập trường này'),
      ward_name: Yup.string().required('Vui lòng nhập trường này'),
    })
    .required('Vui lòng nhập trường này'),
}) as Yup.ObjectSchema<UpdateUserInfoForm>
