import { StarFillIcon } from '@/assets'
import { Colors } from '@/theme'
import { StarRatingNumber } from '@/types'
import { memo } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

export type StarRatingProps = {
  value: number
  size?: number
  style?: StyleProp<ViewStyle>
  onChange: (val: StarRatingNumber) => void
}

const StarRating = memo(({ value, size = 16, style, onChange }: StarRatingProps) => {
  return (
    <View style={[{ flexDirection: 'row', columnGap: 8 }, style]}>
      {stars.map((star) => (
        <TouchableOpacity activeOpacity={0.5} key={star} onPress={() => onChange(star)}>
          <StarFillIcon fill={star > Math.round(value) ? Colors.gray30 : Colors.gold} size={size} />
        </TouchableOpacity>
      ))}
    </View>
  )
})

export default StarRating

const stars: StarRatingNumber[] = [1, 2, 3, 4, 5]
