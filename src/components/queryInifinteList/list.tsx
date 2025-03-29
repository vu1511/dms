import { Colors } from '@/theme'
import { FlashList } from '@shopify/flash-list'
import { forwardRef, Ref, useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ActivityIndicator from '../activityIndicator'
import Empty from '../empty'
import useQueryInfiniteList from './hook'
import { styles } from './style'
import { type QueryInfiniteListProps, type QueryInfiniteListRef } from './types'

const QueryInfiniteListInner = <
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
>(
  {
    swrKey,
    fetcher,
    onFilter: externalOnFilter,
    config,
    initialParams,
    mutateKey,
    mutateDataResult,
    mutateFetcherParams,
    mutateFetcherResponse,
    containerStyle,
    LoadingComponent,
    ListFooterComponent = null,
    progressViewOffset,
    renderEmptyComponent,
    emptyTitle = 'Không tìm thấy kết quả nào',
    emptyIcon,
    emptyStyle,
    showBottomSpacing = true,
    showFooterSpacing = false,
    ListEmptyComponent,
    renderStickyHeader,
    renderHeader,
    renderStickyFooter,
    renderScrollComponent: ScrollComponent = ScrollView,
    refreshControl,
    refreshable = true,
    refreshing,
    onRefresh,
    renderItem,
    ...rest
  }: QueryInfiniteListProps<Params, Response, FilterParams, Data>,
  ref?: Ref<QueryInfiniteListRef<Params, Response, FilterParams, Data>>
) => {
  const { bottom } = useSafeAreaInsets()
  const listRef = useRef<QueryInfiniteListRef<Params, Response, FilterParams, Data>>({} as QueryInfiniteListRef)

  const onFilter = useCallback(() => {
    listRef.current?.scrollToOffset?.({ offset: 0, animated: false })
    externalOnFilter && externalOnFilter()
  }, [externalOnFilter])

  const swrData = useQueryInfiniteList<any, Response, any, Data>({
    key: swrKey,
    config,
    initialParams,
    fetcher,
    onFilter,
    mutateKey,
    mutateDataResult,
    mutateFetcherParams,
    mutateFetcherResponse,
  })
  const { hasMore, getMore, refresh } = swrData
  const isLoading = swrData.isRefreshing || swrData.isLoading
  const data = isLoading ? undefined : swrData.data
  const hasData = !!data?.length

  useImperativeHandle(ref, () => {
    const ref = listRef.current

    ref.data = swrData.data
    ref.params = swrData.params
    ref.hasMore = swrData.hasMore
    ref.isLoading = swrData.isLoading
    ref.isValidating = swrData.isValidating
    ref.isRefreshing = swrData.isRefreshing
    ref.getMore = swrData.getMore
    ref.refresh = swrData.refresh
    ref.filter = swrData.filter
    ref.mutate = swrData.mutate

    return ref
  }, [listRef, swrData])

  const handleRefresh = useCallback(() => {
    refresh()
    onRefresh && onRefresh()
  }, [refresh, onRefresh])

  const RenderHeader = useMemo(
    () => renderHeader?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderHeader, swrData, rest.extraData]
  )

  const RenderStickyHeader = useMemo(
    () => renderStickyHeader?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [swrData, renderStickyHeader, rest.extraData]
  )

  const RenderStickyFooter = useMemo(
    () => renderStickyFooter?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [swrData, renderStickyFooter, rest.extraData]
  )

  const RenderEmptyComponent = useMemo(
    () => renderEmptyComponent?.(swrData) ?? ListEmptyComponent,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [swrData, ListEmptyComponent, renderEmptyComponent, rest.extraData]
  )

  const RenderListFooterComponent = useMemo(
    () => (
      <>
        {ListFooterComponent}
        {hasData && (
          <>
            {hasMore && <ActivityIndicator color={Colors.gray80} size={20} style={styles.loadingMore} />}
            {showFooterSpacing && bottom > 0 && <View style={{ height: bottom }} />}
          </>
        )}
      </>
    ),
    [ListFooterComponent, showFooterSpacing, hasData, hasMore, bottom]
  )

  const RenderListEmptyComponent = useMemo(() => {
    return hasMore || isLoading ? (
      <View style={styles.loadingContainer}>
        {LoadingComponent || (
          <View style={styles.loading}>
            <ActivityIndicator size={24} color={Colors.gray80} />
          </View>
        )}
      </View>
    ) : (
      RenderEmptyComponent || <Empty style={[styles.empty, emptyStyle]} icon={emptyIcon} title={emptyTitle} />
    )
  }, [hasMore, isLoading, LoadingComponent, RenderEmptyComponent, emptyStyle, emptyIcon, emptyTitle])

  return (
    <View style={[[styles.container, !isLoading && !hasData && styles.bgWhite, containerStyle]]}>
      {RenderStickyHeader}

      <FlashList
        data={data}
        ref={listRef}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.4}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        renderScrollComponent={ScrollComponent}
        renderItem={renderItem}
        onEndReached={getMore}
        ListHeaderComponent={RenderHeader}
        ListEmptyComponent={RenderListEmptyComponent}
        ListFooterComponent={RenderListFooterComponent}
        refreshControl={
          refreshable ? (
            <RefreshControl progressViewOffset={progressViewOffset} refreshing={false} onRefresh={handleRefresh} />
          ) : undefined
        }
        {...rest}
      />

      {RenderStickyFooter}

      {showBottomSpacing && bottom > 0 && <View style={[styles.bottom, { paddingBottom: bottom }]} />}
    </View>
  )
}

const QueryInfiniteList = forwardRef(QueryInfiniteListInner) as <
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
>(
  props: QueryInfiniteListProps<Params, Response, FilterParams, Data> & {
    ref?: Ref<QueryInfiniteListRef<Params, Response, FilterParams, Data>>
  }
) => ReturnType<typeof QueryInfiniteListInner>

export default QueryInfiniteList
