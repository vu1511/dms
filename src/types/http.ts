import { ToastProps } from '@/components'
import { type KeyedMutator } from 'swr'

export type HTTPResponse<T> = {
  jsonrpc: '2.0'
  id: any
  result: HTTPDataResponse<T>
}

export type HTTPPromiseResponse<T> = Promise<HTTPResponse<T>>

export type HTTPDataResponse<T> = {
  success: boolean
  message: string
  data: T
  validate_token: boolean
}

export type ChatHTTPDataResponse<T> = {
  success: boolean
  message: string
  status_code: number
  data: T
}

export interface Pagination {
  limit: number
  offset: number
  total: number
}

export type HTTPResponseDataV2<T> = {
  code: number
  success: boolean
  message: string
  validate_token: boolean
  data: T
}

export type HTTPListResponse<T> = {
  result: T
  paginate: Pagination
}

export type HTTPResponseV2<T> = HTTPResponseDataV2<HTTPListResponse<T>>

export type HTTPListResponsePromiseV2<T> = Promise<HTTPResponseV2<T>>
export type HTTPResponsePromiseV2<T> = Promise<HTTPResponseDataV2<T>>

export type HTTPResultResponse<T> = {
  jsonrpc: '2.0'
  id: null
  result: T
}

export type HTTPMethod = 'GET' | 'POST'

export type HTTPConfig = Partial<ToastProps> & {
  showBackdrop?: boolean
  errorMsg?: string
  successMsg?: string
  showErrorMsg?: boolean
  showSuccessMsg?: boolean
  requiredToken?: boolean
  method?: HTTPMethod
  shouldNavigateToLoginIfNoTokenFound?: boolean
  shouldSetLoadingState?: boolean
}

export type AsyncHandlerFetcher<Response = any> =
  | Promise<HTTPResponse<Response>>
  | Promise<HTTPResultResponse<Response>>
  | Promise<HTTPResponseV2<Response>>
  | Promise<HTTPDataResponse<Response>>

export interface AsyncHandler<Response> {
  fetcher: AsyncHandlerFetcher<Response>
  onSuccess?: (params: Response) => Promise<void> | void
  onMissingToken?: () => void
  onError?: (data: any) => Promise<void> | void
  config?: HTTPConfig
}

export interface AsyncHandlerParams<Params, Response> {
  params: Params
  onError?: (data: any) => void
  onSuccess?: (params: Response) => void
  config?: HTTPConfig
}

export type AsyncHandlerNoFetcher<T> = Omit<AsyncHandler<T>, 'fetcher'>

export type QueryListFunction<T, V> = QueryListFetchMoreFunction<T> & {
  params: V
}

export type QueryListFetchMoreFunction<T> = {
  onError?: Function
  onSuccess?: (_: T[]) => void
}

export interface UseQueryListRes<Data = any, Params extends QueryList = any, AdditionalData = any> {
  isValidating: boolean
  hasMore: boolean
  isLoadingMore: boolean
  offset: number
  data: Data[] | undefined
  additionalData?: AdditionalData
  error: any
  isLoading: boolean
  params: Params | undefined
  mutate: KeyedMutator<any>
  fetchMore: (_?: QueryListFetchMoreFunction<Data>) => Promise<void>
  filter: (_: QueryListFunction<Data, Partial<Params>>) => Promise<void>
  refresh: (params?: Params) => void
}

export interface QueryList {
  limit?: number
  offset?: number
}

export type Fetcher<Params, Data> = (params: Params) => Promise<HTTPResponseV2<Data[]>>

export type FetcherPartialParams<Params, Data> = (params: Partial<Params>) => Promise<HTTPResponseV2<Data[]>>

export type HTTPProductFilterResponse<T> = HTTPResponseDataV2<{
  result: T
  paginate: Pagination
  price_max: number
  price_min: number
}>
