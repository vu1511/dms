import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  name: {
    ...Typography.body14Medium,
    flex: 1,
  },
  inventoryItem: {},
  date: {
    ...Typography.body12Normal,
    color: Colors.gray50,
  },
  productImg: {
    height: 87,
    width: 85,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    ...Typography.body13SemiBold,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    columnGap: 8,
  },
  tagItem: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
})
