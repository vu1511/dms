import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import TextInput, { TextInputProps } from '../textInput'

export type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = TextInputProps & {
  control: Control<TFieldValues>
  name: TName
}

const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  ...attributes
}: TextFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <TextInput
      ref={ref}
      onBlur={onBlur}
      value={value || ''}
      onChangeText={onChange}
      error={!!error}
      errorMsg={error?.message || error?.type}
      {...attributes}
    />
  )
}

export default TextField
