import { List, ListItemSeparator, SearchInput } from '@/components'
import { usePreviousRoute } from '@/hooks'
import { Navigation, Routes } from '@/routes'
import { BaseStyles } from '@/theme'
import { GetOrderHistoryListReq, OrderRes } from '@/types'
import { formatMoneyVND } from '@/utils'
import { useNavigation } from '@react-navigation/native'
import { ListRenderItem } from '@shopify/flash-list'
import { useCallback } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { OrderHistoryItem } from '../item'
import OrderHistoryListLoading from '../loading'
import { useOrderHistories } from './hook'
import { styles } from './style'

export type OrderHistoryListProps = {
  initialParams?: Partial<GetOrderHistoryListReq>
  headerStyle?: StyleProp<ViewStyle>
}

const OrderHistoryList = ({ initialParams, headerStyle }: OrderHistoryListProps) => {
  const navigation = useNavigation<Navigation>()

  const { data, isLoading, hasMore, summary, refresh, filter, getMore, mutate } = useOrderHistories(initialParams)

  usePreviousRoute(() => {
    mutate()
  })

  const navigateToOrderDetail = useCallback(
    (orderId: number) => {
      navigation.navigate(Routes.OrderDetail, { orderId })
    },
    [navigation]
  )

  const renderItem: ListRenderItem<OrderRes> = useCallback(
    ({ item }) => {
      return (
        <OrderHistoryItem
          orderName={item.name}
          sellBy={item.sell_by}
          amountTotal={item.amount_total}
          createDate={item.create_date}
          customerName={item.partner_name}
          stateName={item.state_view?.name}
          stateValue={item.state_view?.value}
          onPress={() => navigateToOrderDetail(item.order_id)}
        />
      )
    },
    [navigateToOrderDetail]
  )

  return (
    <View style={BaseStyles.flex1}>
      <View style={[styles.header, headerStyle]}>
        <View style={styles.searchWrapper}>
          <SearchInput
            placeholder="Tìm kiếm theo mã đơn"
            delay={500}
            showBarcodeScan
            onChange={(keyword) => filter({ keyword })}
            style={styles.searchInput}
          />
          {/* <TouchableOpacity activeOpacity={0.5} onPress={onOpen} style={styles.filterBtn}>
            <FilterIcon size={16} fill={Colors.gray80} />
          </TouchableOpacity> */}
        </View>
        {summary ? (
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text numberOfLines={1} style={styles.summaryLabel}>
                Số lượng:{' '}
              </Text>
              <Text numberOfLines={1} style={styles.summaryValue}>
                {summary?.total_sale}
              </Text>
            </View>
            <View style={[styles.summaryItem, styles.summaryItemRight]}>
              <Text numberOfLines={1} style={styles.summaryLabel}>
                Tổng tiền:{' '}
              </Text>
              <Text numberOfLines={1} style={styles.summaryValue}>
                {formatMoneyVND(summary?.total_amount)}
              </Text>
            </View>
          </View>
        ) : null}
        {/* <BottomSheetModal ref={ref}>
          <Header
            title="Bộ lọc"
            left={<IconButton onPress={onClose} icon={CloseIcon} size={20} color={Colors.gray80} />}
          />
        </BottomSheetModal> */}
      </View>
      <List
        data={data}
        provider="FlashList"
        estimatedItemSize={92}
        hasMore={hasMore}
        isLoading={isLoading}
        onRefresh={refresh}
        onEndReached={getMore}
        renderItem={renderItem}
        emptyTitle="Chưa có đơn hàng nào"
        contentContainerStyle={BaseStyles.pt16}
        ItemSeparatorComponent={ListItemSeparator}
        ListLoadingComponent={<OrderHistoryListLoading />}
      />
    </View>
  )
}

export default OrderHistoryList
