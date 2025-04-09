import {
  CreateInventoryReq,
  CreateInventoryRes,
  DeleteInventoryLineReq,
  DeleteInventoryReq,
  GetInventoriesReq,
  HTTPDataResponse,
  InventoryRes,
  UpdateInventoryReq,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const inventoryAPI = {
  createInventory: (params: CreateInventoryReq): Promise<HTTPDataResponse<CreateInventoryRes>> => {
    return axiosInstance.post('/manage_inventory_store_controller/create_inventory_store', {
      params,
    })
  },
  getListInventory: (params: GetInventoriesReq): Promise<HTTPDataResponse<InventoryRes[]>> => {
    return axiosInstance.post('/manage_inventory_store_controller/get_list_inventory_store', {
      params,
    })
  },
  updateInventory: (params: UpdateInventoryReq): Promise<HTTPDataResponse<any>> => {
    return axiosInstance.post('/manage_inventory_store_controller/update_inventory_store', {
      params,
    })
  },
  deleteInventory: (params: DeleteInventoryReq): Promise<HTTPDataResponse<any>> => {
    return axiosInstance.post('/manage_inventory_store_controller/delete_inventory_store', {
      params,
    })
  },
  deleteInventoryLine: (params: DeleteInventoryLineReq): Promise<HTTPDataResponse<any>> => {
    return axiosInstance.post('/manage_inventory_store_controller/delete_inventory_store_line', {
      params,
    })
  },
}
