import {
  DebtDetailRes,
  GetDebtDetailReq,
  GetDebtsFilterRes,
  GetDebtsReq,
  GetDebtsRes,
  HTTPPromiseResponse,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const debtAPI = {
  getDebts: (params: GetDebtsReq): HTTPPromiseResponse<GetDebtsRes> => {
    return axiosInstance.post('/api/v3.0/account/get_account', { params })
  },
  getDebtsFilter: (): HTTPPromiseResponse<GetDebtsFilterRes> => {
    return axiosInstance.post('/api/v3.0/account/get_filter_account', {})
  },
  getDetailDebt: (params: GetDebtDetailReq): HTTPPromiseResponse<DebtDetailRes> => {
    return axiosInstance.post('/api/v3.0/account/detail_account', { params })
  },
}
