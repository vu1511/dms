import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.gray10,
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
