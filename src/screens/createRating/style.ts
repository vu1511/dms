import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    rowGap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  imagesCard: {
    backgroundColor: Colors.white,
    rowGap: 8,
    paddingVertical: 12,
  },
  images: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  label: {
    ...Typography.body16SemiBold,
  },
  labelHeader: {
    paddingHorizontal: 16,
  },
})
