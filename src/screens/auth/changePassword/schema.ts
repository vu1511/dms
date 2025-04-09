import * as Yup from 'yup'

export const changePasswordSchema = Yup.object().shape({
  old_password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .notOneOf([Yup.ref('old_password')], 'Vui lòng nhập mật khẩu mới khác với mật khẩu trước đó')
    .required('Vui lòng nhập mật khẩu mới'),
  re_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận phải trùng với mật khẩu mới')
    .required('Vui lòng nhập mật khẩu xác nhận'),
})
