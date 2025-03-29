import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 5,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  empty: {
    flex: undefined,
    paddingTop: 32,
  },
  deleteBtn: { position: 'relative', top: -4, right: -2 },
  modalSelectHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    paddingTop: 0,
    borderBottomColor: Colors.gray20,
    borderBottomWidth: 1,
  },
  modalHeaderTxt: {
    ...Typography.body16SemiBold,
    flex: 1,
  },
  contAddCus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: Colors.gray20,
    borderBottomWidth: 1,
  },
})
