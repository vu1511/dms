import { Container, CustomersLoading, Empty, ListItemSeparator } from '@/components'
import { SwrKey } from '@/constants'
import { usePreviousRoute } from '@/hooks'
import { Navigation, Routes } from '@/routes'
import { routeAPI } from '@/services'
import { RouteRes } from '@/types'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import useSWR from 'swr'
import { RouteItem } from './item'

const RouteList = () => {
  const navigation = useNavigation<Navigation>()

  const fetcherHandler = useCallback(async () => {
    try {
      const res = await routeAPI.getRoutes()
      return res.result?.data || []
    } catch (error) {
      return []
    }
  }, [])

  const { data, isLoading, mutate } = useSWR(SwrKey.routes, fetcherHandler)

  usePreviousRoute(() => mutate())

  const updateTempRoutes = useCallback(
    (item: RouteRes) => {
      navigation.navigate(Routes.UpdateRoute, {
        data: { ...item, hierarchy_id: item.id, description: '' },
      })
    },
    [navigation]
  )

  const renderItem: ListRenderItem<RouteRes> = useCallback(
    ({ item }) => {
      return <RouteItem key={item.id} onPress={updateTempRoutes} data={item} />
    },
    [updateTempRoutes]
  )

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
