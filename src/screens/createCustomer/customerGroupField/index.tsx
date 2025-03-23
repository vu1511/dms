import { ArrowDownIcon, CloseIcon } from '@/assets'
import {
  BottomSheetModal,
  Empty,
  Header,
  IconButton,
  ListItem,
  ListItemLoading,
  ListItemSeparator,
  TextInput,
} from '@/components'
import { useVisibleRef } from '@/hooks'
import { userAPI } from '@/services'
import { Colors } from '@/theme'
import { CreateAccountForm } from '@/types'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Control, useController } from 'react-hook-form'
import useSWR from 'swr'

export type CustomerGroupFieldProps = {
  control: Control<CreateAccountForm>
}

export const CustomerGroupField = ({ control }: CustomerGroupFieldProps) => {
  const { onClose, onOpen, ref: bottomSheetRef } = useVisibleRef()

  const { data = [], isLoading } = useSWR('CustomerGroupField', () =>
    userAPI.getCustomerGroups().then((res) => {
      const data = res?.result?.data ?? []
      return data.map((item) => ({ id: item.id, name: item.name }))
    })
  )

  const {
    field: { onChange, value, ref },
  } = useController({ name: 'hcategory_id', control })

  return (
    <>
      <TextInput
        ref={ref}
        readOnly
        onPress={onOpen}
        editable={false}
        value={value?.name}
        pointerEvents="none"
        label="Nhóm khách hàng"
        onClearValue={() => onChange(null)}
        right={<ArrowDownIcon size={20} fill={Colors.gray80} />}
      />
      <BottomSheetModal ref={bottomSheetRef} snapPoints={['60%']}>
        <Header
          title="Chọn nhóm khách hàng"
          right={<IconButton onPress={onClose} icon={CloseIcon} size={20} color={Colors.gray80} />}
        />
        <BottomSheetFlatList
          data={data}
          refreshing={false}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              title={item.name}
              active={value?.id === item.id}
              onPress={() => {
                onClose()
                onChange(item)
              }}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          ListEmptyComponent={
            isLoading ? (
              <ListItemLoading />
            ) : (
              <Empty style={{ flex: undefined, paddingTop: 72 }} title="Không tìm thấy nhóm khách hàng nào" />
            )
          }
        />
      </BottomSheetModal>
    </>
  )
}
