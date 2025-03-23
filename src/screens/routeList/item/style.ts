import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    padding: 16,
    backgroundColor: Colors.white,
  },
  nameArea: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  name: {
    ...Typography.body14SemiBold,
    flex: 1,
  },
  item: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
  },
  itemLabel: {
    ...Typography.body14Normal,
    color: Colors.gray70,
  },
  itemValue: {
    ...Typography.body12Normal,
    color: Colors.gray70,
  },
})
