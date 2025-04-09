import type { HTTPListResponse, HTTPListResponsePromiseV2, Pagination, QueryList } from '@/types'
import type { ReactElement } from 'react'
import type { PublicConfiguration } from 'swr/dist/_internal'
import { SWRInfiniteKeyedMutator } from 'swr/dist/infinite'
import type { ListProps, ListProvider, ListRef } from '../list'

export type Fetcher<Params, Data> = (params: Params) => HTTPListResponsePromiseV2<Data[]>

export type FetcherPartialParams<Params, Data> = (params: Partial<Params>) => HTTPListResponsePromiseV2<Data[]>

export type PreviousData<Data = any> = {
  data: Data[]
  pagination: Pagination
}

export type GetKeyResult<Params> = Params & {
  page: number
}

export type UseQueryInfiniteListResult<Data, Params extends QueryList = any> = {
  data: Data[]
  params: Params
  hasMore: boolean
  isLoading: boolean
  isValidating: boolean
  getMore: () => void
  refresh: (resetParams?: boolean) => Promise<void>
  filter: (filterParams: Partial<Params>) => Promise<void>
  mutate: SWRInfiniteKeyedMutator<PreviousData<Data>[]>
}

export type RenderQueryInfiniteComponent<Data, Params extends QueryList = any> = (
  params: UseQueryInfiniteListResult<Data, Params>
) => ReactElement

export type UseQueryInfiniteListProps<Data, Params extends QueryList = any> = {
  key: string | null
  initialParams?: Params
  config?: Partial<PublicConfiguration<any, any, (args_0: string) => any>>
  fetcher: Fetcher<Params, Data> | FetcherPartialParams<Params, Data>
  mutateFetcherResponse?: (params: HTTPListResponse<Data[]>) => PreviousData<Data>
}

export type QueryInfiniteListProps<
  Data = any,
  Params extends QueryList = any,
  Provider extends ListProvider = 'FlatList',
> = Omit<ListProps<Data, Provider>, 'data' | 'StickyHeaderComponent' | 'StickyFooterComponent'> &
  Omit<UseQueryInfiniteListProps<Data, Params>, 'key'> & {
    swrKey: UseQueryInfiniteListProps<Data, Params>['key']
    renderHeader?: RenderQueryInfiniteComponent<Data, Params>
    renderStickyHeader?: RenderQueryInfiniteComponent<Data, Params>
    renderStickyFooter?: RenderQueryInfiniteComponent<Data, Params>
    renderEmptyComponent?: RenderQueryInfiniteComponent<Data, Params>
  }

export type QueryInfiniteListRef<
  Data = any,
  Params extends QueryList = any,
  Provider extends ListProvider = 'FlatList',
> = ListRef<Data, Provider> & UseQueryInfiniteListResult<Data, Params>
