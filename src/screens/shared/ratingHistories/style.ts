import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...BaseStyles.borderBottom,
    ...BaseStyles.flexRowSpaceBetween,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    columnGap: 8,
  },
  popover: {
    width: 256,
  },
  filterBtn: {
    columnGap: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.inputBg,
    maxWidth: 200,
    overflow: 'hidden',
    ...BaseStyles.flexRowSpaceBetween,
  },
  filterLabel: {
    ...Typography.body14Normal,
    color: Colors.gray70,
    flexShrink: 1,
  },
  filterValue: {
    ...Typography.body14Medium,
    color: Colors.gray80,
    flexShrink: 1,
  },
})
