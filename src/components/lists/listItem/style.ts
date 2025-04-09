import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    ...BaseStyles.flexRowSpaceBetween,
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    columnGap: 8,
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
