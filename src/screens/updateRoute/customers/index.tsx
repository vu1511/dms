import {
  ActivityIndicator,
  BottomAreaView,
  Button,
  CustomersLoading,
  Empty,
  ListItemSeparator,
  SearchInput,
  useQueryInfiniteList,
} from '@/components'
import { useSelectItems } from '@/hooks'
import { routeAPI } from '@/services'
import { useUserSlice } from '@/store'
import { BaseStyles } from '@/theme'
import { CustomerHierarchyRes, GetCustomersHierarchyReq, PartnerRes } from '@/types'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useState } from 'react'
import { View } from 'react-native'
import { CustomerItem } from '../customerItem'
import { styles } from './style'

interface CustomersProps {
  onChange: (data: PartnerRes[]) => Promise<void>
}

const LIMIT = 10

export const Customers = ({ onChange }: CustomersProps) => {
  const user = useUserSlice((state) => state.userInfo)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading, hasMore, getMore, filter } = useQueryInfiniteList({
    key: 'customers_hierarchy',
    initialParams: { limit: LIMIT } as GetCustomersHierarchyReq,
    fetcher: routeAPI.getCustomersHierarchy,
    mutateFetcherResponse: (data) => {
      const result = data.result?.data || []
      return { data: result, hasMore: result.length >= LIMIT }
    },
    mutateFetcherParams: (params, { page }) => ({ ...params, offset: page * LIMIT }),
  })

  const { selectedItems, toggleSelectItem } = useSelectItems<CustomerHierarchyRes>({ idKey: 'id' })

  const handleSelect = () => {
    if (!selectedItems?.length) return

    setIsSubmitting(true)
    onChange(
      selectedItems.map((item) => ({
        ...item,
        img_url: item.image,
        email: '',
        category: '',
        credit: 0,
        credit_limit: 0,
        history_checkin: [],
      }))
    ).finally(() => {
      setIsSubmitting(false)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalSelectHeader}>
        <SearchInput
          placeholder={user?.account_type === 'nvkd' ? 'Tìm kiếm khách hàng...' : 'Tìm kiếm nhân viên...'}
          onChange={(keyword) => filter({ keyword })}
        />
      </View>

      <BottomSheetFlatList
        data={data}
        refreshing={false}
        style={BaseStyles.flex1}
        onEndReachedThreshold={0.4}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onEndReached={getMore}
        renderItem={({ item }) => (
          <CustomerItem
            key={item.id}
            name={item.name}
            phone={item.phone}
            avatar={item?.image}
            onSelect={() => toggleSelectItem(item)}
            active={selectedItems?.some?.((i) => i.id === item.id) ?? false}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        ListEmptyComponent={
          isLoading ? (
            <CustomersLoading />
          ) : (
            <View style={styles.emptyContainer}>
              <Empty style={styles.empty} title="Không tìm thấy khách hàng nào" />
            </View>
          )
        }
        ListFooterComponent={hasMore ? <ActivityIndicator /> : null}
      />

      <BottomAreaView>
        <Button
          onPress={handleSelect}
          loading={isSubmitting}
          disabled={!selectedItems.length}
          title={`Xác nhận${selectedItems.length > 0 ? ` (${selectedItems.length})` : ''}`}
        />
      </BottomAreaView>
    </View>
  )
}
