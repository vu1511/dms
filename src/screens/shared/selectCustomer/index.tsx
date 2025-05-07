import {
  Container,
  CustomerItem,
  CustomersLoading,
  ListItemSeparator,
  QueryInfiniteList,
  RenderQueryInfiniteComponent,
  SearchInput,
} from '@/components'
import { SwrKey } from '@/constants'
import { RouteProp, Routes } from '@/routes'
import { userAPI } from '@/services'
import { BaseStyles, Colors } from '@/theme'
import { CustomerRes, GetCustomerReq } from '@/types'
import { useRoute } from '@react-navigation/native'
import { ListRenderItem } from '@shopify/flash-list'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

const LIMIT = 20

const SelectCustomer = () => {
  const { params } = useRoute<RouteProp<Routes.SelectCustomer>>()
  const { id, onChange, initialParams = { account_type: 'th', limit: LIMIT } } = params

  const renderStickyHeader: RenderQueryInfiniteComponent<CustomerRes, GetCustomerReq> = useCallback(
    ({ filter, params }) => {
      return (
        <View style={styles.header}>
          <SearchInput
            delay={500}
            showBarcodeScan
            value={params.keyword}
            placeholder="Tìm kiếm khách hàng"
            onChange={(keyword) => filter({ keyword })}
          />
        </View>
      )
    },
    []
  )

  const renderItem: ListRenderItem<CustomerRes> = useCallback(
    ({ item }) => {
      return (
        <CustomerItem
          key={item.id}
          name={item.name}
          phone={item.phone}
          avatar={item?.img_url || ''}
          isActive={!!id && id === item.id}
          onPress={() => onChange?.(item)}
        />
      )
    },
    [id, onChange]
  )

  return (
    <Container title="Chọn khách hàng" headerShadowVisible={false}>
      <QueryInfiniteList
        provider="FlashList"
        estimatedItemSize={64}
        initialParams={initialParams}
        fetcher={userAPI.getCustomers}
        swrKey={SwrKey.select_customers}
        contentContainerStyle={styles.contentContainer}
        ListLoadingComponent={<CustomersLoading />}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        renderStickyHeader={renderStickyHeader}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
  },
  header: {
    ...BaseStyles.shadowSm,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    zIndex: 1,
  },
})

export default SelectCustomer
