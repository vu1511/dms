import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...Typography.body14SemiBold,
  },
  addBtnText: {
    fontSize: 14,
  },
  popover: {
    width: 216,
  },
  dangerColor: {
    color: Colors.danger,
  },
})
