import { ScreenHeight } from '@/constants'
import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    height: ScreenHeight,
    backgroundColor: Colors.white,
  },
  loading: {
    paddingTop: 72,
    ...BaseStyles.flexCenter,
  },
  emptyContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  empty: {
    paddingTop: 72,
  },
  emptyLabel: {
    ...Typography.body18SemiBold,
    textAlign: 'center',
  },
  emptyDesc: {
    ...Typography.body16Normal,
    color: Colors.gray70,
    textAlign: 'center',
  },
  emptyImage: {
    width: 100,
    height: 100,
  },
  bottom: {
    backgroundColor: Colors.white,
  },
  loadingMore: {
    paddingVertical: 16,
  },
})
