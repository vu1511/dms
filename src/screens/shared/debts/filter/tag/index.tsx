import { CloseIcon } from '@/assets'
import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type FilterTagProps = {
  label: string
  onPress?(): void
}

export const FilterTag = ({ label, onPress }: FilterTagProps) => {
  return (
    <TouchableOpacity disabled={!onPress} activeOpacity={0.5} style={styles.filterItem} onPress={() => onPress?.()}>
      <Text numberOfLines={1} style={styles.filterItemText}>
        {label}
      </Text>
      <CloseIcon size={16} fill={Colors.gray80} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filterItem: {
    ...BaseStyles.border,
    ...BaseStyles.flexRowItemsCenter,
    flexShrink: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    columnGap: 8,
    alignSelf: 'flex-start',
  },
  filterItemText: {
    ...Typography.body12Medium,
    color: Colors.gray80,
    flexShrink: 1,
  },
})
