interface FormatNumberOptions {
  precision?: number
  separator?: string
  delimiter?: string
  ignoreNegative?: boolean
  prefix?: string
  suffix?: string
  currentDecimals?: string
  showPositiveSign?: boolean
  signPosition?: 'beforePrefix' | 'afterPrefix'
}

export const removePrefixAndSuffix = (text: string, { prefix, suffix }: { prefix?: string; suffix?: string }) => {
  let result = text

  if (prefix) {
    const prefixRegex = new RegExp('^' + prefix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$'))
    result = text.replace(prefixRegex, '')
  }

  if (suffix) {
    const suffixRegex = new RegExp(suffix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$') + '$')
    result = result.replace(suffixRegex, '')
  }

  return result
}

interface AddSignPrefixAndSuffixProps {
  sign?: '+' | '-' | ''
  prefix?: string
  suffix?: string
  signPosition: 'beforePrefix' | 'afterPrefix'
}

export const addSignPrefixAndSuffix = (value: any, options: AddSignPrefixAndSuffixProps) => {
  const { prefix, sign, suffix, signPosition } = options

  switch (signPosition) {
    case 'beforePrefix':
      return `${sign}${prefix}${value}${suffix}`
    case 'afterPrefix':
      return `${prefix}${sign}${value}${suffix}`
  }
}

export const formatNumber = (input: number, options?: FormatNumberOptions) => {
  const {
    precision,
    separator = '.',
    delimiter = ',',
    prefix = '',
    suffix = '',
    ignoreNegative,
    currentDecimals,
    showPositiveSign,
    signPosition = 'afterPrefix',
  } = options || {}

  const negative = ignoreNegative ? false : Object.is(input, -0) || input < 0
  const sign = negative ? '-' : showPositiveSign ? '+' : ''
  const string = Math.abs(input).toString()
  const parts = string.split('.')
  const buffer: string[] = []

  let number = parts[0]
  while (number.length > 0) {
    buffer.unshift(number.substr(Math.max(0, number.length - 3), 3))
    number = number.substr(0, number.length - 3)
  }

  let formattedNumber = ''
  formattedNumber = buffer.join(delimiter)
  const decimals = parts[1]
  if (currentDecimals) {
    formattedNumber += currentDecimals
  } else if (!!precision && decimals) {
    formattedNumber += separator + decimals
  }

  return addSignPrefixAndSuffix(formattedNumber, {
    prefix,
    suffix,
    sign,
    signPosition,
  })
}
