import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  rateCategoryTitle: {
    ...Typography.body14Medium,
    color: Colors.gray70,
  },
  rateCategoryType: {
    ...BaseStyles.flexRowSpaceBetween,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  btnCategory: {
    ...BaseStyles.flexRowItemsCenter,
    backgroundColor: Colors.inputBg,
    columnGap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  categoryTxt: {
    ...Typography.body14Medium,
    color: Colors.gray80,
  },
  label: {
    ...Typography.body14Medium,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ratingContainer: {
    marginTop: 20,
  },
})
