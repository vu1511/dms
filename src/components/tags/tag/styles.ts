import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -8,
  },
  tagTxtContainer: {
    ...BaseStyles.flexCenter,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  tagTxtContainerActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  tagText: {
    ...Typography.body12Medium,
    lineHeight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: Colors.gray70,
  },
  tagSelectedText: {
    color: Colors.primary,
  },
})
