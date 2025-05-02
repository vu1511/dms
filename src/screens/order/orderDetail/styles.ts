import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingVertical: 12,
    gap: 12,
  },
  textNormalGray: {
    ...Typography.body14Normal,
    color: Colors.gray70,
    flexShrink: 1,
  },
  textNormalBlack: {
    ...Typography.body14Normal,
    flexShrink: 1,
  },
  textMedium: {
    ...Typography.body14Medium,
    flexShrink: 1,
  },
  lineItemLabel: {
    width: 120,
  },
  orderSection: {
    marginBottom: 8,
    backgroundColor: Colors.white,
  },
  section: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    ...Typography.body14SemiBold,
    flexShrink: 1,
  },
  actionArea: { marginBottom: 12 },
  title: {
    ...Typography.body16SemiBold,
    marginBottom: 12,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  summary: {
    rowGap: 8,
  },
  summaryItem: {
    paddingVertical: 4,
    ...BaseStyles.flexRowSpaceBetween,
  },
  summaryItemLabelItalic: {
    ...Typography.body14NormalItalic,
    color: Colors.gray70,
  },
  summaryItemLabel: {
    ...Typography.body14Normal,
    color: Colors.gray70,
  },
  summaryItemValue: {
    ...Typography.body14Medium,
    flex: 1,
    marginLeft: 12,
    textAlign: 'right',
  },
  separator: {
    borderBottomColor: Colors.gray20,
    borderBottomWidth: 1,
    marginVertical: 8,
  },
})
