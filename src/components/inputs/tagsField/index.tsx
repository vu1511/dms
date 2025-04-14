import { Tags, TagsProps } from '@/components'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

export type TagsFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<TagsProps, 'onChange' | 'value'> & {
  control: Control<TFieldValues>
  name: TName
}

const TagsField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  ...props
}: TagsFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value },
  } = useController({ name, control })

  return <Tags {...props} value={value} onChange={onChange} />
}

export default TagsField
