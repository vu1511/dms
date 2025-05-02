import { ArrowRightIcon } from '@/assets'
import { Button, Container, StarRatingField, TagsField, TextAreaField, TextInput } from '@/components'
import { idAndNameRequiredSchema, ratingStarSchema } from '@/constants'
import { useAsync, usePreventGoBack } from '@/hooks'
import { Navigation, RouteProp, Routes } from '@/routes'
import { inventoryAPI, ratingAPI } from '@/services'
import { BaseStyles, Colors, Typography } from '@/theme'
import { CreateInventoryForm, IdAndName, ProductVariant } from '@/types'
import { removeEmptyValueFromObject } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import * as Yup from 'yup'
import { InventoryProductsField } from './productsField'
import { styles } from './style'

const CreateInventory = () => {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<Routes.CreateInventory>>()
  const { defaultValues, customer, onSuccess, onDelete } = params || {}

  const { asyncHandler } = useAsync()
  const [deleteSuccessful, setDeleteSuccessful] = useState<boolean>(false)

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitSuccessful },
  } = useForm<CreateInventoryForm>({
    mode: 'all',
    defaultValues: {
      rating_star: '5',
      customer_id: customer,
    },
    resolver: yupResolver(
      Yup.object().shape({
        customer_id: idAndNameRequiredSchema.required('Vui lòng chọn khách hàng'),
        rating_star: ratingStarSchema.notRequired(),
        rating_tags: Yup.array().of(Yup.number()).notRequired(),
        rating_content: Yup.string().notRequired(),
        inventory_store_lines: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.number(),
              name: Yup.string(),
              code: Yup.string(),
              type: Yup.string(),
              price: Yup.number(),
              unitId: Yup.number().nullable(),
              unitName: Yup.string().nullable(),
            }) as Yup.ObjectSchema<ProductVariant>
          )
          .required()
          .min(1),
      }) as Yup.ObjectSchema<CreateInventoryForm>
    ),
  })

  usePreventGoBack({
    hasUnsavedChanges: isDirty && !isSubmitSuccessful && !deleteSuccessful,
  })

  const ratingStar = watch('rating_star')

  const { data: tags = [], isLoading: isTagsLoading } = useSWR<IdAndName[]>(
    ratingStar ? `inventory_rating_tags?value=${ratingStar}` : null,
    () =>
      ratingAPI
        .getRatingTags({ type: 'inventory', rating_star: ratingStar })
        .then((res) => (res?.data || [])?.map((i) => ({ id: i.tag_id, name: i.tag_content })))
        .catch(() => [])
  )

  const onSubmitHandler = handleSubmit((data) => {
    const inventory_store_lines: any = data.inventory_store_lines.map((item) =>
      removeEmptyValueFromObject({
        inventory_store_line_id: item?.inventory_store_line_id,
        exp_date: dayjs(item.exp_date).format('YYYY-MM-DD'),
        product_id: item.id,
        product_quantity: item.quantity,
        uom_id: item.unitId,
        note: item?.note,
      })
    )

    asyncHandler({
      fetcher: defaultValues?.inventory_store_id
        ? inventoryAPI.updateInventory({
            inventory_store_id: defaultValues.inventory_store_id,
            inventory_store_lines,
          })
        : inventoryAPI.createInventory({
            ...data,
            customer_id: data.customer_id.id,
            inventory_store_lines,
          }),
      onSuccess: onSuccess,
      config: {
        successMsg: defaultValues?.inventory_store_id
          ? 'Cập nhật phiếu kiểm tồn thành công'
          : 'Tạo phiếu kiểm tồn thành công',
      },
    })
  })

  const deleteInventory = () => {
    if (defaultValues?.inventory_store_id) {
      asyncHandler({
        fetcher: inventoryAPI.deleteInventory({
          inventory_store_id: defaultValues.inventory_store_id,
        }),
        onSuccess: () => {
          setDeleteSuccessful(true)
          onDelete?.()
        },
        config: { successMsg: 'Xoá phiếu kiểm tồn thành công' },
      })
    }
  }

  return (
    <Container
      right={<Button disabled={!isValid} type="text" title="Lưu" onPress={onSubmitHandler} />}
      title={defaultValues?.inventory_store_id ? 'Chỉnh sửa phiếu kiểm tồn' : 'Tạo phiếu kiểm tồn'}
    >
      <KeyboardAwareScrollView
        bottomOffset={24}
        style={BaseStyles.flex1}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: bottom }]}
      >
        {!customer?.id && !defaultValues?.customer?.id && (
          <View style={styles.section}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              Khách hàng
            </Text>
            <Controller
              control={control}
              name="customer_id"
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                const selectCustomer = () => {
                  navigation.navigate(Routes.SelectCustomer, {
                    id: value?.id,
                    onChange: (customer) => {
                      navigation.pop()
                      onChange(customer)
                    },
                  })
                }

                return (
                  <TextInput
                    readOnly
                    required
                    error={!!error}
                    editable={false}
                    pointerEvents="none"
                    value={value?.name}
                    inputStyle={{ textTransform: 'capitalize' }}
                    placeholder="Chọn khách hàng"
                    label="Chọn khách hàng"
                    right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
                    onPress={selectCustomer}
                    errorMsg="Vui lòng chọn khách hàng"
                  />
                )
              }}
            />
          </View>
        )}

        <InventoryProductsField
          control={control}
          inventory_store_id={defaultValues?.inventory_store_id}
          onDeleteInventory={deleteInventory}
        />

        <View
          style={[styles.section, BaseStyles.rGap16]}
          pointerEvents={defaultValues?.inventory_store_id ? 'none' : 'auto'}
        >
          <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap12]}>
            <Text numberOfLines={1} style={[Typography.body14SemiBold]}>
              Chất lượng
            </Text>
            <StarRatingField
              control={control}
              name="rating_star"
              onChange={() => {
                setValue('rating_tags', [])
              }}
            />
          </View>
          <TagsField name="rating_tags" isLoading={isTagsLoading} data={tags} control={control} />
        </View>

        <View style={styles.section} pointerEvents={defaultValues?.inventory_store_id ? 'none' : 'auto'}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Đánh giá
          </Text>
          <TextAreaField multiline placeholder="Nhập đánh giá" control={control} name="rating_content" />
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
}

export default CreateInventory
