import {
  ActivityIndicator,
  BottomAreaView,
  Button,
  CustomersLoading,
  Empty,
  ListItemSeparator,
  SearchInput,
} from '@/components'
import { routeAPI } from '@/services'
import { useUserSlice } from '@/store'
import { Colors } from '@/theme'
import { CustomerHierarchyRes, PartnerRes } from '@/types'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { produce } from 'immer'
import { useState } from 'react'
import { View } from 'react-native'
import useSWR from 'swr'
import { CustomerItem } from '../customerItem'
import { styles } from './style'

interface CustomersProps {
  onChange: (data: PartnerRes[]) => Promise<void>
}

export const Customers = ({ onChange }: CustomersProps) => {
  const user = useUserSlice((state) => state.userInfo)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const { data, isValidating, getMore, filter, hasMore, refresh } = useQueryInfiniteList<
  //   CustomerHierarchyRes,
  //   GetCustomersHierarchyReq
  // >({
  //   key: 'customers_hierarchy',
  //   fetcher: routeAPI.getCustomersHierarchy ,
  //   mutateFetcherResponse: data => ({data: data.}),
  //   initialParams: { limit: 12 },
  // })

  const { data, isLoading } = useSWR('customers_hierarchy', async () => {
    const response = await routeAPI.getCustomersHierarchy({ limit: 20 })
    return response.result?.data
  })

  const getMore = () => {}
  const filter = () => {}
  const hasMore = false
  const refresh = () => {}

  const [selectedItems, setSelectedItems] = useState<CustomerHierarchyRes[]>([])

  const toggleCheckItem = (customer: CustomerHierarchyRes) => {
    if (!data) return

    setSelectedItems((data) =>
      produce(data, (draft) => {
        const index = draft.findIndex((item) => item.id === customer.id)
        if (index !== -1) {
          draft.splice(index, 1)
        } else {
          draft.push(customer)
        }
      })
    )
  }

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
          onChange={(keyword) => filter({ params: { keyword } })}
        />
      </View>

      <BottomSheetFlatList
        data={data}
        refreshing={false}
        // onRefresh={refresh}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}
        onEndReached={() => getMore()}
        onEndReachedThreshold={0.4}
        renderItem={({ item }) => (
          <View>
            {item.account_type === 'th' ? (
              <CustomerItem
                name={item.name}
                phone={item.phone}
                avatar={item?.image}
                onSelect={() => toggleCheckItem(item)}
                active={selectedItems?.some?.((i) => i.id === item.id) ?? false}
              />
            ) : null}
          </View>
        )}
        ListEmptyComponent={
          isLoading ? (
            <CustomersLoading />
          ) : (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
              <Empty style={{ flex: undefined, paddingTop: 32 }} title="Không tìm thấy khách hàng nào" />
            </View>
          )
        }
        ItemSeparatorComponent={ListItemSeparator}
        ListFooterComponent={<>{hasMore ? <ActivityIndicator /> : null}</>}
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
