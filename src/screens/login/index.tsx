import { CloseIcon, Images, PhoneIcon } from '@/assets'
import { Button, PasswordField, TextField } from '@/components'
import Checkbox from '@/components/checkbox'
import { domainSchema, loginPasswordSchema, phoneSchema } from '@/constants'
import { Storage } from '@/core'
import { useAuth } from '@/hooks'
import { useUserSlice } from '@/store'
import { BaseStyles, Colors, Typography } from '@/theme'
import { LoginDomainForm } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import axios, { isAxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Linking, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { styles } from './style'

const DEFAULT_SUFFIX = '.satavan.vn'

const Login = () => {
  const { loginSuccess } = useAuth()
  const { top, bottom } = useSafeAreaInsets()
  const setDomain = useUserSlice((status) => status.setDomain)
  const [isLoading, setIsLoading] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const [suffixDomain, setSuffixDomain] = useState(DEFAULT_SUFFIX)

  const defaultValues = useMemo(() => {
    const savedInfo: LoginDomainForm & { suffixDomain: string } = Storage.getItem(Storage.Keys.LOGIN_INFO)
    if (!savedInfo) {
      return undefined
    }

    const { suffixDomain, ...rest } = savedInfo
    if (!suffixDomain && rest.domain.endsWith(DEFAULT_SUFFIX)) {
      setSuffixDomain(DEFAULT_SUFFIX)
      const lastIndex = rest.domain.lastIndexOf(DEFAULT_SUFFIX)
      rest.domain = rest.domain.substring(0, lastIndex)
    } else {
      setSuffixDomain(suffixDomain)
    }
    setIsRemember(true)
    return rest
  }, [])

  const { control, handleSubmit, setFocus } = useForm<LoginDomainForm>({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(
      Yup.object().shape({
        phone: phoneSchema,
        domain: domainSchema,
        password: loginPasswordSchema,
      })
    ),
  })

  useEffect(() => {
    setFocus('domain')
  }, [])

  const submitHandler = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        `https://${data.domain}${suffixDomain}/user_information_controller/login_by_password`,
        {
          params: {
            phone: data.phone,
            password: data.password,
          },

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          validateStatus: () => false,
        },
        { timeout: 1000 * 10, timeoutErrorMessage: 'Nhập sai tên miền vui lòng nhập lại' }
      )
      if (res.status === 200) {
        setDomain(`https://${data.domain}${suffixDomain}`)

        if (res.data.success) {
          await loginSuccess(res.data.data)

          if (isRemember) {
            Storage.setItem(Storage.Keys.LOGIN_INFO, {
              ...data,
              suffixDomain,
            })
          } else {
            Storage.deleteItem(Storage.Keys.LOGIN_INFO)
          }
        } else {
          showMessage({
            message: res?.data?.message ?? 'Đăng nhập không thành công, vui lòng thử lại',
            type: 'danger',
          })
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showMessage({
          message: error?.message ?? 'Nhập sai tên miền vui lòng nhập lại',
          type: 'danger',
        })
      }
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <View style={{ backgroundColor: Colors.white, flex: 1, paddingTop: top, paddingBottom: bottom }}>
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
      >
        <View style={BaseStyles.flex1}>
          <View style={{ marginBottom: 32, rowGap: 16 }}>
            <Image source={Images.logoWithText} style={{ width: 200, height: 64 }} resizeMode="contain" />
            <Text style={[Typography.body18Bold, { fontSize: 28, lineHeight: 36 }]}>Đăng nhập tài khoản</Text>
          </View>

          <View style={{ rowGap: 16 }}>
            <TextField
              autoFocus
              name="domain"
              returnKeyType="next"
              control={control}
              label="Nhập tên miền"
              autoCapitalize="none"
              placeholder={suffixDomain ? 'dms' : 'dms.satavan.vn'}
              right={
                suffixDomain ? (
                  <View style={styles.suffixArea}>
                    <View style={styles.suffix}>
                      <Text style={styles.suffixText}>{suffixDomain}</Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        hitSlop={8}
                        onPress={() => {
                          setSuffixDomain('')
                          setFocus('domain')
                        }}
                      >
                        <CloseIcon size={16} fill={Colors.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : undefined
              }
              onSubmitEditing={() => setFocus('phone')}
            />
            <TextField
              name="phone"
              control={control}
              keyboardType="number-pad"
              label="Số điện thoại"
              returnKeyType="next"
              onSubmitEditing={() => setFocus('password')}
            />
            <PasswordField
              name="password"
              control={control}
              returnKeyType="done"
              label="Mật khẩu"
              onSubmitEditing={submitHandler}
            />
          </View>
          <Pressable
            onPress={() => setIsRemember((value) => !value)}
            style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8, BaseStyles.alignSelfStart, { marginTop: 12 }]}
          >
            <Checkbox value={isRemember} onChange={() => setIsRemember((value) => !value)} />
            <Text style={[Typography.body14Medium, { color: Colors.gray70 }]}>Ghi nhớ tài khoản</Text>
          </Pressable>
          <Button onPress={submitHandler} title="Đăng nhập" loading={isLoading} style={BaseStyles.mt24} />
        </View>

        <View style={[BaseStyles.flexRowCenter, BaseStyles.p16, BaseStyles.cGap4]}>
          <PhoneIcon size={14} fill={Colors.gray70} />
          <Text style={{ ...Typography.body12Normal, color: Colors.gray70 }}>
            Hỗ trợ:{' '}
            <Text
              onPress={() => Linking.openURL(`tel:${+84909099580}`)}
              style={{ ...Typography.body12Medium, color: Colors.active }}
            >
              0909.099.580
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login
