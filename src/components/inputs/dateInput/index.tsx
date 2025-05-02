import { CalendarIcon } from '@/assets'
import { Colors } from '@/theme'
import dayjs from 'dayjs'
import { forwardRef, useMemo, useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker'
import TextInput, { TextInputProps } from '../textInput'

export type DateInputProps = Pick<DateTimePickerProps, 'minimumDate' | 'maximumDate' | 'mode'> &
  Omit<TextInputProps, 'defaultValue' | 'onChange' | 'mode' | 'value' | 'onChangeText' | 'onChange'> & {
    value?: Date | null
    defaultValue?: Date | null
    onChange?: (date: Date | null) => void
  }

const DateInput = forwardRef<RNTextInput, DateInputProps>(
  ({ value: externalValue, mode = 'date', minimumDate, maximumDate, defaultValue, onChange, ...attributes }, ref) => {
    const [visible, setVisible] = useState(false)
    const [internalValue, setInternalValue] = useState<Date | undefined | null>(defaultValue)

    const isControlled = typeof externalValue !== 'undefined'
    const value = isControlled ? externalValue : internalValue

    const valueDisplay = useMemo<string | undefined>(() => {
      if (!value) return undefined

      if (mode === 'date') {
        return dayjs(value).format('DD/MM/YYYY')
      }

      if (mode === 'datetime') {
        return dayjs(value).format('HH:mm DD/MM/YYYY')
      }

      if (mode === 'time') {
        return dayjs(value).format('HH:mm')
      }

      return undefined
    }, [value, mode])

    const onClose = () => {
      setVisible(false)
    }

    const onOpen = () => {
      setVisible(true)
    }

    const handleConfirm = (val: Date | null) => {
      onClose()
      onChange?.(val)
      if (!isControlled) {
        setInternalValue(val)
      }
    }

    return (
      <>
        <TextInput
          onClearValue={() => handleConfirm(null)}
          {...attributes}
          ref={ref}
          readOnly
          editable={false}
          pointerEvents="none"
          onPress={onOpen}
          value={valueDisplay}
          right={<CalendarIcon fill={Colors.gray80} size={20} />}
        />

        <DateTimePicker
          mode={mode}
          locale="vi"
          display="inline"
          themeVariant="light"
          isVisible={visible}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          accentColor={Colors.primary}
          buttonTextColorIOS={Colors.primary}
          date={value ? new Date(value) : undefined}
          onCancel={onClose}
          onConfirm={handleConfirm}
        />
      </>
    )
  }
)

export default DateInput
