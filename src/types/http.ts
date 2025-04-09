import { ToastProps } from './core'

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

export interface Pagination {
  limit: number
  offset: number
  total: number
}

export type HTTPResponseDataV2<T> = {
  error?: any
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
  onError?: (data: any) => Promise<void> | void
  config?: HTTPConfig
}

export interface AsyncHandlerParams<Params, Response> {
  params: Params
  onError?: (data: any) => void
  onSuccess?: (params: Response) => void
  config?: HTTPConfig
}

export interface QueryList {
  limit?: number
  offset?: number
}

export type HTTPProductFilterResponse<T> = HTTPResponseDataV2<{
  result: T
  paginate: Pagination
  price_max: number
  price_min: number
}>

export type FetcherResponse<Response = any> =
  | HTTPResponse<Response>
  | HTTPResultResponse<Response>
  | HTTPResponseV2<Response>
  | HTTPDataResponse<Response>

export type FetcherPromiseResponse<Response = any> = Promise<FetcherResponse<Response>>
