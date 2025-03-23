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
import { getAddressFormLabel, removeEmptyValueFromObject } from '@/utils'
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
  const { getCurrentLocation, coordinate, isloading: isLoadingLocation } = useCurrentLocation()

  const {
    control,
    reset,
    handleSubmit,
    setFocus,
    getValues,
    formState: { isDirty, isSubmitSuccessful },
  } = useForm<CreateAccountForm>({
    resolver: yupResolver(createCustomerSchema),
    mode: 'onChange',
    defaultValues: {
      route_sale_id: defaultRoute,
    },
  })
  console.log(defaultRoute)
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
            navigation.goBack()
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
          image: params.image?.base64,
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
          render={({ field: { value, onChange, onBlur } }) => (
            <AvatarPicker onBlur={onBlur} onChange={onChange} uri={value?.uri} />
          )}
        />
        <TextField
          required
          keyboardType="number-pad"
          onSubmitEditing={() => setFocus('name')}
          label="Số điện thoại"
          control={control}
          name="phone"
        />
        <TextField
          required
          onSubmitEditing={() => setFocus('customer_name')}
          label="Tên cửa hàng"
          control={control}
          name="name"
        />
        <TextField
          required
          onSubmitEditing={() => setFocus('password')}
          label="Tên khách hàng"
          control={control}
          name="customer_name"
        />
        <DateField mode="date" maximumDate={new Date()} label="Chọn ngày sinh" control={control} name="birth_day" />
        <Controller
          control={control}
          name="address"
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
                pointerEvents="none"
                error={!!error}
                errorMsg="Vui lòng nhập địa chỉ"
                value={getAddressFormLabel(value)}
                label="Địa chỉ"
                onPress={navigateToAddress}
                right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
              />
            )
          }}
        />
        {showRoute ? <RouteField control={control} /> : null}
        <PasswordField
          control={control}
          name="password"
          label="Mật khẩu"
          onSubmitEditing={() => setFocus('confirm_password')}
        />
        <PasswordField
          onSubmitEditing={onSubmitHandler}
          label="Xác nhận mật khẩu"
          control={control}
          name="confirm_password"
        />
        <CustomerGroupField control={control} />
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
