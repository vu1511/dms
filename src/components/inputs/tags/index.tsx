import { RatingTagRes } from '@/types'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'
import { styles } from './styles'

export type TagsProps = {
  data: RatingTagRes[]
  style?: StyleProp<ViewStyle>
  onChange?: (value: RatingTagRes) => void
  getActive?: (id: number) => boolean
}

export const Tags = ({ data, style, getActive, onChange }: TagsProps) => {
  if (!data?.length) {
    return null
  }

  return (
    <View style={[styles.tagContainer, style]}>
      {data?.map((tag, index) => {
        const isActive = getActive?.(tag.tag_id)

        return (
          <Pressable
            key={index}
            style={[styles.tagTxtContainer, isActive && styles.tagTxtContainerActive]}
            onPress={() => onChange?.(tag)}
          >
            <Text style={[styles.tagText, isActive && styles.tagSelectedText]}>{tag?.tag_content}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}
