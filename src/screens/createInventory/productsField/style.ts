import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  element: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    ...Typography.body14SemiBold,
  },
  header: {
    ...BaseStyles.flexRowSpaceBetween,
    paddingHorizontal: 16,
    paddingVertical: 12,
    columnGap: 12,
  },
  addBtn: {
    fontSize: 14,
    lineHeight: 20,
  },
  // buttonRight: {
  //   width: 44,
  //   minWidth: undefined,
  //   flex: undefined,
  //   padding: 0
  // }
})
