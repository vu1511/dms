import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  header: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
  },
  nameArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    columnGap: 4,
  },
  name: {
    ...Typography.body14Medium,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    borderTopColor: Colors.gray20,
    borderTopWidth: 0.8,
    paddingVertical: 8,
  },
  lineItem: {
    ...BaseStyles.cGap8,
    ...BaseStyles.flexRowSpaceBetween,
  },
  lineItemText: {
    ...Typography.body12Normal,
    color: Colors.gray70,
    flexShrink: 1,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  textRight: {
    textAlign: 'right',
  },
})
