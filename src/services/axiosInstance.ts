import axios from 'axios'
import memoize from 'memoizee'
import { notificationAPI } from './notificationAPI'
import { userAPI } from './userAPI'
import { useUserSlice } from '@/store/user'

export const axiosInstance = axios.create({
  baseURL: useUserSlice?.getState()?.domain,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  const token = useUserSlice.getState().token
  config.baseURL = useUserSlice?.getState()?.domain

  if (config?.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  async (response) => {
    const config = response.config
    const code = response.data?.result?.code || response.data?.code

    if ((code === 401 || code === 403) && !(config as any)?.retry) {
      ;(config as any).retry = true

      const status = await memorizeRefreshToken()
      if (status) {
        return axiosInstance(config)
      }
    }

    if (response?.data) {
      return response.data
    }

    return response
  },
  async (error) => {
    const config = error.config
    const status = error?.response?.status
    if ((status === 401 || status === 403) && !config?.retry) {
      config.retry = true
      const status = await memorizeRefreshToken()
      if (status) {
        return axiosInstance(config)
      }
    }

    return Promise.reject(error)
  }
)

const refreshToken = async () => {
  try {
    const refresh_token = useUserSlice.getState()?.refreshToken
    if (!refresh_token) {
      logoutHandler()
      return false
    }

    const res = await userAPI.refreshToken({ refresh_token })
    if (!res?.success) {
      logoutHandler()
      return false
    }

    useUserSlice.getState().setToken(res.data)
    return true
  } catch (error) {
    logoutHandler()
    return false
  }
}

const logoutHandler = () => {
  useUserSlice.getState().logout()

  const device_id = useUserSlice.getState()?.deviceId
  if (device_id) {
    notificationAPI.logoutFromDevice({ device_id }).catch(() => {})
  }
}

const memorizeRefreshToken = memoize(refreshToken, { maxAge: 10000 })
