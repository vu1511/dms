import { ArrowRightIcon, EditSquareIcon } from '@/assets'
import { AvatarPicker, Button, Container, DateField, TextField, TextInput } from '@/components'
import { useAsyncV2 } from '@/hooks'
import { Navigation, RouteProp, Routes } from '@/routes'
import { userAPI } from '@/services'
import { Colors } from '@/theme'
import { CreateAddressForm, LngLat, UpdateUserInfoForm, UpdateUserInfoReq } from '@/types'
import { getAddressLabel, reverseDateFormat, toImageUrl } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { userInfoSchema } from './schema'

const UpdateUserInfo = () => {
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<Routes.UpdateUserInfo>>()
  const { defaultValues, onSuccess } = params

  const { trigger } = useAsyncV2(userAPI.updateUserInfo, {
    onSuccess,
    errorMsg: 'Cập nhật thông tin không thành công',
    successMsg: 'Cập nhật thông tin thành công',
  })

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty },
  } = useForm<UpdateUserInfoForm>({
    resolver: yupResolver(userInfoSchema),
    mode: 'all',
    defaultValues: (() => {
      const address = defaultValues?.shipping_adress?.[0]

      return {
        address: address?.state_id
          ? {
              state_id: address?.state_name_id,
              ward_id: address.ward_name_id,
              district_id: address.district_name_id,
              street: address.street,
              district_name: address.district_id,
              ward_name: address.ward_id,
              state_name: address.state_id,
            }
          : undefined,
        birth_day: defaultValues?.birth_day ? reverseDateFormat(defaultValues.birth_day) : '',
        name: defaultValues?.name || undefined,
        phone: defaultValues?.phone || undefined,
        sex: defaultValues?.sex || undefined,
        coordinate:
          defaultValues?.latitude && defaultValues?.longitude
            ? { latitude: defaultValues.latitude, longitude: defaultValues.longitude }
            : undefined,
        image: defaultValues?.image_url ? { uri: toImageUrl(defaultValues.image_url) } : undefined,
      }
    })(),
  })

  const onSubmitHandler = handleSubmit((data) => {
    const params: UpdateUserInfoReq = {
      name: data.name,
      address: data?.address,
      partner_id: defaultValues.partner_id,
    }
    if (data?.coordinate?.latitude && data?.coordinate?.longitude) {
      params.longitude = Number(data.coordinate.longitude)
      params.latitude = Number(data.coordinate.latitude)
    }
    if (data.image?.base64 && data.image.base64 !== defaultValues?.image_url) {
      params.image = data.image?.base64
    }
    if (data.birth_day) {
      params.birth_day = dayjs(data.birth_day).format('DD-MM-YYYY')
    }

    trigger(params)
  })

  const goBack = () => {
    navigation.navigate(Routes.UpdateUserInfo, params)
  }

  return (
    <Container
      title="Cập nhật thông tin"
      headerShadowVisible={false}
      backgroundColor={Colors.white}
      right={<Button disabled={!isValid || !isDirty} type="text" title="Lưu" onPress={onSubmitHandler} />}
    >
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 24, flexGrow: 1, padding: 16 }}
      >
        <Controller
          control={control}
          name="image"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <AvatarPicker onBlur={onBlur} onChange={onChange} uri={value?.uri} error={!!error} />
          )}
        />
        <TextField disabled required control={control} name="phone" placeholder="Số điện thoại" label="Số điện thoại" />
        <TextField control={control} name="name" placeholder="Tên người dùng" label="Tên người dùng" required />
        <DateField
          control={control}
          required={false}
          maximumDate={new Date()}
          onClearValue={undefined}
          label="Ngày sinh"
          name="birth_day"
          placeholder="Ngày sinh"
        />
        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            const navigateToUpdateAddress = () => {
              const address = getValues('address')
              navigation.navigate(Routes.CreateAddress, {
                defaultValues: address?.state_id
                  ? {
                      district_id: address?.district_id,
                      ward_id: address?.ward_id,
                      state_id: address?.state_id,
                      street: address?.street,
                      district_name: address?.district_name,
                      state_name: address?.state_name,
                      ward_name: address?.ward_name,
                    }
                  : undefined,
                onSubmit: (data: CreateAddressForm) => {
                  onChange(data)
                  goBack()
                },
              })
            }

            return (
              <TextInput
                required
                readOnly
                label="Địa chỉ"
                error={!!error}
                editable={false}
                pointerEvents="none"
                errorMsg="Vui lòng nhập địa chỉ"
                onPress={navigateToUpdateAddress}
                right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
                value={getAddressLabel(value?.street, value?.ward_name, value?.district_name, value?.state_name)}
              />
            )
          }}
        />
        <Controller
          control={control}
          name="coordinate"
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                readOnly
                label="Toạ độ"
                editable={false}
                pointerEvents="none"
                onPress={() => {
                  navigation.navigate(Routes.MapViewSelectCoordinate, {
                    defaultValues:
                      value?.latitude && value?.longitude
                        ? { latitude: Number(value.latitude), longitude: Number(value.longitude) }
                        : undefined,
                    onChange: (value) => {
                      onChange({ longitude: `${value.longitude}`, latitude: `${value.latitude}` } as LngLat<string>)
                      goBack()
                    },
                  })
                }}
                value={
                  value?.latitude && value?.longitude
                    ? ` Lng: ${value.longitude?.slice(0, 6)}, Lat: ${value.latitude.slice(0, 6)}`
                    : undefined
                }
                right={<EditSquareIcon size={18} fill={Colors.gray80} />}
              />
            )
          }}
        />
      </KeyboardAwareScrollView>
    </Container>
  )
}

export default UpdateUserInfo
