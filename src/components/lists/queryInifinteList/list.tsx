import { QueryList } from '@/types'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { List, ListElement, ListProps, ListProvider } from '../list'
import useQueryInfiniteList from './hook'
import { QueryInfiniteListProps, QueryInfiniteListRef } from './types'

/*
  TODO: 
  1. auto scroll to top after filter
  2. fix ts error of StickyHeaderComponent
*/

const QueryInfiniteListInner = <Data, Params extends QueryList, Provider extends ListProvider>(
  {
    swrKey,
    initialParams,
    config,
    fetcher,
    mutateFetcherResponse,
    renderHeader,
    renderStickyHeader,
    renderStickyFooter,
    renderEmptyComponent,
    ...listProps
  }: QueryInfiniteListProps<Data, Params, Provider>,
  ref?: React.Ref<QueryInfiniteListRef<Data, Params, Provider>>
) => {
  const listRef = useRef<QueryInfiniteListRef<Data, Params, Provider>>(
    {} as QueryInfiniteListRef<Data, Params, Provider>
  )

  const swrData = useQueryInfiniteList({
    key: swrKey,
    initialParams,
    config,
    fetcher,
    mutateFetcherResponse,
  })

  const { data, hasMore, isLoading, getMore, refresh } = swrData

  useEffect(() => {
    if (isLoading) {
      listRef.current?.scrollToOffset({ offset: 0, animated: false })
    }
  }, [isLoading])

  useImperativeHandle(ref, () => {
    const ref = listRef.current

    ref.data = swrData.data
    ref.params = swrData.params
    ref.hasMore = swrData.hasMore
    ref.isLoading = swrData.isLoading
    ref.isValidating = swrData.isValidating
    ref.getMore = swrData.getMore
    ref.refresh = swrData.refresh
    ref.filter = swrData.filter
    ref.mutate = swrData.mutate

    return ref
  }, [listRef, swrData])

  const RenderHeader = useMemo<ListElement>(
    () => renderHeader?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderHeader, swrData, listProps.extraData]
  )

  const RenderStickyHeader = useMemo<ListElement>(
    () => renderStickyHeader?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderStickyHeader, swrData, listProps.extraData]
  )

  const RenderEmptyComponent = useMemo<ListElement>(
    () => renderEmptyComponent?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderEmptyComponent, swrData, listProps.extraData]
  )

  const RenderStickyFooter = useMemo<ListElement>(
    () => renderStickyFooter?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderStickyFooter, swrData, listProps.extraData]
  )

  return (
    <List
      {...(listProps as unknown as ListProps<any, any>)}
      data={data}
      ref={listRef}
      hasMore={hasMore}
      isLoading={isLoading}
      onRefresh={refresh}
      onEndReached={getMore}
      ListEmptyComponent={RenderEmptyComponent}
      ListHeaderComponent={RenderHeader}
      StickyHeaderComponent={RenderStickyHeader}
      StickyFooterComponent={RenderStickyFooter}
    />
  )
}

const QueryInfiniteList = forwardRef(QueryInfiniteListInner) as <
  Data = any,
  Params extends QueryList = any,
  Provider extends ListProvider = 'FlatList',
>(
  props: QueryInfiniteListProps<Data, Params, Provider> & {
    ref?: React.Ref<QueryInfiniteListRef<Data, Params, Provider>>
  }
) => ReturnType<typeof QueryInfiniteListInner>

export default QueryInfiniteList
