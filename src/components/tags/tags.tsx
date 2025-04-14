import { BaseStyles } from '@/theme'
import { IdAndName } from '@/types'
import { produce } from 'immer'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import ActivityIndicator from '../activityIndicator'
import Tag from './tag'

export type TagsProps = {
  isLoading?: boolean
  data: IdAndName[]
  value?: number[]
  style?: StyleProp<ViewStyle>
  onChange(ids: number[]): void
}

const Tags = ({ isLoading, data, value = [], style, onChange }: TagsProps) => {
  const handleChange = (id: number) => {
    onChange(
      produce(value, (draft) => {
        const index = draft.findIndex((item) => item === id)
        if (index === -1) {
          draft.push(id)
        } else {
          draft.splice(index, 1)
        }
      })
    )
  }

  return isLoading ? (
    <View style={style}>
      <ActivityIndicator style={BaseStyles.py16} />
    </View>
  ) : data?.length ? (
    <View style={[styles.container, style]}>
      {data.map((item) => (
        <Tag
          key={item.id}
          label={item.name}
          isActive={value?.includes(item.id)}
          onPress={() => handleChange(item.id)}
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

export default Tags
