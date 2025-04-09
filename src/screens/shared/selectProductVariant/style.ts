import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    gap: 8,
    zIndex: 1,
  },
  headerTop: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 12,
  },
  searchInput: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    height: 36,
    flex: 1,
  },
  btnSort: {
    width: 36,
    height: 36,
    backgroundColor: Colors.background,
    ...BaseStyles.flexCenter,
    borderRadius: 8,
  },
  tabs: {
    flexDirection: 'row',
  },
  tabItem: {
    ...BaseStyles.flexCenter,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
    flex: 1,
  },
  tabItemText: {
    ...Typography.body14Medium,
    color: '#757575',
  },
  tabItemTextActive: {
    ...Typography.body14Medium,
    color: Colors.primary,
  },
  tabItemLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
})
