import { DateRange } from '@/types'
import dayjs from 'dayjs'

export const fromDDMMYYYYToDate = (date: string | undefined): Date | null => {
  if (!date) {
    return null
  }

  const [day, month, year] = date.split('-')
  if (!day || !month || !year) {
    return null
  }

  return dayjs(`${year}-${month}-${day}`).toDate()
}

export const reverseDateFormat = (date: string) => date.split('-').reverse().join('-')

export const getDateRangeLabel = (value: DateRange) => {
  if (!value?.fromDate || !value?.toDate) {
    return ''
  }

  return `${dayjs(value?.fromDate).format('DD/MM/YYYY')} -> ${dayjs(value?.toDate).format('DD/MM/YYYY')}`
}

export const formatDate = (
  date: string | number | Date,
  format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'DD-MM-YYYY' | 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm:ss'
): string => {
  return dayjs(date).format(format)
}
