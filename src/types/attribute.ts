import { AttachmentUrlRes, IconCloudStorageId, IconType, IdAndName, Option } from './core'
import { QueryList } from './http'

export type GetAttributeListSortBy = 'create_date_increase' | 'create_date_decrease' | 'name_increase' | 'name_decrease'

export type AttributeDisplayType = 'radio' | 'select' | 'color'
export type AttributeViewPosition = 'disable' | 'all' | 'home' | 'product'
export type AttributeViewStyle = 'text_only' | 'image_only' | 'text_image'

export type AttributeMinorViewState = AttributeViewPosition
export type AttributeMinorViewStyle = AttributeViewStyle

export enum AttributeMinorViewStateEnum {
  disable = 'disable',
  all = 'all',
  home = 'home',
  product = 'product',
}

export enum AttributeMinorViewStyleEnum {
  text_only = 'text_only',
  image_only = 'image_only',
  text_image = 'text_image',
}

export interface GetListAttributeMinorParams extends QueryList {
  attribute_parent_id?: number
  view_state?: 'home' | 'product'
}

export interface AttributeMinor {
  attribute_id: number
  attribute_name: string
  attribute_icon: IconType
  sequence: number
  value_ids: AttributeMinorValue[]
  filterable: boolean
  visible_in_list_view: boolean
  view_state: AttributeMinorViewState
  view_style: AttributeMinorViewStyle
  icon_cloud_storage_id: IconCloudStorageId
}

export interface AttributeMinorValue {
  value_id: number
  code: string
  value_name: string
  value_icon: IconType
}

export interface VisceraAttribute extends AttributeMinorValue {}

export interface VisceraAttributeRes extends AttributeMinor {
  value_ids: VisceraAttribute[]
}

export interface AttributeReq {
  attribute_id: number
  attribute_value_ids: Array<number>
}

export enum AttributeDisplayTypeEnum {
  radio = 'radio',
  select = 'select',
  color = 'color',
}

export enum AttributeViewPositionEnum {
  disable = 'disable',
  all = 'all',
  home = 'home',
  product = 'product',
}

export enum AttributeViewStyleEnum {
  text_only = 'text_only',
  image_only = 'image_only',
  text_image = 'text_image',
}

export interface CreateAttributeReq {
  attribute_name: string
  display_type?: AttributeDisplayType
  view_position?: AttributeViewPosition
  view_style?: AttributeViewStyle
  icon_cloud_storage_id?: number
}

export type CreateAttributeValue = Pick<CreateAttributeValueReq, 'value_name'> & {
  icon_cloud_storage_id?: AttachmentUrlRes
}

export type UpdateAttributeValue = CreateAttributeValue & AttributeValueId

export type CreateAttributeForm = Pick<CreateAttributeReq, 'attribute_name'> & {
  display_type?: Option<AttributeDisplayType>
  view_position?: Option<AttributeViewPosition>
  view_style?: Option<AttributeViewStyle>
  icon_cloud_storage_id: AttachmentUrlRes
  values?: CreateAttributeValue[]
}

export type UpdateAttributeReq = Partial<CreateAttributeReq> & AttributeId

export type UpdateAttributeForm = Partial<CreateAttributeForm> & AttributeId

export interface CreateAttributeValueReq {
  attribute_id: number
  value_name: string
  icon_cloud_storage_id?: number
}

export type CreateAttributeValueForm = CreateAttributeValue & {
  attribute_id: IdAndName<number>
}

export type AttributeValueId = {
  attribute_value_id: number
}

export type UpdateAttributeValueReq = Partial<CreateAttributeValueReq> & AttributeValueId

export type UpdateAttributeValueForm = Partial<CreateAttributeValueForm> & AttributeValueId

export type GetAttributeListReq = QueryList & {
  attribute_name?: string
  sort_by?: GetAttributeListSortBy
}

export type getAttributeValueListReq = QueryList &
  AttributeId & {
    value_name?: string
    sort_by?: GetAttributeListSortBy
  }

export type AttributeId = {
  attribute_id: number
}

export type AttributeRes = {
  attribute_id: number
  attribute_name: string
  display_type: AttributeDisplayType
  view_position: AttributeViewPosition
  view_style: AttributeViewStyle
  icon_cloud_storage_id: IconCloudStorageId
}

export type AttributeDetailRes = AttributeRes & {
  value_ids: AttributeValueRes[]
}

export type AttributeValueRes = {
  value_id: number
  value_name: string
  icon_cloud_storage_id: IconCloudStorageId
}

export type AttributeValueDetailRes = AttributeValueRes

export type DeleteAttributeReq = {
  attribute_ids: number[]
}

export type DeleteAttributeValueReq = {
  attribute_value_ids: number[]
}

export type CreateAttributeMinorReq = {
  attribute_name: string
  view_state?: AttributeMinorViewState
  view_style?: AttributeMinorViewStyle
  icon_cloud_storage_id?: number
  filterable?: boolean
}

export type UpdateAttributeMinorReq = CreateAttributeMinorReq & AttributeId

export type CreateAttributeMinorForm = Pick<CreateAttributeMinorReq, 'attribute_name' | 'filterable'> & {
  view_state?: Option<AttributeMinorViewState>
  view_style?: Option<AttributeMinorViewStyle>
  icon_cloud_storage_id?: AttachmentUrlRes
}

export type UpdateAttributeMinorForm = CreateAttributeMinorForm & AttributeId

export type CreateAttributeMinorValueReq = AttributeId & {
  value_name: string
  icon_cloud_storage_id?: number
}

export type CreateAttributeMinorValueForm = Omit<CreateAttributeMinorValueReq, 'icon_cloud_storage_id'> & {
  icon_cloud_storage_id?: AttachmentUrlRes
}

export type CreateAttributeMinorValue = Omit<CreateAttributeMinorValueForm, 'attribute_id'>

export type UpdateAttributeMinorValueReq = CreateAttributeMinorValueReq & AttributeValueId

export type UpdateAttributeMinorValueForm = CreateAttributeMinorValueForm & AttributeValueId

export type DeleteAttributeMinorValueReq = DeleteAttributeValueReq

export type DeleteAttributeMinorReq = DeleteAttributeReq

export type AttributeMinorDetail = AttributeMinor & {}

export type GetAttributeMinorListReq = QueryList & {
  sort_by?: GetAttributeListSortBy
  attribute_name?: string
}

export type GetAttributeMinorValueListReq = AttributeId &
  QueryList & {
    sort_by?: GetAttributeListSortBy
    value_name?: string
  }
