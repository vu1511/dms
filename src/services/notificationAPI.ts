import {
  CreateDeviceIdentityReq,
  CreateDeviceIdentityRes,
  DeleteNotificationReq,
  GetNotificationsReq,
  HTTPListResponsePromiseV2,
  HTTPResponsePromiseV2,
  LoginDeviceReq,
  LoginDeviceRes,
  LogoutDeviceReq,
  NotificationRes,
  ReadNotificationReq,
} from '@/types'
import { axiosInstance } from './axiosInstance'

export const notificationAPI = {
  createDeviceIdentity: (params: CreateDeviceIdentityReq): HTTPResponsePromiseV2<CreateDeviceIdentityRes> => {
    return axiosInstance.get('/push_notification/create_device_identity', {
      params,
    })
  },
  loginToDevice: (params: LoginDeviceReq): HTTPResponsePromiseV2<LoginDeviceRes> => {
    return axiosInstance.get('/push_notification/login_device_for_partner', {
      params,
    })
  },
  logoutFromDevice: (params: LogoutDeviceReq): HTTPResponsePromiseV2<any> => {
    return axiosInstance.get('/push_notification/logout_device_for_partner', {
      params,
    })
  },
  getNotificationUnreadCount: (): HTTPResponsePromiseV2<{
    unread_notification: number
  }> => {
    return axiosInstance.get('/push_notification/count_unread_notification', {
      params: {},
    })
  },
  getNotifications: (params: GetNotificationsReq): HTTPListResponsePromiseV2<NotificationRes[]> => {
    return axiosInstance.get('/push_notification/list_notification', {
      params,
    })
  },
  readNotification: ({ notification_ids }: ReadNotificationReq): HTTPResponsePromiseV2<any> => {
    return axiosInstance.get('/push_notification/read_notification', {
      params: { notification_ids: `[${notification_ids.join(', ')}]` },
    })
  },
  readAllNotification: (): HTTPResponsePromiseV2<any> => {
    return axiosInstance.get('/push_notification/read_all_notification', {
      params: {},
    })
  },
  deleteNotification: ({ notification_ids }: DeleteNotificationReq): HTTPResponsePromiseV2<any> => {
    return axiosInstance.get('/push_notification/delete_notification', {
      params: { notification_ids: `[${notification_ids.join(', ')}]` },
    })
  },
  deleteAllNotifications: (): HTTPResponsePromiseV2<any> => {
    return axiosInstance.get('/push_notification/delete_all_notificaton')
  },
}
