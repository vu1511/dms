import { ArrowDownIcon } from '@/assets'
import { Container, ListItem, Popover } from '@/components'
import { useAsync } from '@/hooks'
import { RouteProp, Routes } from '@/routes'
import { ratingAPI } from '@/services'
import { Colors } from '@/theme'
import { CreateRatingFormSubmit, CustomerCommentTypeLabel, ECustomerRatingType, Option } from '@/types'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { RatingForm } from './ratingForm'
import { styles } from './styles'

const CreateRating = () => {
  const { asyncHandler } = useAsync()
  const {
    params: { customerId, onSuccess },
  } = useRoute<RouteProp<Routes.CreateRating>>()

  const [ratingType, setRatingType] = useState<Option<ECustomerRatingType>>(ratingTypes[0])

  const createRatingComment = (data: CreateRatingFormSubmit) => {
    asyncHandler({
      fetcher: ratingAPI.createRatingComment({
        customer_id: customerId,
        comment_lines: [
          {
            ...data,
            rating_type: ratingType.value,
            attachment_images: data.image,
          },
        ],
      }),
      onSuccess: () => {
        onSuccess?.()
      },
      config: { successMsg: 'Thêm đánh giá thành công' },
    })
  }

  return (
    <Container backgroundColor={Colors.white} title="Đánh giá" headerShadowVisible={false}>
      <View style={styles.rateCategoryType}>
        <Text style={styles.rateCategoryTitle}>Mục đánh giá: </Text>
        <Popover
          offset={4}
          popoverStyle={{ width: 220 }}
          trigger={
            <TouchableOpacity activeOpacity={0.5} style={styles.btnCategory}>
              <Text style={styles.categoryTxt}>{ratingType.label}</Text>
              <ArrowDownIcon fill={Colors.gray80} size={16} />
            </TouchableOpacity>
          }
        >
          {({ closePopover }) =>
            ratingTypes.map((item) => (
              <ListItem
                key={item.value}
                title={item.label}
                onPress={() => {
                  closePopover()
                  setRatingType(item)
                }}
              />
            ))
          }
        </Popover>
      </View>
      <RatingForm type={ratingType.value as any} onSubmit={createRatingComment} />
    </Container>
  )
}

const ratingTypes: Option<ECustomerRatingType>[] = [
  {
    label: CustomerCommentTypeLabel[ECustomerRatingType.QuantityProduct],
    value: ECustomerRatingType.QuantityProduct,
  },
  {
    label: CustomerCommentTypeLabel[ECustomerRatingType.QualityProduct],
    value: ECustomerRatingType.QualityProduct,
  },
  {
    label: CustomerCommentTypeLabel[ECustomerRatingType.EmployeeAttitude],
    value: ECustomerRatingType.EmployeeAttitude,
  },
  {
    label: CustomerCommentTypeLabel[ECustomerRatingType.Delivery],
    value: ECustomerRatingType.Delivery,
  },
]

export default CreateRating
