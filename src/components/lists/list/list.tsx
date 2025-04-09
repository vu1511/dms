import { ActivityIndicator, Empty } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { FlashList } from '@shopify/flash-list'
import { forwardRef, type ReactElement, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './style'
import { ListProps, ListProvider, ListProviderProps, ListRef } from './types'

export const ListInner = <Data, P extends ListProvider = 'FlatList'>(
  {
    provider = 'FlatList' as P,
    hasMore,
    isLoading,
    emptyTitle,
    emptyProps,
    containerStyle,
    ListEmptyComponent,
    ListFooterComponent,
    ListLoadingComponent,
    StickyHeaderComponent,
    StickyFooterComponent,
    showBottomAreaView = true,
    ...rest
  }: ListProps<Data, P>,
  ref?: React.Ref<ListRef<Data, P>>
) => {
  const hasData = !!rest?.data?.length

  const { bottom } = useSafeAreaInsets()

  const ListRender = useMemo(() => (provider === 'FlashList' ? FlashList : FlatList), [provider])

  const RenderListEmptyComponent = useMemo(() => {
    return isLoading
      ? (ListLoadingComponent ?? <ActivityIndicator />)
      : (ListEmptyComponent ?? (
          <View style={styles.emptyContainer}>
            <Empty style={styles.empty} title={emptyTitle} {...emptyProps} />
          </View>
        ))
  }, [ListEmptyComponent, ListLoadingComponent, emptyProps, emptyTitle, isLoading])

  const RenderListFooterComponent = useMemo(() => {
    return (
      <>
        {ListFooterComponent}
        {hasData && (
          <>
            {hasMore && <ActivityIndicator color={Colors.gray80} size={24} style={BaseStyles.py16} />}
            {showBottomAreaView && <View style={{ height: bottom }} />}
          </>
        )}
      </>
    )
  }, [ListFooterComponent, bottom, hasData, hasMore, showBottomAreaView])

  return (
    <View style={[[styles.container, !isLoading && !hasData && styles.bgWhite, containerStyle]]}>
      {StickyHeaderComponent as ReactElement}
      <ListRender
        ref={ref}
        refreshing={false}
        scrollEnabled={!isLoading}
        onEndReachedThreshold={0.4}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={RenderListEmptyComponent}
        ListFooterComponent={RenderListFooterComponent}
        {...(rest as ListProviderProps<Data, ListProvider>)}
      />
      {StickyFooterComponent as ReactElement}
    </View>
  )
}

const List = forwardRef(ListInner) as <Data, P extends ListProvider = 'FlatList'>(
  props: ListProps<Data, P> & { ref?: React.Ref<ListRef<Data, P>> }
) => ReturnType<typeof ListInner>

export default List
