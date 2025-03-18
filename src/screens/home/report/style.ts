import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    paddingHorizontal: 12,
  },
  header: {
    ...BaseStyles.flexRowSpaceBetween,
    marginBottom: 12,
  },
  section: {
    columnGap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.white,
    ...BaseStyles.shadowMd,
  },
  headerTitle: {
    flexShrink: 1,
    ...Typography.body14SemiBold,
  },
  mb16: {
    marginBottom: 16,
  },
  footer: {
    ...BaseStyles.flexRowSpaceBetween,
    flexWrap: 'wrap',
    gap: 8,
  },
  text: {
    ...Typography.body14Normal,
    color: Colors.gray80,
  },
  textBold: {
    ...Typography.body16Medium,
  },
  statisticalArea: {
    backgroundColor: Colors.white,
    ...BaseStyles.shadowSm,
    padding: 12,
    borderRadius: 10,
    marginBottom: -80,
    rowGap: 8,
    top: -80,
  },
  statisticalList: {
    flexDirection: 'row',
    columnGap: 8,
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  h52: {
    height: 52,
  },
  secondItem: {
    width: '50%',
    paddingBottom: 8,
  },
  firstItem: {
    width: '50%',
    paddingRight: 8,
    paddingBottom: 8,
  },
  thirdItem: {
    width: '50%',
    paddingRight: 8,
  },
  fourthItem: {
    width: '50%',
  },
  reportLineLabel: {
    ...Typography.body14Normal,
    flex: 1,
    color: Colors.gray70,
  },
  reportLineValue: {
    ...Typography.body14Medium,
  },
  reportLines: {
    rowGap: 16,
  },
  reportLine: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
    width: '100%',
  },
})
