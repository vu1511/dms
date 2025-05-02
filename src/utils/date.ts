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
