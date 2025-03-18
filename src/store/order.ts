import { OrderCustomer, ShippingAddress } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type State = {
  address: ShippingAddress | null
  customer: OrderCustomer | null
  // orders: OrderDraftRes[]
  orderImage: null | string
  setOrderImage: (image: string | null) => void
  setAddress: (params: ShippingAddress | null) => void
  // setOrder: (orders: OrderDraftRes[]) => void
  setCustomer: (item: OrderCustomer | null) => void
  // deleteCompanyOrder: (companyId: number) => void
  clearDataAfterCreateOrderDone: () => void
  setLogOut: () => void
}

export const useOrderSlice = create<State, [['zustand/devtools', never], ['zustand/immer', never]]>(
  devtools(
    immer((set) => ({
      customer: null,
      order: null,
      orders: [],
      totalQuantity: 0,
      address: null,
      orderImage: null,
      company: null,
      setCustomer: (customer: OrderCustomer | null) =>
        set((state: State) => {
          state.customer = customer
          state.address = customer?.shipping_address || null
        }),
      setAddress: (address: ShippingAddress | null) =>
        set((state: State) => {
          if (address?.id && address?.state_id?.id) {
            state.address = address
          } else {
            state.address = null
          }
          // if (state.orders?.length) {
          //   state.orders = []
          // }
        }),
      setLogOut: () =>
        set((state: State) => {
          state.customer = null
          // state.orders = []
          state.address = null
          state.orderImage = null
        }),
      // setOrder: (orders: OrderDraftRes[]) =>
      //   set((state: State) => {
      //     orders.forEach((order) => {
      //       const companyIndex = state.orders.findIndex(
      //         (item) => item.company_id === order.company_id
      //       )
      //       if (companyIndex !== -1) {
      //         state.orders[companyIndex] = order
      //       } else {
      //         state.orders.push(order)
      //       }
      //     })
      //   }),
      // deleteCompanyOrder: (companyId: number) =>
      //   set((state: State) => {
      //     if (state?.orders?.length) {
      //       const index = state.orders.findIndex(
      //         (item) => item.company_id === companyId
      //       )
      //       if (index !== -1) {
      //         state.orders.splice(index, 1)
      //       }
      //     }
      //   }),
      setOrderImage: (image: string | null) =>
        set((state: State) => {
          state.orderImage = image
        }),
      clearDataAfterCreateOrderDone: () =>
        set((state: State) => {
          state.customer = null
          state.address = null
          state.orderImage = null
          // state.orders = []
        }),
    }))
  )
)
