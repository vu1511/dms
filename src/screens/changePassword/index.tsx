import { BottomAreaView, Button, Container, PasswordField } from '@/components'
import { useAsync } from '@/hooks'
import { userAPI } from '@/services'
import { Colors } from '@/theme'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { KeyboardStickyView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { ButtonBottom, Container, PasswordField } from '../../components'
import * as Yup from 'yup'

type ChangePasswordForm = {
  old_password: string
  password: string
  re_password: string
}

const ChangePassword = () => {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation()
  const { asyncHandler } = useAsync()

  const { control, handleSubmit, setFocus } = useForm<ChangePasswordForm>({
    resolver: yupResolver(
      Yup.object().shape({
        old_password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        password: Yup.string()
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
          .notOneOf([Yup.ref('old_password')], 'Vui lòng nhập mật khẩu mới khác với mật khẩu trước đó')
          .required('Vui lòng nhập mật khẩu mới'),
        re_password: Yup.string()
          .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận phải trùng với mật khẩu mới')
          .required('Vui lòng nhập mật khẩu xác nhận'),
      })
    ),
    mode: 'all',
    defaultValues: undefined,
  })

  const onSubmitHandler = handleSubmit((params: ChangePasswordForm) => {
    asyncHandler({
      fetcher: userAPI.updatePassword(params),
      onSuccess: () => {
        navigation.goBack()
      },
      config: { successMsg: 'Thay đổi mật khẩu thành công!' },
    })
  })

  return (
    <Container title="Đổi mật khẩu" backgroundColor={Colors.white}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 16, rowGap: 24 }}
        contentContainerStyle={{ rowGap: 24 }}
      >
        <PasswordField
          required
          name="old_password"
          control={control}
          label="Mật khẩu hiện tại"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('password')}
        />
        <PasswordField
          required
          name="password"
          control={control}
          label="Mật khẩu mới"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('re_password')}
        />
        <PasswordField
          required
          name="re_password"
          control={control}
          label="Xác nhận mật khẩu mới"
          returnKeyType="send"
          onSubmitEditing={onSubmitHandler}
        />
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ opened: Math.max(bottom - 16, 0) }}>
        <BottomAreaView>
          <Button title="Xác nhận" onPress={onSubmitHandler} />
        </BottomAreaView>
      </KeyboardStickyView>
    </Container>
  )
}

export default ChangePassword
