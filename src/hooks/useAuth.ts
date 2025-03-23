import { SwrKey } from '@/constants'
import { notificationAPI, userAPI } from '@/services'
import { useOrderSlice, useUserSlice } from '@/store'
import { LoginPassword, LoginPasswordRes } from '@/types'
import { showMessage } from 'react-native-flash-message'
import { useSWRConfig } from 'swr'
import { useAsync } from './useAsync'

export const useAuth = () => {
  const { asyncHandler } = useAsync()
  const { mutate, cache } = useSWRConfig()
  const setUserInfo = useUserSlice((state) => state.setUserInfo)
  const setToken = useUserSlice((state) => state.setToken)
  const onLogout = useUserSlice((state) => state.logout)
  const setLogout = useOrderSlice((state) => state.setLogOut)
  const device_id = useUserSlice((state) => state.deviceId)

  const removeDeviceFromUser = async () => {
    if (!device_id) return

    try {
      await notificationAPI.logoutFromDevice({ device_id })
    } catch (error) {}
  }

  const loginSuccess = async ({ refresh_token, token }: LoginPasswordRes) => {
    try {
      const res = await userAPI.getUserInfo(token)
      if (res.result?.data?.info_customer?.account_type === 'th') {
        showMessage({ message: 'Tài khoản của bạn không đủ quyền để đăng nhập', type: 'warning' })
        return
      }

      const user = res?.result?.data?.info_customer
      if (user?.id) {
        setUserInfo(user)
        setToken({ refresh_token, token })
      }
    } catch (error) {}
  }

  const loginPassword = (data: LoginPassword) => {
    asyncHandler({
      fetcher: userAPI.loginPassword(data),
      onSuccess: async (tokenData) => {
        await loginSuccess(tokenData)
      },
      config: { showSuccessMsg: false },
    })
  }

  const loginWithOTP = async (firebase_access_token: string) => {
    asyncHandler({
      fetcher: userAPI.loginWithThirdParty({ firebase_access_token, type: 'firebase' }),
      onSuccess: async (data) => {
        await loginSuccess(data)
      },
      config: { showSuccessMsg: false },
    })
  }

  const logout = async () => {
    onLogout()
    setLogout()
    mutate(SwrKey.notification_count, 0, false)
    ;(cache as any)?.clear?.()
    await removeDeviceFromUser()
  }

  return {
    loginPassword,
    loginWithOTP,
    loginSuccess,
    logout,
  }
}
