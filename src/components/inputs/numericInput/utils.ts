/* eslint-disable no-useless-escape */
import { AddSignPrefixAndSuffixOptions, FormatNumberOptions } from './types'

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

export const addSignPrefixAndSuffix = (value: string, options: AddSignPrefixAndSuffixOptions) => {
  const { prefix, sign, suffix, signPosition } = options

  if (signPosition === 'beforePrefix') {
    return `${sign}${prefix}${value}${suffix}`
  } else {
    return `${prefix}${sign}${value}${suffix}`
  }
}

export const formatNumber = (input: number, options?: FormatNumberOptions) => {
  const {
    precision = 0,
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
    buffer.unshift(number.slice(Math.max(0, number.length - 3)))
    number = number.slice(0, -3)
  }

  let formattedNumber = ''
  formattedNumber = buffer.join(delimiter)
  const decimals = parts[1]

  if (currentDecimals) {
    formattedNumber += currentDecimals
  } else if (!!precision && decimals) {
    formattedNumber += separator + decimals.slice(0, precision)
  }

  return addSignPrefixAndSuffix(formattedNumber, {
    prefix,
    suffix,
    sign,
    signPosition,
  })
}
