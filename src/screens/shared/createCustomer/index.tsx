import { ArrowRightIcon } from '@/assets'
import {
  AvatarPicker,
  BottomAreaView,
  Button,
  Container,
  DateField,
  PasswordField,
  TextField,
  TextInput,
} from '@/components'
import { DEFAULT_COUNTRY_ID } from '@/constants'
import { System } from '@/core'
import { useAsync, useCurrentLocation, usePreventGoBack } from '@/hooks'
import { Navigation, RouteProp, Routes } from '@/routes'
import { userAPI } from '@/services'
import { BaseStyles, Colors } from '@/theme'
import { CreateAccountForm, CreateAccountReq } from '@/types'
import { getAddressLabel, removeEmptyValueFromObject } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CustomerGroupField } from './customerGroupField'
import { RouteField } from './routeField'
import { createCustomerSchema } from './schema'

const CreateCustomer = () => {
  const {
    params: { route: defaultRoute, showRoute = true, onSuccess },
  } = useRoute<RouteProp<Routes.CreateCustomer>>()
  const navigation = useNavigation<Navigation>()
  const { bottom } = useSafeAreaInsets()

  const { asyncHandler } = useAsync()
  const { getCurrentLocation, coordinate, isLoading: isLoadingLocation } = useCurrentLocation()

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isDirty, isSubmitSuccessful },
  } = useForm<CreateAccountForm>({
    resolver: yupResolver(createCustomerSchema),
    mode: 'onChange',
    defaultValues: {
      route_sale_id: defaultRoute,
    },
  })

  usePreventGoBack({
    hasUnsavedChanges: isDirty && !isSubmitSuccessful,
  })

  const createAccount = async (params: CreateAccountReq) => {
    System.showBackdrop()
    asyncHandler({
      fetcher: userAPI.checkRegister(params),
      onSuccess: () => {
        asyncHandler({
          fetcher: userAPI.createAccount(params),
          onSuccess: () => {
            System.closeBackdrop()
            onSuccess?.()
          },
          onError: () => System.closeBackdrop(),
          config: { showBackdrop: false, successMsg: 'Tạo khách hàng thành công' },
        })
      },
      onError: () => System.closeBackdrop(),
      config: { showBackdrop: false, showSuccessMsg: false },
    })
  }

  const onSubmitHandler = async () => {
    const location = coordinate || (await getCurrentLocation())
    if (!location) return

    handleSubmit((params: CreateAccountForm) => {
      createAccount(
        removeEmptyValueFromObject({
          ...params,
          image: params.image?.base64 as string,
          hcategory_id: params.hcategory_id?.id,
          longitude: (location?.longitude ?? 0).toString(),
          latitude: (location?.latitude ?? 0).toString(),
          address: { ...params.address, country_id: DEFAULT_COUNTRY_ID },
          route_sale_id: params.route_sale_id?.id,
          birth_day: params?.birth_day ? moment(params.birth_day).format('DD-MM-YYYY') : '',
        })
      )
    })()
  }

  return (
    <Container backgroundColor={Colors.white} headerShadowVisible={false} title="Tạo khách hàng">
      <KeyboardAwareScrollView
        style={BaseStyles.flex1}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ rowGap: 24, padding: 16 }}
        bottomOffset={64 + Math.max(bottom, 16) + 12}
      >
        <Controller
          control={control}
          name="image"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <AvatarPicker onBlur={onBlur} onChange={onChange} uri={value?.uri} error={!!error} />
          )}
        />
        <TextField
          required
          name="phone"
          control={control}
          label="Số điện thoại"
          keyboardType="number-pad"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('name')}
        />
        <TextField
          required
          name="name"
          control={control}
          label="Tên cửa hàng"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('customer_name')}
        />
        <TextField
          required
          control={control}
          name="customer_name"
          label="Tên khách hàng"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('password')}
        />
        <DateField mode="date" maximumDate={new Date()} label="Chọn ngày sinh" control={control} name="birth_day" />
        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            const navigateToAddress = () => {
              navigation.navigate(Routes.CreateAddress, {
                defaultValues: value,
                onSubmit: (data) => {
                  onChange(data)
                  navigation.pop()
                },
              })
            }

            return (
              <TextInput
                required
                readOnly
                editable={false}
                error={!!error}
                pointerEvents="none"
                label="Địa chỉ"
                errorMsg="Vui lòng nhập địa chỉ"
                right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
                value={getAddressLabel(value?.street, value?.ward_name, value?.district_name, value?.state_name)}
                onPress={navigateToAddress}
              />
            )
          }}
        />
        {showRoute ? <RouteField control={control} /> : null}
        <CustomerGroupField control={control} />
        <PasswordField
          control={control}
          name="password"
          label="Mật khẩu"
          textContentType="oneTimeCode"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('confirm_password')}
        />
        <PasswordField
          control={control}
          textContentType="oneTimeCode"
          label="Xác nhận mật khẩu"
          name="confirm_password"
          returnKeyType="send"
          onSubmitEditing={onSubmitHandler}
        />
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ opened: Math.max(bottom - 16, 0) }}>
        <BottomAreaView>
          <Button
            title={isLoadingLocation ? 'Đang lấy vị trí' : 'Xác nhận'}
            loading={isLoadingLocation}
            onPress={onSubmitHandler}
          />
        </BottomAreaView>
      </KeyboardStickyView>
    </Container>
  )
}

export default CreateCustomer
