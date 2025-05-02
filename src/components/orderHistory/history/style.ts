import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

const SIZE = 36

export const styles = StyleSheet.create({
  header: {
    rowGap: 8,
    padding: 12,
    backgroundColor: Colors.white,
    ...BaseStyles.borderBottom,
  },
  searchInput: {
    backgroundColor: Colors.inputBg,
    borderRadius: 8,
    flex: 1,
    height: SIZE,
  },
  searchWrapper: {
    flexDirection: 'row',
  },
  filterBtn: {
    ...BaseStyles.flexCenter,
    marginLeft: 8,
    backgroundColor: Colors.inputBg,
    width: SIZE,
    height: SIZE,
    borderRadius: 8,
  },
  summary: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryItemRight: {
    justifyContent: 'flex-end',
  },
  summaryLabel: {
    ...Typography.body14Normal,
    color: Colors.gray70,
  },
  summaryValue: {
    ...Typography.body14Medium,
  },
})
