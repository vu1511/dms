import { Container, CustomersLoading, ListItemSeparator, QueryInfiniteList } from '@/components'
import { Navigation, RouteProp, Routes } from '@/routes'
import { inventoryAPI } from '@/services'
import { BaseStyles } from '@/theme'
import { InventoryRes } from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ListRenderItem } from '@shopify/flash-list'
import { useCallback } from 'react'
import { InventoryItem } from './item'

const Inventories = () => {
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<Routes.Inventories>>()
  const { initialParams } = params

  const renderItem: ListRenderItem<InventoryRes> = useCallback(({ item }) => {
    return <InventoryItem onPress={() => {}} data={item} />
  }, [])

  return (
    <Container title="Kiểm tồn">
      <QueryInfiniteList
        provider="FlashList"
        swrKey="inventories"
        estimatedItemSize={92}
        contentContainerStyle={BaseStyles.pt16}
        fetcher={inventoryAPI.getListInventory}
        initialParams={{ ...initialParams, full_data: true }}
        renderItem={renderItem}
        ListLoadingComponent={<CustomersLoading />}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Container>
  )
}

export default Inventories
