import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    ...BaseStyles.flexRowSpaceBetween,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    columnGap: 8,
  },
  content: {
    flex: 1,
    rowGap: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    ...Typography.body16Normal,
    lineHeight: 24,
    flexShrink: 1,
  },
  subTitle: {
    ...Typography.body14Normal,
    color: Colors.gray60,
    flexShrink: 1,
  },
  titleActive: {
    ...Typography.body16SemiBold,
    lineHeight: 24,
  },
  rightArea: {
    columnGap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
