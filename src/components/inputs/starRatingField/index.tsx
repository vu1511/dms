import { StarRating as IStarRating } from '@/types'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import StarRating, { StarRatingProps } from '../../starRating'

export type StarRatingFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<StarRatingProps, 'onChange' | 'value'> & {
  name: TName
  control: Control<TFieldValues>
  onChange?: (val: IStarRating) => void
}

const StarRatingField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  onChange: externalOnChange,
  ...rest
}: StarRatingFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value },
  } = useController({ name, control })

  return (
    <StarRating
      {...rest}
      value={+value}
      size={32}
      onChange={(val: number) => {
        const newValue = val ? (`${val}` as IStarRating) : undefined
        if (newValue && newValue !== value) {
          onChange(newValue)
          externalOnChange?.(newValue)
        }
      }}
    />
  )
}

export default StarRatingField
