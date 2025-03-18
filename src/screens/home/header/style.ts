import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    rowGap: 12,
  },
  userSectionWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
  },
  userSection: {
    ...BaseStyles.flexRowItemsCenter,
  },
  userInfo: {
    ...BaseStyles.flexRowItemsCenter,
    flex: 1,
    columnGap: 8,
  },
  userContent: { flex: 1, rowGap: 4 },
  userName: {
    ...Typography.body16SemiBold,
    color: Colors.white,
  },
  userPhone: {
    ...Typography.body12Normal,
    letterSpacing: 0.2,
    color: Colors.white,
  },
  companyArea: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 8,
  },
  companyText: {
    ...Typography.body12Medium,
    color: Colors.white,
    flexShrink: 1,
  },
  chatBtn: {
    position: 'relative',
    ...BaseStyles.flexCenter,
    paddingVertical: 4,
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
  dot: {
    backgroundColor: Colors.red,
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    right: 2,
  },
  notification: {
    position: 'relative',
    width: 32,
    height: 32,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...BaseStyles.flexCenter,
  },
  notificationIconWrapper: {
    position: 'relative',
  },
})
