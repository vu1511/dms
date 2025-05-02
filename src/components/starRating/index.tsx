import { StarFillIcon } from '@/assets'
import { Colors } from '@/theme'
import { StarRatingNumber } from '@/types'
import { memo } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

export type StarRatingProps = {
  value: number
  size?: number
  gap?: number
  style?: StyleProp<ViewStyle>
  onChange?: (val: StarRatingNumber) => void
}

const StarRating = memo(({ value, size = 16, style, gap = 8, onChange }: StarRatingProps) => {
  return (
    <View style={[{ flexDirection: 'row', columnGap: gap }, style]}>
      {stars.map((star) => (
        <TouchableOpacity disabled={!onChange} activeOpacity={0.5} key={star} onPress={() => onChange?.(star)}>
          <StarFillIcon fill={star > Math.round(value) ? Colors.gray30 : Colors.gold} size={size} />
        </TouchableOpacity>
      ))}
    </View>
  )
})

export default StarRating

const stars: StarRatingNumber[] = [1, 2, 3, 4, 5]
