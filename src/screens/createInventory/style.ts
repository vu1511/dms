import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    rowGap: 12,
  },
  section: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    gap: 8,
  },
  productTitle: {
    marginHorizontal: 16,
    marginTop: 12,
    ...Typography.body16SemiBold,
  },
  buttonBottom: {
    paddingBottom: 0,
    padding: 0,
    marginTop: 16,
  },
  headerTitle: {
    ...Typography.body14SemiBold,
    flexShrink: 1,
  },
})
