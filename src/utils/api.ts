import { FetcherResponse, HTTPDataResponse, HTTPResponse, HTTPResponseV2, HTTPResultResponse } from '@/types'

export const getFetcherResponse = <Response>(response: FetcherResponse<Response>): Response | undefined => {
  if ('jsonrpc' in response) {
    if ('id' in response && 'result' in response) {
      return (response as HTTPResponse<Response>).result?.data
    }
    if ('result' in response) {
      return (response as HTTPResultResponse<Response>).result
    }
  } else if ('code' in response && 'data' in response && 'result' in response.data) {
    return (response as HTTPResponseV2<Response>).data?.result
  } else if ('success' in response && 'data' in response) {
    return (response as HTTPDataResponse<Response>).data
  }

  return undefined
}
