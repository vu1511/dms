import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  userInfoSection: {
    position: 'relative',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfoContent: {
    flex: 1,
    marginLeft: 12,
  },
  statistical: {
    flexDirection: 'row',
    gap: 8,
  },
  statisticalItem: {
    flex: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: Colors.primaryBg,
  },
  statisticalItemLabel: {
    ...Typography.body10Normal,
    color: Colors.gray70,
    marginBottom: 8,
  },
  statisticalItemValue: {
    ...Typography.body12SemiBold,
    // color: Colors.primary,
  },
  body: {
    paddingHorizontal: 12,
    flex: 1,
  },
  optionParent: {
    backgroundColor: Colors.white,
    padding: 12,
    paddingBottom: 0,
    marginBottom: 12,
    borderRadius: 8,
  },
  optionParentBarcode: {
    backgroundColor: Colors.white,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  optionTitle: {
    ...Typography.body16SemiBold,
    marginBottom: 8,
  },
  optionArea: {},
  optionItem: {
    ...BaseStyles.flexRowSpaceBetween,
    paddingVertical: 12,
  },
  optionItemBarcode: {
    ...BaseStyles.flexCenter,
  },
  optionItemLabel: {
    ...Typography.body14Medium,
    color: Colors.gray70,
    flex: 1,
  },
  loginBtn: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryBg,
    marginBottom: 12,
    borderRadius: 8,
  },
  loginBtnText: {
    ...Typography.body14Medium,
    flex: 1,
    marginLeft: 12,
  },
})
