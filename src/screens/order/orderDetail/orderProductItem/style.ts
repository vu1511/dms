import { Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  productContainer: {
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productName: {
    ...Typography.body14Normal,
    flexShrink: 1,
  },
  productUom: {
    ...Typography.body12Normal,
    maxWidth: 100,
  },
  productPrice: {
    ...Typography.body12Normal,
    flexShrink: 1,
  },
  productQty: Typography.body12Normal,
})
