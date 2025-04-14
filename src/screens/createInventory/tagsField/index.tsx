import { ActivityIndicator, Tag } from '@/components'
import { BaseStyles } from '@/theme'
import { CreateInventoryForm, RatingTagRes } from '@/types'
import { produce } from 'immer'
import { Control, useController } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

export type TagsFieldProps = {
  control: Control<CreateInventoryForm>
  data: RatingTagRes[] | undefined
  isLoading?: boolean
}

export const TagsField = ({ data, control, isLoading }: TagsFieldProps) => {
  const {
    field: { onChange, value = [] },
  } = useController({ name: 'rating_tags', control })

  const handleChange = (id: number) => {
    onChange(
      produce(value, (draft: number[]) => {
        const index = value.findIndex((item) => item === id)
        index === -1 ? draft.push(id) : draft.splice(index, 1)
      })
    )
  }

  return isLoading ? (
    <ActivityIndicator style={BaseStyles.py16} />
  ) : data?.length ? (
    <View style={styles.container}>
      {data.map((item) => (
        <Tag
          key={item.tag_id}
          label={item.tag_content}
          isActive={value?.includes(item.tag_id)}
          onPress={() => handleChange(item.tag_id)}
        />
      ))}
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
})
