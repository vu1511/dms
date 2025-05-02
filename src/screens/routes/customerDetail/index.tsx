import { ThreeDotsHorizontalIcon } from '@/assets'
import { BottomAreaView, Container, Empty, IconButton, ListItem, Popover } from '@/components'
import { SwrKey } from '@/constants'
import { Navigation, RouteProp, Routes } from '@/routes'
import { userAPI } from '@/services'
import { Colors } from '@/theme'
import { Option } from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView, StyleSheet } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import useSWR from 'swr'
import { Info } from './info'
import { UserInfoLoading } from './loading'
import { Report } from './report'

enum EMenuItem {
  Photo = 'photo',
  Inventory = 'inventory',
  Debts = 'debts',
  Rating = 'rating',
  History = 'history',
  Loyalty = 'loyalty',
}

const menuActions: Option<EMenuItem>[] = [
  { value: EMenuItem.Inventory, label: 'Kiểm tồn' },
  { value: EMenuItem.Debts, label: 'Công nợ' },
  { value: EMenuItem.Rating, label: 'Đánh giá' },
  { value: EMenuItem.Photo, label: 'Lịch sử check-in' },
  { value: EMenuItem.History, label: 'Lịch sử đơn hàng' },
  { value: EMenuItem.Loyalty, label: 'Lịch sử tích điểm' },
]

const CustomerDetail = () => {
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<Routes.CustomerDetail>>()
  const { customerId } = params

  const {
    data: customer,
    isLoading,
    mutate,
  } = useSWR(SwrKey.customerDetail(customerId), () =>
    userAPI
      .getCustomerInfo(customerId)
      .then((res) => res?.result?.data?.info_customer)
      .catch(() => undefined)
  )

  const handlePressMenu = (action: EMenuItem) => {
    if (!customer) return
    const { account_type: customerType, partner_id: customerId } = customer

    switch (action) {
      case EMenuItem.Debts:
        navigation.navigate(Routes.Debts, { initialParams: { partner_ids: [customerId] } })
        break
      case EMenuItem.History:
        navigation.navigate(Routes.OrderHistories, { initialParams: { partner_id: customerId } })
        break
      case EMenuItem.Inventory:
        navigation.navigate(Routes.Inventories, { initialParams: { customer_id: customerId } })
        break
      case EMenuItem.Loyalty:
        navigation.navigate(Routes.LoyaltyHistories, { initialParams: { partner_id: customerId } })
        break
      case EMenuItem.Photo:
        navigation.navigate(Routes.CheckinHistories, { customerId, customerType })
        break
      case EMenuItem.Rating:
        navigation.navigate(Routes.RatingHistories, { customerId })
        break
      default:
        break
    }
  }

  const updateUserInfo = () => {
    if (!customer) {
      return
    }

    navigation.navigate(Routes.UpdateUserInfo, {
      defaultValues: customer,
      onSuccess: () => {
        mutate()
        navigation.navigate(Routes.CustomerDetail, params)
      },
    })
  }

  return (
    <Container
      title="Thông tin"
      right={
        <Popover
          offset={8}
          popoverStyle={{ width: 216 }}
          trigger={
            <IconButton size={20} disabled={!customer?.id} color={Colors.gray80} icon={ThreeDotsHorizontalIcon} />
          }
        >
          {({ closePopover }) =>
            menuActions.map((i) => (
              <ListItem
                key={i.value}
                title={i.label}
                onPress={() => {
                  closePopover()
                  handlePressMenu(i.value)
                }}
              />
            ))
          }
        </Popover>
      }
    >
      {!isLoading && !customer?.id ? (
        <Empty />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          refreshControl={<RefreshControl refreshing={false} onRefresh={mutate} />}
        >
          {isLoading ? <UserInfoLoading /> : !customer?.id ? null : <Info data={customer} onUpdate={updateUserInfo} />}
          <Report accountType={customer?.account_type} customerId={customerId} />
          <BottomAreaView shadowVisible={false} bgColor={Colors.transparent} />
        </ScrollView>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    gap: 12,
    paddingVertical: 12,
  },
})

export default CustomerDetail
