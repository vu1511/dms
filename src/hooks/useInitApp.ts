// import { useNotification } from '@/hooks'
import { SwrKey } from '@/constants'
import { notificationAPI, userAPI } from '@/services'
import { useUserSlice } from '@/store'
import { UserInfo } from '@/types'
import { useEffect } from 'react'
// import { NotificationClickEvent, NotificationWillDisplayEvent, OneSignal } from 'react-native-onesignal'
import useSWR, { useSWRConfig } from 'swr'

export const useInitApp = () => {
  const { mutate } = useSWRConfig()
  const token = useUserSlice((state) => state.token)
  const setUserInfo = useUserSlice((state) => state.setUserInfo)
  const setDeviceId = useUserSlice((state) => state.setDeviceId)
  // const { navigateFromNotification, requestNotificationPermission } = useNotification()

  useSWR(
    token ? SwrKey.notification_count : null,
    () =>
      notificationAPI
        .getNotificationUnreadCount()
        .then((res) => res.data?.unread_notification || 0)
        .catch(() => 0),
    {
      revalidateOnFocus: true,
    }
  )

  useSWR<UserInfo | undefined>(token ? SwrKey.userInfo : null, () =>
    userAPI
      .getUserInfo()
      .then((res) => {
        const user = res?.result?.data?.info_customer
        if (user?.id) {
          setUserInfo(user)
        }
        return user
      })
      .catch(() => undefined)
  )

  useEffect(() => {
    // requestNotificationPermission()
    // OneSignal.initialize(process.env.EXPO_PUBLIC_ONE_SIGNAL_ID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (!token) return

  //   const onNotificationOpened = (data: NotificationClickEvent) => {
  //     const additionalData = data.notification?.additionalData as NotificationAdditionalRes
  //     if (!additionalData) return

  //     if (navigationRef?.isReady()) {
  //       navigateFromNotification({
  //         navigation: navigationRef as any,
  //         notification: additionalData as NotificationAdditionalRes,
  //         shouldFetch: true,
  //       })
  //     } else {
  //       AsyncStorage.setItem(AsyncStorageKeys.NOTIFICATION_OPENED, JSON.stringify(additionalData))
  //     }
  //   }

  //   const onReceivedNotification = (event: NotificationWillDisplayEvent) => {
  //     const notification = event.getNotification()
  //     notification.display()
  //     mutate(SwrKey.notification_count)
  //     mutate(SwrKey.notifications)
  //   }

  //   loginToDevice()

  //   OneSignal.Notifications.addEventListener('foregroundWillDisplay', onReceivedNotification)
  //   OneSignal.Notifications.addEventListener('click', onNotificationOpened)

  //   // eslint-disable-next-line consistent-return
  //   return () => {
  //     OneSignal.Notifications.removeEventListener('click', onNotificationOpened)
  //     OneSignal.Notifications.removeEventListener('foregroundWillDisplay', onReceivedNotification)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token])

  // const loginToDevice = async () => {
  //   try {
  //     const deviceId = await OneSignal.User.getExternalId()
  //     if (deviceId) {
  //       setDeviceId(deviceId)
  //       await notificationAPI.loginToDevice({ device_id: deviceId })
  //     }
  //     // eslint-disable-next-line no-empty
  //   } catch (e) {}
  // }

  const navigationReadyhandler = async () => {
    // try {
    // const storedData = await CoreStorage.getItem(CoreStorage.Keys.NOTIFICATION_OPENED)
    //   if (storedData) {
    //     const data: NotificationAdditionalRes = JSON.parse(storedData)
    //     if (data?.model) {
    //       navigateFromNotification({
    //         navigation: navigationRef as any,
    //         notification: data,
    //         shouldFetch: true,
    //       })
    //     }
    // CoreStorage.removeItem(CoreStorage.Keys.NOTIFICATION_OPENED)
    //   }
    //   // eslint-disable-next-line no-empty
    // } catch (error) {}
  }

  return { navigationReadyhandler }
}
