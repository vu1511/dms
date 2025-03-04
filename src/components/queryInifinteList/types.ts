import { OptionalExceptFor } from '@/types'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { ReactElement } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { KeyedMutator } from 'swr'
import { SWRInfiniteConfiguration } from 'swr/infinite'

type Fetcher<Params, Response> = (params: Params) => Promise<Response>

type PreviousData<Data = any> = {
  data: Data
  hasMore: boolean
}

type MutateFetcherResponse<Response = any, Data extends Response[keyof Response] = any> = (
  params: Response
) => PreviousData<Data[]>

type GetKeyResult<FilterParams> = FilterParams &
  Omit<PreviousData<any>, 'data'> & {
    key: string
    page: number
  }

type MutateFetcherParams<Params, FilterParams = Params> = (
  params: FilterParams,
  paginationParams: Omit<PreviousData<any>, 'data'> & {
    page: number
  }
) => Params

type OptionalMutateFetcherParams<Params, FilterParams = Params> = {
  mutateFetcherParams?: MutateFetcherParams<Params, FilterParams>
}

type RequiredMutateFetcherParams<Params, FilterParams = Params> = {
  mutateFetcherParams: MutateFetcherParams<Params, FilterParams>
}

export type MutateKey<FilterParams = any> = (params: GetKeyResult<FilterParams>) => GetKeyResult<FilterParams>

type UseQueryInfiniteListProps<
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
> = {
  key: string | null
  initialParams: FilterParams
  fetcher: Fetcher<Params, Response>
  config?: Partial<SWRInfiniteConfiguration<Data, any, () => any>>
  mutateFetcherResponse: MutateFetcherResponse<Response, Data>
  onFilter?: () => void
  mutateKey?: MutateKey<FilterParams>
  mutateDataResult?: (data: Data[]) => Data[]
} & (Params extends FilterParams
  ? OptionalMutateFetcherParams<Params, FilterParams>
  : RequiredMutateFetcherParams<Params, FilterParams>)

type UseQueryInfiniteListRes<
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
> = {
  data: Data[]
  hasMore: boolean
  isLoading: boolean
  params: FilterParams
  isValidating: boolean
  isRefreshing: boolean
  getMore(): Promise<void>
  refresh(resetParams?: boolean): Promise<void>
  mutate: KeyedMutator<PreviousData<Data>[]>
  filter(nextParams: Partial<FilterParams>): Promise<void>
}

type RenderQueryInfiniteComponent<
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
> = (params: UseQueryInfiniteListRes<Params, Response, FilterParams, Data>) => ReactElement

type QueryInfiniteListRef<
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
> = FlashList<Data> & UseQueryInfiniteListRes<Params, Response, FilterParams, Data>

type QueryInfiniteListProps<
  Params = any,
  Response = any,
  FilterParams = Params,
  Data extends Response[keyof Response] = any,
> = Omit<UseQueryInfiniteListProps<Params, Response, FilterParams, Data>, 'key'> & {
  swrKey: UseQueryInfiniteListProps['key']
} & OptionalExceptFor<FlashListProps<Data>, 'renderItem' | 'estimatedItemSize'> & {
    refreshable?: boolean
    LoadingComponent?: JSX.Element
    containerStyle?: StyleProp<ViewStyle>
    renderHeader?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
    renderStickyHeader?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
    renderStickyFooter?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
    renderEmptyComponent?: RenderQueryInfiniteComponent<Params, Response, FilterParams, Data>
    emptyIcon?: JSX.Element
    emptyTitle?: string | JSX.Element
    emptyStyle?: StyleProp<ViewStyle>
    showBottomSpacing?: boolean
    showFooterSpacing?: boolean
  }

export {
  Fetcher,
  GetKeyResult,
  MutateFetcherParams,
  MutateFetcherResponse,
  OptionalMutateFetcherParams,
  PreviousData,
  QueryInfiniteListProps,
  QueryInfiniteListRef,
  RenderQueryInfiniteComponent,
  RequiredMutateFetcherParams,
  UseQueryInfiniteListProps,
  UseQueryInfiniteListRes,
}
