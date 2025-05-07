import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backButtonArea: {
    position: 'absolute',
    zIndex: 100,
    left: 16,
    ...BaseStyles.shadowMd,
  },
  currentLocationIcon: {
    position: 'absolute',
    zIndex: 10,
  },
  locationBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 100,
    backgroundColor: Colors.white,
    ...BaseStyles.shadowMd,
  },
  footer: {
    gap: 12,
  },
  resultArea: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  resultLabel: {
    flex: 1,
    ...Typography.body14Medium,
  },
})
