import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    columnGap: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 80,
    backgroundColor: Colors.white,
  },
  name: {
    ...Typography.body14Medium,
    textTransform: 'capitalize',
    flex: 1,
  },
  label: {
    ...Typography.body12Normal,
    color: Colors.gray60,
  },
  content: {
    flex: 1,
    rowGap: 4,
  },
})
