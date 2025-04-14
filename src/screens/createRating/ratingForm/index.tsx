import { BottomAreaView, Button, ImagePicker, StarRating, TagsField, TextField } from '@/components'
import { attachmentSchema } from '@/constants'
import { ratingAPI } from '@/services'
import { BaseStyles } from '@/theme'
import { CreateRatingForm, CreateRatingFormSubmit, IdAndName, ImagePickerResult, RatingType } from '@/types'
import { removeEmptyValueFromObject } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import * as Yup from 'yup'

interface RatingFormProps {
  defaultValues?: undefined
  type: RatingType
  onSubmit: (data: CreateRatingFormSubmit) => void
}

export const RatingForm = ({ defaultValues, type, onSubmit }: RatingFormProps) => {
  const { bottom } = useSafeAreaInsets()

  const { control, handleSubmit, setValue, getValues, watch } = useForm<CreateRatingForm>({
    resolver: yupResolver(
      Yup.object().shape({
        image: Yup.array().of(attachmentSchema).required().min(1),
        rating_star: Yup.string().oneOf(['1', '2', '3', '4', '5']).required(),
        rating_tags: Yup.array().of(Yup.number()).notRequired(),
        rating_content: Yup.string().required(),
      }) as Yup.ObjectSchema<CreateRatingForm>
    ),
    mode: 'all',
    defaultValues: {
      rating_star: '5',
    },
  })

  const ratingStar = watch('rating_star')

  const { data: tags = [], mutate } = useSWR<IdAndName[]>(
    ratingStar ? `rating_star?type=${type}&star=${ratingStar}` : null,
    () =>
      ratingAPI
        .getRatingTags({ type, rating_star: ratingStar })
        .then((res) => (res?.data || [])?.map((i) => ({ id: i.tag_id, name: i.tag_content })))
        .catch(() => [])
  )

  const [isUploading, setIsUploading] = useState(false)

  const onSubmiHandler = handleSubmit((data) => {
    onSubmit(
      removeEmptyValueFromObject({
        ...data,
        rating_type: type,
        image: data?.image?.map((item) => item.attachment_id),
      })
    )
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
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ rowGap: 24, paddingBottom: bottom }}
        style={{ padding: 16, flex: 1 }}
      >
        <Controller
          control={control}
          name="rating_star"
          render={({ field: { value, onChange } }) => (
            <View style={{ alignItems: 'center' }}>
              <StarRating
                size={40}
                value={+value}
                style={BaseStyles.cGap12}
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
          name="image"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <ImagePicker
              error={!!error?.message}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onUpload={uploadImages}
              options={{ includeBase64: true }}
            />
          )}
        />

        <TagsField control={control} name="rating_tags" data={tags} />

        <TextField
          required
          multiline
          control={control}
          name="rating_content"
          label="Viết đánh giá"
          errorMsg="Vui lòng nhập trường này"
          style={{ height: undefined, minHeight: 72 }}
        />
      </KeyboardAwareScrollView>

      <KeyboardStickyView offset={{ opened: Math.max(bottom - 16, 0) }}>
        <BottomAreaView>
          <Button title="Gửi" onPress={onSubmiHandler} disabled={isUploading} />
        </BottomAreaView>
      </KeyboardStickyView>
    </View>
  )
}
