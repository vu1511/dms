import {
  ConfirmDeliveryMethodReq,
  ConfirmDeliveryMethodRes,
  ConfirmTransactionParams,
  CreateDraftOrderReq,
  CreateOrderDoneReq,
  CreateOrderDoneRes,
  CreatePaymentParams,
  DeliveryMethodRes,
  GetDeliveryMethodsReq,
  GetOrderDraftRes,
  GetOrderHistoryListReq,
  GetOrderHistoryRes,
  GetOrderProcessReq,
  GetOrderProcessRes,
  GetStatusOrderRes,
  HTTPResponse,
  HTTPResponseDataV2,
  HTTPResultResponse,
  IdAndName,
  OrderBookingRes,
  OrderDraftRes,
  Payment,
  UpdateOrderDraft,
  UpdateOrderDraftRes,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const orderAPI = {
  createOrderDraft: (params: CreateDraftOrderReq): Promise<HTTPResponse<{ sale_orders: OrderDraftRes[] }>> => {
    return axiosInstance.post('/api/v2.0/order/order_draft', {
      params,
    })
  },

  getOrderPrint: (params: { sale_id: number }): Promise<HTTPResponse<string>> => {
    return axiosInstance.post('/api/order/print', {
      params,
    })
  },

  getOrderDrafts: (params: { order_ids: number[] }): Promise<HTTPResponse<GetOrderDraftRes>> => {
    return axiosInstance.post('/api/v2.0/order/get_order_draft', {
      params,
    })
  },

  createOrderDone: (params: CreateOrderDoneReq): Promise<HTTPResponse<{ sale_order_id: CreateOrderDoneRes[] }>> => {
    return axiosInstance.post('/api/v2.0/order/order_done', {
      params,
    })
  },

  getDeliveryMethods: (params: GetDeliveryMethodsReq): Promise<HTTPResponseDataV2<DeliveryMethodRes[]>> => {
    return axiosInstance.post('/delivery_carrier/get_available_carrier', {
      params,
    })
  },

  getStatusOrder: (): Promise<HTTPResultResponse<GetStatusOrderRes>> => {
    return axiosInstance.post('/api/v2.0/order/get_status_order', {})
  },

  confirmDeliveryMethod: (params: ConfirmDeliveryMethodReq): Promise<HTTPResponse<ConfirmDeliveryMethodRes>> => {
    return axiosInstance.post('/delivery_carrier/confirm_delivery_carrier', {
      params,
    })
  },

  getOrderTags: (): Promise<HTTPResponse<(IdAndName & { color: string })[]>> => {
    return axiosInstance.post('/api/v3.0/order/get_sale_tags', {
      params: {},
    })
  },

  getOrderHistoryList: (params: GetOrderHistoryListReq): Promise<HTTPResponse<GetOrderHistoryRes>> => {
    return axiosInstance.post('/api/v2.0/information_booking/booking_history', {
      params,
    })
  },

  getOrderHistoryDetail: (params: {
    sale_order_id: number
  }): Promise<HTTPResponse<{ info_booking: OrderBookingRes }>> => {
    return axiosInstance.post('/api/v2.0/information_booking/get_info_booking', {
      params,
    })
  },

  setOrderProcess: (params: GetOrderProcessReq): Promise<HTTPResponse<GetOrderProcessRes>> => {
    return axiosInstance.post('/api/v3.0/order/process', {
      params,
    })
  },

  updateOrderDraft: (params: UpdateOrderDraft): Promise<HTTPResponse<UpdateOrderDraftRes[]>> => {
    return axiosInstance.post('/api/v2.0/order/order_update', {
      params: params,
    })
  },

  getPaymentList: (): Promise<HTTPResultResponse<HTTPResponseDataV2<Payment[]>>> => {
    return axiosInstance.post('/vnpay_controller/get_payment_method_in_app', {
      params: {},
    })
  },

  confirmTransaction: (params: ConfirmTransactionParams): Promise<HTTPResultResponse<HTTPResponseDataV2<any>>> => {
    return axiosInstance.post('/payment/vnpay/confirm_transaction', {
      params: params,
    })
  },

  createPayment: (params: CreatePaymentParams): Promise<HTTPResultResponse<HTTPResponseDataV2<any>>> => {
    return axiosInstance.post('/vnpay_controller/create_payment', {
      params: params,
    })
  },
}
