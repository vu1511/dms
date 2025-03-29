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

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Required<Pick<T, TRequired>>

export type RequiredExceptFor<T, TOptional extends keyof T> = Required<Omit<T, TOptional>> & Partial<Pick<T, TOptional>>

export type PopupState = OptionalExceptFor<
  Pick<
    PopupProps,
    | 'visible'
    | 'message'
    | 'description'
    | 'cancelBtnText'
    | 'confirmBtnText'
    | 'onCancel'
    | 'onConfirm'
    | 'cancelBtnProps'
    | 'confirmBtnProps'
  >,
  'visible'
>

export type ToastProps = {
  type?: 'warning' | 'danger' | 'success' | 'info'
  position?: 'top' | 'bottom'
  message?: string
  duration?: number
  description?: string
}

export type ToastOptions = OptionalExceptFor<Required<ToastProps>, 'message'>

export enum ETimePeriod {
  All = 'all',
  Today = 'today',
  Yesterday = 'yesterday',
  ThisWeek = 'this_week',
  LastWeek = 'last_week',
  ThisMonth = 'this_month',
  LastMonth = 'last_month',
  ThisQuarter = 'this_quarter',
  LastQuarter = 'last_quarter',
  ThisYear = 'this_year',
  LastYear = 'last_year',
}

export const DefaultMonthTime: Option<ETimePeriod> = {
  label: 'Tháng này',
  value: ETimePeriod.ThisMonth,
} as const

export const timePeriodOptions: Option<ETimePeriod>[] = [
  {
    label: 'Tất cả',
    value: ETimePeriod.All,
  },
  {
    label: 'Hôm nay',
    value: ETimePeriod.Today,
  },
  {
    label: 'Hôm qua',
    value: ETimePeriod.Yesterday,
  },
  {
    label: 'Tuần này',
    value: ETimePeriod.ThisWeek,
  },
  {
    label: 'Tuần trước',
    value: ETimePeriod.LastWeek,
  },
  {
    label: 'Tháng này',
    value: ETimePeriod.ThisMonth,
  },
  {
    label: 'Tháng trước',
    value: ETimePeriod.LastMonth,
  },
  {
    label: 'Quý này',
    value: ETimePeriod.ThisQuarter,
  },
  {
    label: 'Quý trước',
    value: ETimePeriod.LastQuarter,
  },
  {
    label: 'Năm này',
    value: ETimePeriod.ThisYear,
  },
  {
    label: 'Năm trước',
    value: ETimePeriod.LastYear,
  },
] as const

export type ImagePickerResult = {
  uri: string
  base64?: string
  size: number
  width: number
  height: number
  mime: string
}

export type ImagePickerOptions = {
  cropping?: boolean
  multiple?: boolean
  selectionLimit?: number
  includeBase64?: boolean
  cropperToolbarTitle?: string
  compressImageQuality?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
}
