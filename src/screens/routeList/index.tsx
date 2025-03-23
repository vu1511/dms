import { Container, CustomersLoading, Empty, ListItemSeparator } from '@/components'
import { SwrKey } from '@/constants'
import { Navigation, Routes } from '@/routes'
import { routeAPI } from '@/services'
import { RouteRes } from '@/types'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import useSWR, { useSWRConfig } from 'swr'
import { RouteItem } from './item'

const RouteList = () => {
  const { mutate: mutateRemote } = useSWRConfig()
  const navigation = useNavigation<Navigation>()

  const { data, isLoading, mutate } = useSWR(SwrKey.routes, () =>
    routeAPI.getRoutes().then((res) => res.result?.data || [])
  )

  const updateTempRoutes = (item: RouteRes) => {
    navigation.navigate(Routes.UpdateRoute, {
      data: {
        ...item,
        hierarchy_id: item.id,
        description: '',
      },
      onSuccess: () => {
        // mutate(SwrKey.routes)
      },
    })
  }

  const renderItem: ListRenderItem<RouteRes> = useCallback(({ item }) => {
    return <RouteItem key={item.id} onPress={updateTempRoutes} data={item} />
  }, [])

  return (
    <Container title="Tuyến (MCP)">
      <FlatList
        data={data}
        refreshing={false}
        onRefresh={mutate}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          isLoading ? (
            <CustomersLoading />
          ) : (
            <View style={styles.emptyContainer}>
              <Empty style={styles.empty} title="Không có tuyến nào được tìm thấy" />
            </View>
          )
        }
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  empty: {
    flex: undefined,
    paddingTop: 72,
  },
})

export default RouteList
