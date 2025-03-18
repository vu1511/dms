import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import PasswordInput from '../passwordInput'
import { TextInputProps } from '../textInput'

export type PasswordFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = TextInputProps & {
  control: Control<TFieldValues>
  name: TName
}

const PasswordField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  ...attributes
}: PasswordFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <PasswordInput
      ref={ref}
      onBlur={onBlur}
      errorMsg={error?.message}
      error={!!error}
      {...attributes}
      value={value ?? ''}
      onChangeText={onChange}
    />
  )
}

export default PasswordField
