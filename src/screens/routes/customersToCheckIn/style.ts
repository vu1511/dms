import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    flexGrow: 1,
  },
  header: {
    backgroundColor: Colors.white,
    paddingBottom: 8,
    rowGap: 8,
    zIndex: 1,
  },
  headerShadow: {
    ...BaseStyles.shadowSm,
    borderBottomColor: Colors.gray20,
    borderBottomWidth: 1,
  },
  searchInputWrapper: {
    ...BaseStyles.px16,
    ...BaseStyles.flexRowCenter,
    columnGap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    backgroundColor: Colors.white,
  },
  toggleArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBtn: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
    height: 36,
    maxWidth: 180,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
  },
  filterBtnText: {
    ...Typography.body14Medium,
    color: Colors.gray70,
    flexShrink: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
  },
  dotOnline: {
    backgroundColor: '#49BC78',
  },
  dotOffline: {
    backgroundColor: '#DE350B',
  },
  guideBtn: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 8,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
  },
  guideBtnText: {
    ...Typography.body13Medium,
  },
  switchModeLabel: {
    ...Typography.body13Normal,
    color: Colors.gray70,
  },
  switchModeBtn: {
    ...BaseStyles.flexRowItemsCenter,
    height: 36,
    columnGap: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
  },
  switchBtnLine: {
    position: 'absolute',
    height: 32,
    backgroundColor: Colors.white,
    borderRadius: 8,
    top: 2,
  },
  empty: {
    justifyContent: 'flex-start',
    paddingTop: 72,
  },
  popover: {
    width: 216,
    minHeight: 200,
    maxHeight: 392,
  },
})
