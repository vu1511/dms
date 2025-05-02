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

const QueryInfiniteListInner = <
  Params extends QueryList,
  Response,
  FilterParams extends QueryList,
  Data extends Response[keyof Response],
  Provider extends ListProvider,
>(
  {
    swrKey,
    initialParams,
    config,
    fetcher,
    mutateFetcherParams,
    mutateFetcherResponse,
    renderHeader,
    renderStickyHeader,
    renderStickyFooter,
    renderEmptyComponent,
    ...listProps
  }: QueryInfiniteListProps<Params, Response, FilterParams, Data, Provider>,
  ref?: React.Ref<QueryInfiniteListRef<Params, Response, FilterParams, Data, Provider>>
) => {
  const listRef = useRef<QueryInfiniteListRef<Params, Response, FilterParams, Data, Provider>>(
    {} as QueryInfiniteListRef<Params, Response, FilterParams, Data, Provider>
  )

  const swrData = useQueryInfiniteList({
    config,
    key: swrKey,
    initialParams,
    fetcher,
    mutateFetcherParams,
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
    ref.params = swrData.params as FilterParams
    ref.hasMore = swrData.hasMore
    ref.isLoading = swrData.isLoading
    ref.isValidating = swrData.isValidating
    ref.getMore = swrData.getMore
    ref.refresh = swrData.refresh
    ref.filter = swrData.filter
    ref.mutate = swrData.mutate
    ref.additionalData = swrData.additionalData

    return ref
  }, [listRef, swrData])

  const RenderHeader = useMemo<ListElement>(
    // @ts-ignore
    () => renderHeader?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderHeader, swrData, listProps.extraData]
  )

  const RenderStickyHeader = useMemo<ListElement>(
    // @ts-ignore
    () => renderStickyHeader?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderStickyHeader, swrData, listProps.extraData]
  )

  const RenderEmptyComponent = useMemo<ListElement>(
    // @ts-ignore
    () => renderEmptyComponent?.(swrData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderEmptyComponent, swrData, listProps.extraData]
  )

  const RenderStickyFooter = useMemo<ListElement>(
    // @ts-ignore
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
  Params extends QueryList,
  Response,
  FilterParams extends QueryList,
  Data extends Response[keyof Response],
  Provider extends ListProvider,
>(
  props: QueryInfiniteListProps<Params, Response, FilterParams, Data, Provider> & {
    ref?: React.Ref<QueryInfiniteListRef<Params, Response, FilterParams, Data, Provider>>
  }
) => ReturnType<typeof QueryInfiniteListInner>

export default QueryInfiniteList
