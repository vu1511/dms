import { Container, CustomersLoading, ListItemSeparator, QueryInfiniteList } from '@/components'
import { Navigation, RouteProp, Routes } from '@/routes'
import { userAPI } from '@/services'
import { BaseStyles } from '@/theme'
import { Loyalty } from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ListRenderItem } from '@shopify/flash-list'
import { useCallback } from 'react'
import { LoyaltyItem } from './item'

const LoyaltyHistories = () => {
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<Routes.LoyaltyHistories>>()

  const handlePress = useCallback(
    (data: Loyalty) => {
      if (data?.order_id) {
        navigation.navigate(Routes.OrderDetail, { orderId: data.order_id })
      }
    },
    [navigation]
  )

  const renderItem: ListRenderItem<Loyalty> = useCallback(
    ({ item }) => <LoyaltyItem onPress={handlePress} data={item} />,
    [handlePress]
  )

  return (
    <Container title="Lịch sử tích điểm" headerShadowVisible={false}>
      <QueryInfiniteList
        showBottomAreaView
        provider="FlashList"
        estimatedItemSize={76}
        swrKey="loyaltyHistories"
        renderItem={renderItem}
        fetcher={userAPI.getloyaltyHistory}
        ItemSeparatorComponent={ListItemSeparator}
        initialParams={params.initialParams}
        ListLoadingComponent={<CustomersLoading />}
        emptyTitle="Chưa có đơn hàng nào"
        contentContainerStyle={BaseStyles.pt16}
      />
    </Container>
  )
}

export default LoyaltyHistories
