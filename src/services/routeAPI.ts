import {
  CustomerHierarchyRes,
  GetCustomersHierarchyReq,
  HTTPPromiseResponse,
  RouteDetailReq,
  RouteDetailRes,
  RouteRes,
  SearchCustomerRouteReq,
  SearchCustomerRouteRes,
  UpdateRouteReq,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const routeAPI = {
  getRoutes: (): HTTPPromiseResponse<RouteRes[]> => {
    return axiosInstance.post('/api/v2.0/get_list_sale_hierarchy', {
      params: {},
    })
  },

  updateRoute: (params: UpdateRouteReq) => {
    return axiosInstance.post('/api/v2.0/update_list_sale_hierarchy', { params })
  },

  getRouteDetail: (params: RouteDetailReq): HTTPPromiseResponse<RouteDetailRes[]> => {
    return axiosInstance.post('/api/v2.0/detail_list_sale_hierarchy', {
      params,
    })
  },

  getOrCreateTempRoute: (params: any) => {
    return axiosInstance.post('salesman_route_controller/create_salesman_route_for_user', {
      params,
    })
  },

  getTodayRoute: (): HTTPPromiseResponse<RouteDetailRes[]> => {
    return axiosInstance.post('/api/v2.0/detail_list_sale_hierarchy_to_day', {
      params: {},
    })
  },

  searchCustomerInRoute: (params: SearchCustomerRouteReq): HTTPPromiseResponse<SearchCustomerRouteRes[]> => {
    return axiosInstance.post('/api/v2.0/search_customer_in_hierarchy', {
      params,
    })
  },

  getCustomersHierarchy: (params: GetCustomersHierarchyReq): HTTPPromiseResponse<CustomerHierarchyRes[]> => {
    return axiosInstance.post('/api/v2.0/get_list_account_hierarchy', { params })
  },
}
