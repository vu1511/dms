import type { QueryList } from '@/types'
import type { ReactElement } from 'react'
import type { KeyedMutator } from 'swr'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import type { ListProps, ListProvider, ListRef } from '../list'

type Fetcher<Params extends QueryList, Response> = (params: Params) => Promise<Response>

type PaginateBy = 'page' | 'cursor'

type PreviousData<Data = any, AdditionalData = any> = {
  data: Data
  hasMore: boolean
  additionalData?: AdditionalData
}

type MutateFetcherResponse<
  Response = any,
  Data extends Response[keyof Response] = any,
  FilterParams extends QueryList = any,
> = (response: Response, params: FilterParams) => PreviousData<Data[]>

type GetKeyResult<FilterParams extends QueryList> = FilterParams & {
  key: string
  hasMore: boolean
  page: number
}

type MutateFetcherParams<Params extends QueryList, FilterParams extends QueryList = Params> = (
  params: FilterParams,
  additionalParams: { page: number }
) => Params

type OptionalMutateFetcherParams<Params extends QueryList, FilterParams extends QueryList = Params> = {
  mutateFetcherParams?: MutateFetcherParams<Params, FilterParams>
}

type RequiredMutateFetcherParams<Params extends QueryList, FilterParams extends QueryList = Params> = {
  mutateFetcherParams: MutateFetcherParams<Params, FilterParams>
}

export type MutateKey<FilterParams extends QueryList = any> = (
  params: GetKeyResult<FilterParams>
) => GetKeyResult<FilterParams>

type UseQueryInfiniteListProps<
  Params extends QueryList = any,
  Response = any,
  FilterParams extends QueryList = Params,
  Data extends Response[keyof Response] = any,
> = {
  key: string
  initialParams?: FilterParams
  fetcher: Fetcher<Params, Response>
  config?: Partial<SWRInfiniteConfiguration<Data, any, () => any>>
  mutateFetcherResponse: MutateFetcherResponse<Response, Data, FilterParams>
} & (Params extends FilterParams
  ? OptionalMutateFetcherParams<Params, FilterParams>
  : RequiredMutateFetcherParams<Params, FilterParams>)

export type UseQueryInfiniteListResult<
  Params extends QueryList = any,
  Response = any,
  FilterParams extends QueryList = Params,
  Data extends Response[keyof Response] = any,
> = {
  data: Data[]
  params: FilterParams
  hasMore: boolean
  isLoading: boolean
  isValidating: boolean
  additionalData?: any
  getMore: () => void
  refresh: (resetParams?: boolean) => Promise<void>
  filter: (filterParams: Partial<FilterParams>) => Promise<void>
  mutate: KeyedMutator<PreviousData<Data extends any[] ? Data : Data[]>[]>
}

type RenderQueryInfiniteComponent<
  Params extends QueryList = any,
  Response = any,
  FilterParams extends QueryList = Params,
  Data extends Response[keyof Response] = any,
> = (params: UseQueryInfiniteListResult<Params, Response, FilterParams, Data>) => ReactElement

type QueryInfiniteListProps<
  Params extends QueryList = any,
  Response = any,
  FilterParams extends QueryList = Params,
  Data extends Response[keyof Response] = any,
  Provider extends ListProvider = 'FlatList',
> = Omit<ListProps<Data, Provider>, 'data' | 'StickyHeaderComponent' | 'StickyFooterComponent'> &
  Omit<UseQueryInfiniteListProps<Params, Response, FilterParams, Data>, 'key'> & {
    swrKey: UseQueryInfiniteListProps<Params, Response, FilterParams, Data>['key']
    renderHeader?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
    renderStickyHeader?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
    renderStickyFooter?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
    renderEmptyComponent?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
  }

type QueryInfiniteListRef<
  Params extends QueryList = any,
  Response = any,
  FilterParams extends QueryList = Params,
  Data extends Response[keyof Response] = any,
  Provider extends ListProvider = 'FlatList',
> = ListRef<Data, Provider> & UseQueryInfiniteListResult<Params, Response, FilterParams, Data>

export {
  Fetcher,
  GetKeyResult,
  MutateFetcherParams,
  MutateFetcherResponse,
  OptionalMutateFetcherParams,
  PaginateBy,
  PreviousData,
  QueryInfiniteListProps,
  QueryInfiniteListRef,
  RenderQueryInfiniteComponent,
  RequiredMutateFetcherParams,
  UseQueryInfiniteListProps,
}
