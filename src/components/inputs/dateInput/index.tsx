import moment from 'moment'
import { useMemo, useState } from 'react'
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker'
import TextInput, { TextInputProps } from '../textInput'
import { CalendarIcon } from '@/assets'
import { Colors } from '@/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type DateInputProps = Pick<DateTimePickerProps, 'minimumDate' | 'maximumDate' | 'date' | 'mode'> &
  Omit<TextInputProps, 'defaultValue' | 'onChange' | 'mode'> & {
    defaultValue?: Date
    onChange?: (date: Date) => void
  }

const DateInput = ({
  mode = 'date',
  date,
  minimumDate,
  maximumDate,
  defaultValue = new Date(),
  onChange,
  ...attributes
}: DateInputProps) => {
  const { bottom } = useSafeAreaInsets()
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<Date>(defaultValue)

  const valueDisplay = useMemo<string | undefined>(() => {
    if (!value) return undefined

    if (mode === 'date') return moment(value).format('DD/MM/YYYY')
    if (mode === 'datetime') return moment(value).format('HH:mm DD/MM/YYYY')
    if (mode === 'time') return moment(value).format('HH:mm')

    return undefined
  }, [value, mode])

  const onClose = () => {
    setVisible(false)
  }

  const onOpen = () => {
    setVisible(true)
  }

  const handleConfirm = (val: Date) => {
    onClose()
    setValue(val)
    onChange?.(val)
  }

  return (
    <>
      <TextInput
        {...attributes}
        readOnly
        onPress={onOpen}
        editable={false}
        pointerEvents="none"
        value={valueDisplay}
        right={<CalendarIcon fill={Colors.gray80} size={24} />}
      />

      {visible ? (
        <DateTimePicker
          title="Chọn ngày"
          isVisible={visible}
          onConfirm={handleConfirm}
          onCancel={onClose}
          date={value ? new Date(value) : undefined}
          mode={mode}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          // {...attributes}
          modalStyleIOS={{ paddingBottom: bottom }}
          locale="vi"
        />
      ) : null}
    </>
  )
}

export default DateInput
