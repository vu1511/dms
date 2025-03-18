import { QueryList } from './http'

export interface CreateDeviceIdentityReq {
  device_id: string
}

export interface CreateDeviceIdentityRes {}

export interface LoginDeviceReq {
  device_id: string
}

export type LogoutDeviceReq = LoginDeviceReq

export interface LoginDeviceRes {}

export interface GetNotificationsReq extends QueryList {}

export type NotificationModel = 'sale.order'

export type NotificationType = 'sale_confirmed'

export interface NotificationRes {
  notification_id: number
  notification_title: string
  notification_content: string
  read_notification: boolean
  extra_data: {
    model: NotificationModel
    record_id: number
    notification: NotificationType
  }
}

export interface NotificationAdditionalRes {
  model: NotificationModel
  notification: string
  notification_id: number
  record_id: number
}

export interface ReadNotificationReq {
  notification_ids: number[]
}

export type DeleteNotificationReq = ReadNotificationReq
