import { useUserSlice } from '@/store'
import { CreateAddressForm } from '@/types'

export const delay = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

export function checkAnyKeyInObjectHasValue(object: Object) {
  return Object.values(object).some((value) => value !== '' && value !== null && value !== undefined)
}

export function checkEveryKeyInObjectHasValue(object: Object) {
  return Object.values(object).every((value) => value !== '' && value !== null && value !== undefined)
}

export function removeEmptyValueFromObject<T extends Object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== '')) as T
}

export const getShortName = (text: string) => {
  let shortName = ''
  if (text && text !== '') {
    const arr = text.split(' ')
    if (arr && arr.length > 0) {
      if (arr.length <= 1) {
        shortName = arr[0].substring(0, 1)
      } else {
        shortName = arr[arr.length - 2].substring(0, 1) + arr[arr.length - 1].substring(0, 1)
      }
    }
  }
  if (shortName !== '') {
    shortName = shortName.toUpperCase()
  }

  return shortName
}

export const getRandomColor = (text: string) => {
  const colors = ['#2979FF', '#FC625D', '#22C993', '#2979FF', '#FDBD41']
  const shortName = getShortName(text)
  let bgColor = '#0279C7'

  if (!colors || colors.length === 0) {
    return bgColor
  }

  const charCodeShortName = shortName !== '' ? shortName.substring(0, 1).charCodeAt(0) : 0
  switch (true) {
    case charCodeShortName >= 65 && charCodeShortName < 70 && colors[0] !== undefined:
      bgColor = colors[0]
      break
    case charCodeShortName >= 70 && charCodeShortName < 75 && colors[1] !== undefined:
      bgColor = colors[1]
      break
    case charCodeShortName >= 75 && charCodeShortName < 80 && colors[2] !== undefined:
      bgColor = colors[2]
      break
    case charCodeShortName >= 80 && charCodeShortName < 85 && colors[3] !== undefined:
      bgColor = colors[3]
      break
    case charCodeShortName >= 85 && charCodeShortName <= 90 && colors[4] !== undefined:
      bgColor = colors[4]
      break
    default:
      bgColor = colors[0] !== undefined ? colors[0] : bgColor
      break
  }
  return bgColor
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !Number.isNaN(Number(value))
}

export const isUnknownDataTruethy = (data: any): boolean => {
  if (isArray(data)) {
    return data?.length > 0
  } else if (isObject(data)) {
    return Object.keys(data || {})?.length > 0
  }

  return !!data
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}

export function isObject<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function formatMoneyVND(num: number | string, prefix = ' ₫'): string {
  if (typeof num === 'number') {
    num = Math.floor(num)
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${prefix ? `${prefix}` : ''}`
  } else if (typeof num === 'string') {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${prefix ? ` ${prefix}` : ''}`
  }

  return num
}

export const toImageUrl = (url: string | undefined | null) => {
  if (!url) return ''

  if (url?.includes?.('https://') || url?.includes?.('http://')) return url
  return `${useUserSlice.getState().domain}${url}`
}

export const convertViToEn = (str: string) => {
  if (!str) return ''

  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư

  return str
}

export const normalizeViString = (value: string) => (!value ? '' : convertViToEn(value).trim().toLowerCase())

export const getAddressFormLabel = (data?: CreateAddressForm) => {
  return [data?.street, data?.ward_name, data?.district_name, data?.state_name].filter(Boolean).join(', ')
}
