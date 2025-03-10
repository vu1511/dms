import { forwardRef, useCallback, useMemo, useState } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from 'react-native'
import { addSignPrefixAndSuffix, formatNumber, removePrefixAndSuffix } from './utils'

export type NumericInputProps = Omit<TextInputProps, 'value' | 'defaultValue' | 'onChangeText' | 'onChange'> & {
  onMinValueReached?(value: number): void
  onMaxValueReached?(value: number): void
  onChangeValue(value: number | null): void
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
    onBlur,
    onChangeValue,
    renderTextInput,
    onMinValueReached,
    onMaxValueReached,
    value,
    separator = '.',
    delimiter = ',',
    prefix = '',
    suffix = '',
    precision = 3,
    maxValue = 999999999999,
    minValue,
    signPosition = 'afterPrefix',
    showPositiveSign,
    ...rest
  } = props

  const [startingWithSign, setStartingWithSign] = useState<'-' | '+'>()
  const [currentDecimals, setCurrentDecimals] = useState('')

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
        currentDecimals,
        showPositiveSign,
      })
    } else {
      return ''
    }
  }, [
    value,
    separator,
    prefix,
    suffix,
    precision,
    delimiter,
    noNegativeValues,
    signPosition,
    showPositiveSign,
    currentDecimals,
  ])

  const handleChangeText = useCallback(
    (text: string) => {
      let cleanedText = removePrefixAndSuffix(text, { prefix, suffix })

      if (/^-$/.test(text) && !noNegativeValues) {
        setStartingWithSign('-')
      } else if (/^\+$/.test(text) && !noPositiveValues) {
        setStartingWithSign('+')
      } else {
        setStartingWithSign(undefined)
      }

      if (precision > 0) {
        const lastChar = cleanedText?.[cleanedText?.length - 1]

        if (lastChar === ',' || lastChar === '.') {
          cleanedText = cleanedText.slice(0, -1) + separator
        }

        const cleanedTextParts = cleanedText.split(separator)

        if (cleanedTextParts.length > 2) {
          return
        }

        if (cleanedText.length > 1 && cleanedTextParts.length === 2) {
          const [integers, decimals] = cleanedTextParts
          const textNumericDecimals = decimals.replace(/\D/g, '')

          if (!textNumericDecimals) {
            setCurrentDecimals(`${separator}`)
            return
          }

          const tempValue = Number(`${integers}.${textNumericDecimals}`)

          if (typeof maxValue === 'number' && tempValue > maxValue) {
            onMaxValueReached?.(maxValue)
            return
          }

          if (textNumericDecimals.length > precision) {
            return
          }

          setCurrentDecimals(`${separator}${textNumericDecimals}`)
        } else {
          setCurrentDecimals('')
        }
      }

      const isNegativeValue = cleanedText.includes('-')
      const textNumericValueRegex = new RegExp(`[^0-9\\${separator}]`, 'g')
      const textNumericValue = cleanedText.replace(textNumericValueRegex, '').replace(separator, '.')
      const numberValue = Number(textNumericValue) * (isNegativeValue ? -1 : 1)

      let newValue: number | null = numberValue

      if (!textNumericValue || Number.isNaN(numberValue)) {
        newValue = null
      }

      if (typeof newValue === 'number' && typeof maxValue === 'number' && newValue > maxValue) {
        onMaxValueReached?.(maxValue)
        return
      } else if (typeof newValue === 'number' && typeof minValue === 'number' && newValue < minValue) {
        onMinValueReached?.(minValue)
        return
      }

      onChangeValue?.(newValue)
    },
    [
      suffix,
      prefix,
      noNegativeValues,
      noPositiveValues,
      precision,
      maxValue,
      separator,
      minValue,
      onChangeValue,
      onMaxValueReached,
      onMinValueReached,
    ]
  )

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setCurrentDecimals('')
      setStartingWithSign(undefined)
      onBlur?.(e)
    },
    [onBlur]
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

  const nextProps = useMemo<TextInputProps>(
    () => ({
      keyboardType: 'numeric',
      selection: suffix ? { start: Math.max(textInputValue.length - suffix.length, 0) } : props?.selection,
      ...rest,
      ref: ref,
      value: textInputValue,
      onBlur: handleBlur,
      onChangeText: handleChangeText,
    }),
    [handleChangeText, handleBlur, props?.selection, ref, rest, suffix, textInputValue]
  )

  if (renderTextInput) {
    return renderTextInput(nextProps)
  }

  return <TextInput testID="numeric-input" {...nextProps} />
})

export default NumericInput
