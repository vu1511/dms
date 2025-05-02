import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
  },
  dateFilter: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 8,
    backgroundColor: Colors.inputBg,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  dateFilterText: {
    ...Typography.body14Medium,
    color: Colors.gray70,
    flexShrink: 1,
  },
  lineItemLabel: {
    width: 220,
  },
  iconsSummary: {
    marginRight: 5,
  },
  summaryText: {
    flex: 1,
    marginLeft: 4,
    ...Typography.body14Medium,
  },
  fieldRow: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  fieldName: {
    flex: 1,
    ...Typography.body14Normal,
    color: Colors.gray80,
  },
  fieldValue: {
    ...Typography.body14SemiBold,
  },
  wrapper: {
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
})

export default styles
