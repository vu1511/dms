import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  btnItem: {
    ...BaseStyles.flexCenter,
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: Colors.gray20,
    borderRadius: 8,
    rowGap: 8,
    flex: 1,
  },
  separator: {
    width: 16,
  },
  btnItemText: {
    ...Typography.body14Medium,
    color: Colors.gray70,
  },
})
