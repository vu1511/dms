import { BaseStyles, Colors, Spacings, Typography } from '@/theme'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

export type TextAreaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  control: Control<TFieldValues>
  name: TName
}

const TextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  ...props
}: TextAreaFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        ref={ref}
        multiline
        value={value}
        onBlur={onBlur}
        autoCorrect={false}
        autoCapitalize="none"
        style={[styles.input, error && styles.inputError]}
        onChangeText={(text) => onChange(text)}
      />
      {error ? <Text style={BaseStyles.inputErrorMessage}>{error?.message || 'Vui lòng nhập trường này'}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  input: {
    ...Typography.body16Normal,
    lineHeight: 24,
    padding: 12,
    minHeight: 56,
    maxHeight: 120,
    borderRadius: Spacings.sm,
    backgroundColor: Colors.inputBg,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.inputBg,
  },
  inputError: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerBg,
  },
})

export default TextAreaField
