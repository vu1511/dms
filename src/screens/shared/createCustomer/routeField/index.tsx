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
import { routeAPI } from '@/services'
import { Colors } from '@/theme'
import { CreateAccountForm, RouteRes } from '@/types'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Control, useController } from 'react-hook-form'
import useSWR from 'swr'

type RouteFieldProps = {
  control: Control<CreateAccountForm>
}

export const RouteField = ({ control }: RouteFieldProps) => {
  const { onClose, onOpen, ref: bottomSheetRef } = useVisibleRef()

  const { data = [], isLoading } = useSWR<RouteRes[] | undefined>(
    'routeField',
    () =>
      routeAPI
        .getRoutes()
        .then((res) => res.result?.data || [])
        .catch(() => undefined),
    {
      dedupingInterval: 1000 * 60 * 2,
    }
  )

  const {
    field: { onChange, value, ref },
  } = useController({ name: 'route_sale_id', control })

  return (
    <>
      <TextInput
        ref={ref}
        readOnly
        onPress={onOpen}
        editable={false}
        label="Chọn tuyến"
        value={value?.name}
        pointerEvents="none"
        onClearValue={() => onChange(null)}
        right={<ArrowDownIcon size={20} fill={Colors.gray80} />}
      />
      <BottomSheetModal ref={bottomSheetRef} snapPoints={['60%']}>
        <Header
          title="Chọn tuyến"
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
                onChange(item)
                onClose()
              }}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          ListEmptyComponent={
            isLoading ? (
              <ListItemLoading />
            ) : (
              <Empty style={{ flex: undefined, paddingTop: 72 }} title="Không tìm thấy tuyến nào" />
            )
          }
        />
      </BottomSheetModal>
    </>
  )
}
