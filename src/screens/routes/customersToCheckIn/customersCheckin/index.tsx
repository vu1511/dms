import { ArrowDownIcon } from '@/assets'
import { ActivityIndicator, CustomersLoading, Empty, ListItemSeparator, Popover, SearchInput } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { LngLat, RouteTypeCheckIn, SearchCustomerRouteRes } from '@/types'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from '../style'
import { CustomerItem } from './customerItem'
import { Header } from './header'
import { useCustomersCheckin } from './hook'
import { MapView } from './mapView'
import { SelectRoute } from './selectRoute'
import { Tabs } from './tabs'

const CustomersCheckin = () => {
  const { bottom } = useSafeAreaInsets()

  const {
    listRef,
    mode,
    data,
    routes,
    params,
    hasMore,
    isLoading,
    coordinate,
    visitedCount,
    unVisitedCount,
    isRoutesLoading,
    modeAnimatedValue,
    isLoadingLocation,
    filter,
    getMore,
    refresh,
    onCheckIn,
    switchMode,
    onViewInfo,
    onCreateOrder,
    onMenuItemPress,
  } = useCustomersCheckin()

  const hasData = !!data.length
  const isListMode = mode === 'list'
  const { keyword, hierarchy_id: routeId, type_checkin: typeCheckin } = params

  const renderItem: ListRenderItem<SearchCustomerRouteRes> = useCallback(
    ({ item }) => {
      return (
        <CustomerItem
          data={item}
          key={item.id}
          onPress={onViewInfo}
          onCheckIn={onCheckIn}
          onCreateOrder={onCreateOrder}
          onMenuItemPress={onMenuItemPress}
        />
      )
    },
    [onCheckIn, onCreateOrder, onViewInfo, onMenuItemPress]
  )

  return (
    <View style={styles.container}>
      <View style={[styles.header, isListMode && styles.headerShadow]}>
        <View style={styles.searchInputWrapper}>
          <SearchInput
            delay={600}
            value={keyword}
            style={styles.searchInput}
            placeholder="Tìm kiếm khách hàng"
            onChange={(keyword) => filter({ keyword })}
          />
          {(!!routes?.length || isRoutesLoading) && (
            <Popover
              offset={8}
              trigger={
                <TouchableOpacity style={styles.filterBtn} activeOpacity={0.5}>
                  <Text numberOfLines={1} style={styles.filterBtnText}>
                    {routes?.find((i) => i.id === routeId)?.name ?? 'Chọn tuyến'}
                  </Text>
                  <ArrowDownIcon fill={Colors.gray80} size={18} />
                </TouchableOpacity>
              }
            >
              {({ closePopover }) => (
                <SelectRoute
                  data={routes}
                  routeId={routeId}
                  isLoading={isLoading}
                  style={styles.popover}
                  onChange={filter}
                  onClose={closePopover}
                />
              )}
            </Popover>
          )}
        </View>
        <Tabs
          visitedCount={visitedCount}
          unVisitedCount={unVisitedCount}
          typeCheckin={typeCheckin as RouteTypeCheckIn}
          onChange={(type_checkin) => filter({ type_checkin })}
        />
      </View>
      {mode === 'map' ? (
        isLoadingLocation ? (
          <CustomersLoading />
        ) : (
          <>
            <Header
              style={BaseStyles.pt0}
              isListMode={isListMode}
              onSwitchMode={switchMode}
              animatedValue={modeAnimatedValue}
            />
            <MapView
              data={data}
              isLoading={isLoading}
              currentLocation={coordinate as LngLat}
              onCheckIn={onCheckIn}
              onCreateOrder={onCreateOrder}
              onMenuItemPress={onMenuItemPress}
            />
          </>
        )
      ) : (
        <FlatList
          data={data}
          ref={listRef}
          refreshing={false}
          onEndReachedThreshold={0.4}
          scrollEnabled={!isLoading}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={ListItemSeparator}
          contentContainerStyle={[styles.contentContainer, hasData && { paddingBottom: Math.max(bottom, 16) }]}
          onRefresh={refresh}
          onEndReached={getMore}
          renderItem={renderItem}
          ListHeaderComponent={
            hasData ? (
              <Header onSwitchMode={switchMode} animatedValue={modeAnimatedValue} isListMode={isListMode} />
            ) : null
          }
          ListEmptyComponent={
            isLoading ? (
              <CustomersLoading />
            ) : (
              <Empty style={styles.empty} title={'Không tìm thấy khách hàng nào\ntrong tuyến đi này'} />
            )
          }
          ListFooterComponent={hasMore ? <ActivityIndicator style={BaseStyles.py16} color={Colors.gray80} /> : null}
        />
      )}
    </View>
  )
}

export default CustomersCheckin
