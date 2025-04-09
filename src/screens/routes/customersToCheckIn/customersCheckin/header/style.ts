import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.white,
  },
  guideBtn: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 8,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
  },
  guidePopover: {
    width: 200,
    padding: 16,
    rowGap: 16,
  },
  guideBtnText: {
    ...Typography.body13Medium,
  },
  switchModeLabel: {
    ...Typography.body13Normal,
    color: Colors.gray70,
  },
  switchModeBtn: {
    ...BaseStyles.flexRowItemsCenter,
    height: 36,
    columnGap: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
  },
  switchBtnLine: {
    position: 'absolute',
    height: 32,
    backgroundColor: Colors.white,
    borderRadius: 8,
    top: 2,
  },
  guideLineItem: {
    ...BaseStyles.flexRowItemsCenter,
    ...BaseStyles.cGap12,
  },
  guideLineItemText: { ...Typography.body14Normal, color: Colors.gray80 },
})
