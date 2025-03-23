import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  btn: {
    width: 250,
    height: 150,
    borderRadius: 10,
    ...BaseStyles.flexCenter,
    overflow: 'hidden',
    backgroundColor: Colors.primaryBg,
    position: 'relative',
    borderTopColor: Colors.primary,
    borderTopWidth: 24,
  },
  placeholder: {
    ...Typography.body12Normal,
    color: Colors.primary,
    marginTop: 8,
  },
  btnError: {
    borderColor: Colors.red,
    borderWidth: 0.7,
    backgroundColor: Colors.redBg,
    borderTopColor: Colors.red,
  },
  loadingView: {
    ...BaseStyles.absoluteInset,
    ...BaseStyles.flexCenter,
    backgroundColor: Colors.gray20,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  btnItem: {
    ...BaseStyles.flexCenter,
    padding: 24,
    backgroundColor: Colors.gray10,
    borderRadius: 8,
    flex: 1,
  },
  separator: {
    width: 16,
  },
  btnItemText: {
    ...Typography.body14Normal,
    color: Colors.gray50,
    marginTop: 4,
  },
  editIcon: {
    ...BaseStyles.flexCenter,
    position: 'absolute',
    bottom: 0,
    right: 12,
    backgroundColor: Colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
})
