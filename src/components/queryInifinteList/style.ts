import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/common'
import { ScreenHeight } from '@/constants'
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
    backgroundColor: COLORS.white,
  },
  loading: {
    paddingTop: 72,
    ...COMMON_STYLES.flexCenter,
  },
  emptyContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  empty: {
    paddingTop: 72,
  },
  emptyLabel: {
    ...TYPOGRAPHY.body18SemiBold,
    textAlign: 'center',
  },
  emptyDesc: {
    ...TYPOGRAPHY.body16Normal,
    color: COLORS.gray70,
    textAlign: 'center',
  },
  emptyImage: {
    width: 100,
    height: 100,
  },
  bottom: {
    backgroundColor: COLORS.white,
  },
  loadingMore: {
    paddingVertical: 16,
  },
})
