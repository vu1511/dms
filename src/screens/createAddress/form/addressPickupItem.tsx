import { Empty, ListItem, ListItemLoading, SearchInput } from '@/components'
import { userAPI } from '@/services'
import { BaseStyles, Typography } from '@/theme'
import { IdAndName } from '@/types'
import { normalizeViString } from '@/utils'
import { useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'

export type AddressPickupType = 'state' | 'district' | 'ward'

export type AddressPickupItemProps = {
  type: AddressPickupType
  id?: number
  stateId?: number
  districtId?: number
  onChange: (val: IdAndName) => void
}

export const AddressPickupItem = ({ type, districtId, stateId, id, onChange }: AddressPickupItemProps) => {
  const { bottom } = useSafeAreaInsets()
  const listRef = useRef<FlatList<IdAndName>>(null)

  let key: string | null = null
  if (type === 'state') {
    key = 'state'
  } else if (type === 'district' && stateId) {
    key = `district_${stateId}`
  } else if (type === 'ward' && districtId) {
    key = `ward_${districtId}`
  }
  const label = type === 'state' ? 'Tỉnh/Thành Phố' : type === 'district' ? 'Quận/Huyện' : 'Phường/Xã'

  const [keyword, setKeyword] = useState('')

  const { data, isLoading } = useSWR<IdAndName[]>(
    key,
    () =>
      userAPI
        .getAddress(districtId ? { district_id: districtId } : stateId ? { state_id: stateId } : undefined)
        .then((res) => {
          const data = res.result?.data || []
          return data
        })
        .catch(() => []),
    {
      dedupingInterval: 60 * 1000 * 10,
    }
  )

  const dataRender = useMemo(() => {
    return data?.filter((i) => normalizeViString(i.name)?.includes(normalizeViString(keyword)))
  }, [data, keyword])

  return (
    <View style={BaseStyles.flex1}>
      <View style={{ rowGap: 8 }}>
        <Text style={Typography.body14SemiBold}>Chọn {label}</Text>
        <SearchInput delay={0} placeholder={`Tìm kiếm ${label}`} onChange={setKeyword} value={keyword} />
      </View>
      <FlatList
        ref={listRef}
        data={dataRender}
        nestedScrollEnabled
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!!dataRender?.length}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom }}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            active={id === item.id}
            onPress={() => {
              onChange(item)
              setKeyword('')
              listRef.current?.scrollToOffset({ offset: 0, animated: false })
            }}
          />
        )}
        ListEmptyComponent={isLoading ? <ListItemLoading /> : <Empty title={`Không tìm thấy ${label} nào`} />}
      />
    </View>
  )
}
