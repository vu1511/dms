import moment from 'moment'

export const fromDDMMYYYYToDate = (date: string | undefined): Date | null => {
  if (!date) {
    return null
  }

  const [day, month, year] = date.split('-')
  if (!day || !month || !year) {
    return null
  }

  return moment(`${year}-${month}-${day}`).toDate()
}
