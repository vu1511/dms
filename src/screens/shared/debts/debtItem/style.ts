import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    rowGap: 8,
  },
  name: {
    ...Typography.body14Medium,
    flex: 1,
  },
  header: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
  },
  content: {
    rowGap: 8,
  },
  date: {
    ...Typography.body12Normal,
    color: Colors.gray70,
    flexShrink: 1,
  },
  partnerName: {
    ...Typography.body12Normal,
    color: Colors.gray70,
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  money: {
    ...Typography.body12Normal,
    color: Colors.gray70,
    flexShrink: 1,
  },
})
