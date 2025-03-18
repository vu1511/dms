import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  suffixArea: {
    ...BaseStyles.flexCenter,
  },
  suffix: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    columnGap: 4,
    backgroundColor: Colors.active,
    ...BaseStyles.flexRowItemsCenter,
  },
  suffixText: {
    ...Typography.body14Medium,
    color: Colors.white,
  },
})
