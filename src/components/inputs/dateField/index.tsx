import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import DateInput, { DateInputProps } from '../dateInput'

export type DateFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = DateInputProps & {
  control: Control<TFieldValues>
  name: TName
}

const DateField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  ...attributes
}: DateFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <DateInput
      ref={ref}
      onBlur={onBlur}
      errorMsg={error?.message}
      error={!!error}
      {...attributes}
      value={value ?? null}
      onChange={onChange}
    />
  )
}

export default DateField
