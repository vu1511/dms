export function isAsyncFunction(fn: unknown): boolean {
  return typeof fn === 'function' && fn() instanceof Promise
}

export const sleep = (delay: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, delay)
  )

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
    let arr = text.split(' ')
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
  let arr_color = ['#2979FF', '#FC625D', '#22C993', '#2979FF', '#FDBD41']
  let shortName = getShortName(text)
  let bgColor = '#0279C7'

  if (!arr_color || arr_color.length === 0) {
    return bgColor
  }

  const charCodeShortName = shortName !== '' ? shortName.substring(0, 1).charCodeAt(0) : 0
  switch (true) {
    case charCodeShortName >= 65 && charCodeShortName < 70 && arr_color[0] !== undefined:
      bgColor = arr_color[0]
      break
    case charCodeShortName >= 70 && charCodeShortName < 75 && arr_color[1] !== undefined:
      bgColor = arr_color[1]
      break
    case charCodeShortName >= 75 && charCodeShortName < 80 && arr_color[2] !== undefined:
      bgColor = arr_color[2]
      break
    case charCodeShortName >= 80 && charCodeShortName < 85 && arr_color[3] !== undefined:
      bgColor = arr_color[3]
      break
    case charCodeShortName >= 85 && charCodeShortName <= 90 && arr_color[4] !== undefined:
      bgColor = arr_color[4]
      break
    default:
      bgColor = arr_color[0] !== undefined ? arr_color[0] : bgColor
      break
  }
  return bgColor
}
