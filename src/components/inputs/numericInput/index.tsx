import { forwardRef, useCallback, useMemo, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { addSignPrefixAndSuffix, formatNumber } from './utils'

export interface NumericInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onChange'> {
  onChangeValue?(value: number | null): void
  renderTextInput?: (props: TextInputProps) => JSX.Element
  delimiter?: string
  maxValue?: number
  minValue?: number
  precision?: number
  separator?: string
  prefix?: string
  suffix?: string
  value: number | null
  showPositiveSign?: boolean
  signPosition?: 'beforePrefix' | 'afterPrefix'
}

const NumericInput = forwardRef<TextInput, NumericInputProps>((props, ref) => {
  const {
    renderTextInput,
    value,
    onChangeValue,
    separator,
    delimiter = ',',
    prefix = '',
    suffix = '',
    precision = 0,
    maxValue = 999999999999,
    minValue,
    signPosition = 'afterPrefix',
    showPositiveSign,
    ...rest
  } = props

  const [startingWithSign, setStartingWithSign] = useState<'-' | '+'>()

  const noNegativeValues = typeof minValue === 'number' && minValue >= 0
  const noPositiveValues = typeof maxValue === 'number' && maxValue <= 0

  const formattedValue = useMemo(() => {
    if (!!value || value === 0 || value === -0) {
      return formatNumber(value, {
        separator,
        prefix,
        suffix,
        precision,
        delimiter,
        ignoreNegative: noNegativeValues,
        signPosition,
        showPositiveSign,
      })
    } else {
      return ''
    }
  }, [value, separator, prefix, suffix, precision, delimiter, noNegativeValues, signPosition, showPositiveSign])

  const handleChangeText = useCallback(
    (text: string) => {
      let textWithoutPrefix = text

      if (prefix) {
        textWithoutPrefix = text.replace(prefix, '')
        if (textWithoutPrefix === text) {
          textWithoutPrefix = text.replace(prefix.slice(0, -1), '')
        }
      }

      let textWithoutPrefixAndSufix = textWithoutPrefix
      if (suffix) {
        const suffixRegex = new RegExp(`${suffix}([^${suffix}]*)$`)
        textWithoutPrefixAndSufix = textWithoutPrefix.replace(suffixRegex, '')

        if (textWithoutPrefixAndSufix === textWithoutPrefix) {
          textWithoutPrefixAndSufix = textWithoutPrefix.replace(suffix.slice(1), '')
        }
      }

      // Starting with a minus or plus sign
      if (/^(-|-0)$/.test(text) && !noNegativeValues) {
        setStartingWithSign('-')
        return
      } else if (/^(\+|\+0)$/.test(text) && !noPositiveValues) {
        setStartingWithSign('+')
      } else {
        setStartingWithSign(undefined)
      }

      const isNegativeValue = textWithoutPrefixAndSufix.includes('-')

      const textNumericValue = textWithoutPrefixAndSufix.replace(/\D+/g, '')

      const numberValue = Number(textNumericValue) * (isNegativeValue ? -1 : 1)

      const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length

      let newValue: number | null

      if (!textNumericValue || (!numberValue && zerosOnValue === precision)) {
        // Allow to clean the value instead of beign 0
        newValue = null
      } else {
        newValue = numberValue / 10 ** precision
      }

      if (newValue && maxValue && newValue > maxValue) {
        onChangeValue && onChangeValue(maxValue)
        return
      } else if (newValue && minValue && newValue < minValue) {
        return
      }

      onChangeValue && onChangeValue(newValue)
    },
    [
      suffix,
      prefix,
      noNegativeValues,
      noPositiveValues,
      precision,
      maxValue,
      minValue,
      onChangeValue,
      formattedValue,
      signPosition,
    ]
  )

  const textInputValue = useMemo(() => {
    return startingWithSign
      ? addSignPrefixAndSuffix(formattedValue, {
          prefix,
          suffix,
          sign: startingWithSign,
          signPosition,
        })
      : formattedValue
  }, [formattedValue, prefix, signPosition, startingWithSign, suffix])

  const nextProps = useMemo(() => {
    return {
      ref: ref,
      keyboardType: 'numeric' as const,
      selection: suffix ? { start: Math.max(textInputValue.length - suffix.length, 0) } : props?.selection,
      ...rest,
      value: textInputValue,
      onChangeText: handleChangeText,
    }
  }, [handleChangeText, props?.selection, ref, rest, suffix, textInputValue])

  if (renderTextInput) {
    return renderTextInput(nextProps)
  }

  return <TextInput {...nextProps} />
})

export default NumericInput
