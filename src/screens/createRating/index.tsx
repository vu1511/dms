import { ArrowDownIcon, ArrowRightIcon, CloseIcon } from '@/assets'
import {
  BottomSheetModal,
  Button,
  Container,
  Header,
  IconButton,
  ImagePicker,
  ListItem,
  StarRating,
  TagsField,
  TextAreaField,
  TextInput,
} from '@/components'
import { attachmentSchema, idAndNameSchema, optionSchema } from '@/constants'
import { useAsyncV2, usePreventGoBack, useVisibleRef } from '@/hooks'
import { Navigation, RouteProp, Routes } from '@/routes'
import { ratingAPI } from '@/services'
import { BaseStyles, Colors, Typography } from '@/theme'
import {
  AllRatingTypeOptions,
  CreateRatingForm,
  IdAndName,
  ImagePickerResult,
  isCustomerRatingType,
  RatingType,
} from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import * as Yup from 'yup'

const CreateRating = () => {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation<Navigation>()
  const { ref, onClose, onOpen } = useVisibleRef()
  const [isUploading, setIsUploading] = useState(false)

  const {
    params: { defaultValues, onSuccess },
  } = useRoute<RouteProp<Routes.CreateRating>>()

  const { trigger: createRatingComment } = useAsyncV2(ratingAPI.createRatingComment)
  const { trigger: createRatingByPhoto } = useAsyncV2(ratingAPI.createRatingByPhoto)

  const {
    control,
    formState: { isValid, isDirty, isSubmitSuccessful },
    watch,
    setValue,
    getValues,
    handleSubmit,
  } = useForm<CreateRatingForm>({
    mode: 'all',
    defaultValues: {
      rating_star: '5',
      rating_type: AllRatingTypeOptions[0],
      ...defaultValues,
    },
    resolver: yupResolver(
      Yup.object().shape({
        image: Yup.array().of(attachmentSchema).required().min(1),
        rating_star: Yup.string().oneOf(['1', '2', '3', '4', '5']).required(),
        rating_tags: Yup.array().of(Yup.number()).notRequired(),
        rating_content: Yup.string().required('Vui lòng nhập đánh giá'),
        customer_id: idAndNameSchema.required('Vui lòng nhập khách hàng'),
        rating_type: optionSchema.required(),
      }) as Yup.ObjectSchema<CreateRatingForm>
    ),
  })

  usePreventGoBack({ hasUnsavedChanges: isDirty && !isSubmitSuccessful })

  const ratingStar = watch('rating_star')
  const ratingType = watch('rating_type')?.value

  const {
    data: tags = [],
    isLoading: isTagsLoading,
    mutate,
  } = useSWR<IdAndName[]>(ratingStar && ratingType ? `rating_star?type=${ratingType}&star=${ratingStar}` : null, () =>
    ratingAPI
      .getRatingTags({ type: ratingType, rating_star: ratingStar })
      .then((res) => (res?.data || [])?.map((i) => ({ id: i.tag_id, name: i.tag_content })))
      .catch(() => [])
  )

  const onSubmitHandler = handleSubmit((data) => {
    const ratingType = data.rating_type.value

    const options = {
      successMsg: 'Thêm đánh giá thành công',
      onSuccess: () => onSuccess?.(data),
    }

    if (isCustomerRatingType(ratingType)) {
      createRatingComment(
        {
          customer_id: data.customer_id.id,
          comment_lines: [
            {
              rating_type: ratingType,
              rating_star: data.rating_star,
              rating_tags: data.rating_tags,
              rating_content: data.rating_content,
              attachment_images: data.image.map((i) => i.attachment_id),
            },
          ],
        },
        options
      )
    } else {
      createRatingByPhoto(
        {
          customer_id: data.customer_id.id,
          rating_product_lines: [
            {
              rating_star: data.rating_star,
              rating_tags: data.rating_tags,
              rating_type: ratingType as RatingType,
              rating_content: data.rating_content,
              image: data.image.map((i) => i.attachment_id),
            },
          ],
        },
        options
      )
    }
  })

  const uploadImages = async (images: ImagePickerResult[]) => {
    setIsUploading(true)
    try {
      const response = await ratingAPI.createAttachment({
        attachments: images.map((i) => ({ file: i.base64 as string, type: 'image' })),
      })
      return { isSuccess: response.success, data: response.data }
    } catch (error) {
      return { isSuccess: false, data: [] }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Container
      title="Đánh giá"
      headerShadowVisible={false}
      right={<Button type="text" title="Lưu" disabled={!isValid || isUploading} onPress={onSubmitHandler} />}
    >
      <KeyboardAwareScrollView
        bounces={false}
        bottomOffset={32}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ rowGap: 12, paddingBottom: Math.max(bottom, 16) }}
      >
        <View style={[styles.card, BaseStyles.rGap24]}>
          <Controller
            control={control}
            name="rating_star"
            render={({ field: { value, onChange } }) => (
              <View style={{ alignItems: 'center' }}>
                <StarRating
                  size={40}
                  gap={12}
                  value={+value}
                  onChange={(val: number) => {
                    onChange(val + '')
                    if (value !== getValues('rating_star')) {
                      setValue('rating_tags', [])
                      mutate()
                    }
                  }}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="rating_type"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  readOnly
                  onPress={onOpen}
                  editable={false}
                  pointerEvents="none"
                  label="Loại đánh giá"
                  value={value?.label}
                  right={<ArrowDownIcon size={20} fill={Colors.gray80} />}
                />
                <BottomSheetModal ref={ref} enableDynamicSizing>
                  <Header
                    title="Loại đánh giá"
                    right={<IconButton onPress={onClose} icon={CloseIcon} size={20} color={Colors.gray80} />}
                  />
                  {AllRatingTypeOptions.map((item) => (
                    <ListItem
                      key={item.value}
                      title={item.label}
                      active={value?.value === item.value}
                      onPress={() => {
                        onClose()
                        onChange(item)
                      }}
                    />
                  ))}
                </BottomSheetModal>
              </>
            )}
          />
          <TagsField control={control} name="rating_tags" data={tags} isLoading={isTagsLoading} />
        </View>

        {!defaultValues?.customer_id?.id && (
          <View style={styles.card}>
            <Text numberOfLines={1} style={styles.label}>
              Khách hàng <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="customer_id"
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <TextInput
                    readOnly
                    error={!!error}
                    editable={false}
                    pointerEvents="none"
                    value={value?.name}
                    inputStyle={{ textTransform: 'capitalize' }}
                    placeholder="Chọn khách hàng"
                    label="Chọn khách hàng"
                    right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
                    onPress={() => {
                      navigation.navigate(Routes.SelectCustomer, {
                        id: value?.id,
                        onChange: (customer) => {
                          navigation.pop()
                          onChange(customer)
                        },
                      })
                    }}
                    errorMsg="Vui lòng chọn khách hàng"
                  />
                )
              }}
            />
          </View>
        )}

        <View style={styles.imagesCard}>
          <Text style={[styles.label, BaseStyles.px16]}>
            Hình ảnh <Text style={{ color: Colors.danger }}>*</Text>
          </Text>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <ImagePicker
                contentStyle={styles.images}
                error={!!error?.message}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onUpload={uploadImages}
                options={{ includeBase64: true }}
              />
            )}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Viết đánh giá <Text style={{ color: Colors.danger }}>*</Text>
          </Text>
          <TextAreaField multiline control={control} name="rating_content" placeholder="Viết đánh giá" />
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  card: {
    rowGap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  imagesCard: {
    backgroundColor: Colors.white,
    rowGap: 8,
    paddingVertical: 12,
  },
  images: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  label: {
    ...Typography.body16SemiBold,
  },
  labelHeader: {
    paddingHorizontal: 16,
  },
})

export default CreateRating
