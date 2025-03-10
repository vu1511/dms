import React from 'react'
import { TextInput } from 'react-native'

interface NumericInputV2Props {
  value: number
  onChange: (value: number) => void
  decimalPlaces?: number
  minValue?: number
  maxValue?: number
}

const NumericInputV2: React.FC<NumericInputV2Props> = ({ value, onChange, decimalPlaces = 2, minValue, maxValue }) => {
  const handleChange = (inputValue: string) => {
    // Allow only numbers, dots, and commas
    inputValue = inputValue.replace(/[^0-9.,]/g, '')

    // Convert comma to dot (for decimal consistency)
    inputValue = inputValue.replace(/,/g, '.')

    // Prevent multiple dots
    const dotCount = (inputValue.match(/\./g) || []).length
    if (dotCount > 1) {
      inputValue = inputValue.replace(/\.+$/, '')
    }

    // Convert to number
    let numericValue = parseFloat(inputValue)

    if (!isNaN(numericValue)) {
      // Limit decimal places
      numericValue = parseFloat(numericValue.toFixed(decimalPlaces))

      // Apply min/max constraints
      if (minValue !== undefined && numericValue < minValue) {
        numericValue = minValue
      }
      if (maxValue !== undefined && numericValue > maxValue) {
        numericValue = maxValue
      }

      onChange(numericValue)
    } else {
      onChange(0) // Default to 0 if input is empty or invalid
    }
  }

  return <TextInput value={value.toString()} onChangeText={handleChange} />
}

export default NumericInputV2
