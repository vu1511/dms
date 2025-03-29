import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: 154,
    paddingVertical: 12,
    paddingHorizontal: 16,
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  lineItem: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
  },
  lineItemLabel: {
    flexShrink: 1,
    ...Typography.body13Normal,
    color: Colors.gray70,
  },
  lineItemValue: {
    ...BaseStyles.shrink1,
    ...Typography.body13Medium,
    color: Colors.gray80,
  },
  distanceArea: {
    ...BaseStyles.flexRowItemsCenter,
    ...BaseStyles.cGap4,
  },
  addressIcon: {
    top: 2,
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 4,
  },
  address: {
    flex: 1,
    ...Typography.body13Normal,
    color: Colors.gray70,
  },
  nameArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    columnGap: 12,
  },
  name: {
    ...Typography.body14SemiBold,
    textTransform: 'capitalize',
    flex: 1,
  },
  tBold: {
    ...Typography.body16SemiBold,
  },
  cStatus: {
    flexDirection: 'row',
  },
  tColor: {
    fontWeight: '500',
    paddingLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    height: 36,
    marginTop: 8,
    columnGap: 8,
  },
  footerBtn: {
    height: 36,
    flex: 1,
    columnGap: 4,
    paddingHorizontal: 8,
  },
  footerBtnSuccess: {
    backgroundColor: Colors.success,
  },
  footerBtnText: {
    ...Typography.body14SemiBold,
    color: Colors.white,
  },
  footerBtnCheckin: {
    backgroundColor: '#E3E9ED',
  },
  footerBtnCheckinText: {
    ...Typography.body14SemiBold,
    color: '#505F79',
  },
  content: {
    flex: 1,
    rowGap: 4,
  },
  contentInfo: {
    flex: 1,
    rowGap: 4,
  },
  optionIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  tStatus: {
    ...Typography.body12Medium,
  },
  active: {
    textAlign: 'center',
  },
  phoneBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    maxWidth: 120,
    columnGap: 2,
  },
  phone: {
    ...Typography.body13Normal,
    lineHeight: 16,
    flexShrink: 1,
    color: Colors.active,
  },
  optionBtn: {
    borderRadius: 8,
    backgroundColor: '#E3E9ED',
    height: 36,
    ...BaseStyles.flexCenter,
    width: 36,
  },
  popover: {
    width: 226,
    paddingVertical: 8,
  },
  dot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
})
