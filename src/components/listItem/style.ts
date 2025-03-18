import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
    alignItems: 'flex-start',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...Typography.body16Normal,
    lineHeight: 24,
    flex: 1,
  },
  textActive: {
    ...Typography.body16SemiBold,
    lineHeight: 24,
  },
})
