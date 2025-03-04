import { type PopupProps } from '@/components'

export interface IdAndName<T extends number | string = number> {
  id: T
  name: string
}

export interface NameAndValue<T extends string = string> {
  name: string
  value: T
}

export interface IdAndQty {
  id: number
  qty: number
}

export type ForwardModalRef = {
  onClose: () => void
  onOpen: () => void
}

export interface LngLat {
  longitude: number
  latitude: number
}

export type IconProps = {
  fill?: string
  size?: number
}

export type DateRange<T extends Date | string = string> = {
  fromDate: T
  toDate: T
}

export interface IconType {
  id: number
  url: string
  name?: string
  data_type?: string
}

export interface URLRes {
  id: number
  url: string
  image_url?: string
  name: string
  data_type: string
}

export interface ValueId {
  value_id: number
  value_name: string
}

export interface TimeValue {
  time_value: number
  time_type: string
}

export interface Option<T extends string | number> {
  value: T
  label: string
}

export type IconCloudStorageId = {
  id: number
  url: string
  image_url: string
  name: string
  data_type: string
}

export interface AttachmentUrlRes {
  attachment_id: number
  attachment_url: string
}

export type AttachmentRes = IconCloudStorageId

export type AttachmentType =
  | 'image/png'
  | 'image/jpeg'
  | 'video/mp4'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'application/octet-stream'
  | 'application/x-zip-compressed'

export type RatingAttachmentReq = { file: string; type: AttachmentType }

export interface CreateAttachmentReq {
  attachments: RatingAttachmentReq[]
}

export type ImageCloudStorage = {
  data_type: string
  id: number
  image_id: number
  image_model: string
  image_url: string
  name: string
  url: string
}

export type VisibleAction = {
  close: () => void
  open: () => void
}

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>

export type RequiredExceptFor<T, TOptional extends keyof T> = Required<Omit<T, TOptional>> & Partial<Pick<T, TOptional>>

export type PopupState = Pick<
  PopupProps,
  'visible' | 'message' | 'description' | 'cancelBtnText' | 'confirmBtnText' | 'onCancel' | 'onConfirm'
>

export type ToastProps = {
  type?: 'warning' | 'danger' | 'success'
  position?: 'top' | 'bottom'
  message?: string
  duration?: number
  description?: string
}

export type ToastState = OptionalExceptFor<Required<ToastProps>, 'message'>
