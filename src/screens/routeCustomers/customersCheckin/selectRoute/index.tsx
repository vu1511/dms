import { Empty, ListItem, ListItemLoading } from '@/components'
import { RouteRes } from '@/types'
import { FlatList, StyleProp, View, ViewStyle } from 'react-native'

type SelectRouteProps = {
  style?: StyleProp<ViewStyle>
  routeId: number
  data?: RouteRes[]
  isLoading: boolean
  onClose(): void
  onChange: ({ hierarchy_id }: { hierarchy_id: number }) => void
}

export const SelectRoute = ({ data, isLoading, routeId, onChange, onClose, style }: SelectRouteProps) => {
  return (
    <View style={style}>
      <FlatList
        data={data}
        bounces={false}
        renderItem={({ item }) => {
          const isActive = routeId === item.id
          return (
            <ListItem
              key={item.id}
              title={item.name}
              active={isActive}
              onPress={() => {
                if (!isActive) {
                  onChange({ hierarchy_id: item.id })
                }
                onClose()
              }}
            />
          )
        }}
        ListEmptyComponent={isLoading ? <ListItemLoading /> : <Empty title="Không có tuyến nào được tìm thấy" />}
      />
    </View>
  )
}
