import { isNumber } from '@/utils'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { styles } from './style'

type QuantityInputProps = {
  min?: number
  max?: number
  value?: number
  disabled?: boolean
  readonly?: boolean
  onChange?: (qty: number) => void
  debounceTimer?: number
  onMinReached?: () => void
  renderInput?: typeof TextInput | typeof BottomSheetTextInput
}

export const QuantityInput = ({
  min = 1,
  max = 9999,
  readonly = false,
  disabled = false,
  value: externalValue,
  debounceTimer = 0,
  onChange: externalOnChange,
  onMinReached,
  renderInput: RenderInput = TextInput,
}: QuantityInputProps) => {
  const [value, setValue] = useState<string>(externalValue?.toString() || '1')

  const disabledDecreaseBtn = onMinReached ? Number(value) < min : Number(value) <= min
  const disabledIncreaseBtn = Number(value) >= max

  useEffect(() => {
    if (isNumber(externalValue) && externalValue !== +value) {
      setValue(externalValue.toString())
    }
  }, [externalValue])

  const handleChangeWithDebounce = useCallback(
    debounce((qty: number) => {
      externalOnChange?.(qty)
    }, debounceTimer),
    [debounceTimer, externalOnChange]
  )

  const handleSetValue = (value: number) => {
    if (Number.isNaN(value)) return

    setValue(value.toString())
    debounceTimer ? handleChangeWithDebounce(value) : externalOnChange?.(value)
  }

  const onChange = (nextValue: string) => {
    if (disabled || readonly || nextValue === value) return

    if (nextValue === '') {
      handleSetValue(min)
      return
    }

    const valueNumber = +nextValue

    if (Number.isNaN(valueNumber)) return

    if (valueNumber < min) {
      onMinReached ? onMinReached() : handleSetValue(min)
      return
    } else if (valueNumber > max) {
      handleSetValue(max)
      return
    }

    handleSetValue(valueNumber)
  }

  const increaseValue = () => {
    const valueNumber = Number(value)
    if (valueNumber < max) {
      handleSetValue(valueNumber + 1)
    }
  }

  const decreaseValue = () => {
    const valueNumber = Number(value)
    if (valueNumber > min) {
      handleSetValue(valueNumber - 1)
    } else {
      onMinReached?.()
    }
  }

  return (
    <View pointerEvents={disabled ? 'none' : 'auto'} style={disabled && styles.opacity50}>
      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={decreaseValue}
          disabled={disabled || disabledDecreaseBtn}
          hitSlop={{ left: 8, bottom: 8, top: 8 }}
          style={[styles.btn, disabledDecreaseBtn && !disabled && styles.opacity50]}
        >
          <SvgXml
            width={10}
            xml='<svg width="15" height="2" viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 2H1.5C0.95 2 0.5 1.55 0.5 1C0.5 0.45 0.95 0 1.5 0H13.5C14.05 0 14.5 0.45 14.5 1C14.5 1.55 14.05 2 13.5 2Z" fill="#2962FF"/></svg>'
          />
        </TouchableOpacity>
        <RenderInput
          value={value}
          selectTextOnFocus
          style={[styles.input, value?.length > 3 && styles.inputTextSmall]}
          textAlignVertical="center"
          keyboardType="number-pad"
          onChangeText={onChange}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={increaseValue}
          disabled={disabled || Number(value) >= max}
          hitSlop={{ right: 8, bottom: 8, top: 8 }}
          style={[styles.btn, disabledIncreaseBtn && !disabled && styles.opacity50]}
        >
          <SvgXml
            width={10}
            height={9}
            xml='<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 8H8.5V13C8.5 13.55 8.05 14 7.5 14C6.95 14 6.5 13.55 6.5 13V8H1.5C0.95 8 0.5 7.55 0.5 7C0.5 6.45 0.95 6 1.5 6H6.5V1C6.5 0.45 6.95 0 7.5 0C8.05 0 8.5 0.45 8.5 1V6H13.5C14.05 6 14.5 6.45 14.5 7C14.5 7.55 14.05 8 13.5 8Z" fill="#2962FF"/></svg>'
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
