import {
  AddressRes,
  AttendanceCheckinReq,
  AttendanceCheckinRes,
  AttendanceCheckinV2Req,
  AttendanceRes,
  CreateAccountReq,
  CreateAddressReq,
  CustomerGroupRes,
  CustomerRes,
  DeleteAddress,
  GetAccountsReq,
  GetAddressReq,
  GetAttendanceReq,
  GetCustomerReq,
  GetReportInfoReq,
  GetloyaltyHistoryReq,
  HTTPResponse,
  HTTPResponseDataV2,
  HTTPResponseV2,
  IdAndName,
  LoginPassword,
  LoginPasswordRes,
  LoginWithThirdParty,
  Loyalty,
  PartnerId,
  PartnerRes,
  RefreshTokenReq,
  ReportInfoRes,
  ResetPasswordReq,
  UpdateUserInfo,
  UserInfo,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const userAPI = {
  loginPassword: (params: LoginPassword): Promise<HTTPResponseV2<LoginPasswordRes>> => {
    return axiosInstance.post(`/user_information_controller/login_by_password`, {
      params,
    })
  },
  refreshToken: (params: RefreshTokenReq): Promise<HTTPResponseDataV2<LoginPasswordRes>> => {
    return axiosInstance.get('/user_information_controller/refresh_token', {
      params,
    })
  },
  checkPhoneExists: (phone: string): Promise<HTTPResponseDataV2<any>> => {
    return axiosInstance.post(`/user_information_controller/check_user_account`, {
      params: { phone },
    })
  },
  getUserInfo: (token?: string): Promise<HTTPResponse<{ info_customer: UserInfo }>> => {
    return axiosInstance.post(
      '/api/v2.0/information_customers/get_info_customer',
      {
        params: { token },
      },
      token ? { headers: { Authorization: token } } : undefined
    )
  },
  getCustomerInfo: (partner_id: number): Promise<HTTPResponse<{ info_customer: UserInfo }>> => {
    return axiosInstance.post('/api/v2.0/information_customers/get_info_customer', {
      params: { partner_id },
    })
  },
  getloyaltyHistory: ({ partner_id }: GetloyaltyHistoryReq): Promise<HTTPResponse<Loyalty[]>> => {
    return axiosInstance.post('/api/v2.0/customer/get_history_loyalty', {
      params: {
        customer_id: partner_id || null,
        // type_use: 'using', // create
      },
    })
  },
  loginWithThirdParty: (params: LoginWithThirdParty): Promise<HTTPResponseV2<LoginPasswordRes>> => {
    return axiosInstance.post(`/user_information_controller/auth`, {
      params,
    })
  },
  getCustomers: (params: GetCustomerReq): Promise<HTTPResponse<CustomerRes[]>> => {
    return axiosInstance.post('/api/v2.0/user/accounts', {
      params,
    })
  },
  getCustomerGroups: (): Promise<HTTPResponse<CustomerGroupRes[]>> => {
    return axiosInstance.post('/api/v2.0/customer/get_all_list_hcategory', {
      params: {},
    })
  },
  getAddress: (params?: GetAddressReq): Promise<HTTPResponse<IdAndName[]>> => {
    return axiosInstance.post('/api/v2.0/user/adress', {
      params,
    })
  },
  getAddressesByUser: (params?: PartnerId): Promise<HTTPResponse<AddressRes[]>> => {
    return axiosInstance.post('/api/v2.0/user/get_adress_by_partner', {
      params,
    })
  },
  attendanceCheckin: (params: AttendanceCheckinReq): Promise<HTTPResponse<AttendanceCheckinRes>> => {
    return axiosInstance.post('/api/v2.0/attendance/checkin_by_company', {
      params,
    })
  },
  createAddress: (params: CreateAddressReq): Promise<HTTPResponse<[{ partner_shipping_id: number }]>> => {
    return axiosInstance.post('/api/v2.0/user/adress_add', {
      params,
    })
  },
  deleteAddress: (params: DeleteAddress): Promise<HTTPResponse<[{}]>> => {
    return axiosInstance.post('/api/v2.0/user/adress_delete', { params })
  },

  updateUserInfo: (params: UpdateUserInfo): any =>
    axiosInstance.post('/api/v2.0/information_customers/update_user', { params }),

  createAccount: (params: CreateAccountReq): any => axiosInstance.post('/api/v2.0/user/create', { params }),

  getListAccountsV2: (params: GetAccountsReq): Promise<HTTPResponse<PartnerRes[]>> =>
    axiosInstance.post('/api/v2.0/user/accounts', { params }),

  updatePassword: (params: any): any =>
    axiosInstance.post('/user_information_controller/change-password', {
      params,
    }),

  resetPassword: (params: ResetPasswordReq): Promise<HTTPResponseDataV2<LoginPasswordRes>> =>
    axiosInstance.post('/user_information_controller/reset-password', {
      params,
    }),

  checkRegister: (params: CreateAccountReq): any => axiosInstance.post('/api/v2.0/validate_register', { params }),

  getListAttendanceByDay: (params: GetAttendanceReq): Promise<HTTPResponse<AttendanceRes[]>> =>
    axiosInstance.post('/api/v2.0/user/attendance_by_day', { params }),

  attendanceCheckinV2: (params: AttendanceCheckinV2Req): any =>
    axiosInstance.post('/api/v2.0/attendance/checkin', { params }),

  getReportInfoV2: (params: GetReportInfoReq): Promise<HTTPResponse<ReportInfoRes>> =>
    axiosInstance.post('/api/v2.0/report_api/statistic_target_report', { params }),
}
