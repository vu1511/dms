import { Storage } from '@/core'
import { axiosInstance } from '@/services'
import { CompanyRes, TokenRes, UserInfo } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist, StateStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return Storage.Storage.set(name, value)
  },
  getItem: (name) => {
    const value = Storage.Storage.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return Storage.Storage.delete(name)
  },
}

type State = {
  userInfo: UserInfo | undefined
  token: string | undefined
  domain: string | undefined
  deviceId: string | undefined
  refreshToken: string | undefined
  setToken: (data: TokenRes | undefined) => void
  setDeviceId: (id: string | undefined) => void
  setAccessToken: (data: string) => void
  setUserInfo: (user: UserInfo | undefined) => void
  setDomain: (domain: string) => void
  logout: () => void
  company: CompanyRes | null
  setCompany: (params: CompanyRes | null) => void
}

export const useUserSlice = create<
  State,
  [['zustand/devtools', never], ['zustand/persist', never], ['zustand/immer', never]]
>(
  devtools(
    persist(
      immer((set) => ({
        company: null,
        refreshToken: undefined,
        chatRefreshToken: undefined,
        chatToken: undefined,
        token: undefined,
        userInfo: undefined,
        deviceId: undefined,
        domain: undefined,
        setCompany: (company: CompanyRes | null) =>
          set((state: State) => {
            state.company = company
          }),
        setToken: (data: TokenRes | undefined) =>
          set((state) => {
            state.refreshToken = data?.refresh_token
            state.token = data?.token
          }),
        setDeviceId: (id: string | undefined) =>
          set((state) => {
            state.deviceId = id
          }),
        setUserInfo: (data: UserInfo | undefined) =>
          set((state) => {
            state.userInfo = data
          }),
        setAccessToken: (data: string) =>
          set((state) => {
            state.token = data
          }),
        setDomain: (data: string) =>
          set((state) => {
            state.domain = data
            axiosInstance.defaults.baseURL = data
          }),
        logout: () =>
          set((state) => {
            state.userInfo = undefined
            state.refreshToken = undefined
            state.token = undefined
            state.deviceId = undefined
            state.setDomain('')
            state.company = null
          }),
      })),
      { name: 'user', storage: createJSONStorage(() => zustandStorage) }
    )
  )
)
