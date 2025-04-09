import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    ...BaseStyles.absoluteInset,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  mask: {
    ...BaseStyles.absoluteInset,
    ...BaseStyles.flexRowCenter,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: 16,
  },
  footerBtn: {
    ...BaseStyles.flexRowCenter,
    columnGap: 24,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  permissionContainer: {
    flex: 1,
    padding: 16,
    ...BaseStyles.flexCenter,
    backgroundColor: Colors.white,
  },
  permissionArea: {
    ...BaseStyles.flexCenter,
  },
  permissionImage: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  permissionLabel: {
    ...Typography.body16Normal,
    lineHeight: 24,
    textAlign: 'center',
  },
  permissionLabelBold: {
    ...Typography.body18SemiBold,
    marginBottom: 8,
    lineHeight: 28,
  },
  permissionLabelBoldActive: {
    ...Typography.body16SemiBold,
    lineHeight: 24,
    color: Colors.active,
  },
  btn: {
    padding: 2,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderRadius: 25,
    width: 160,
    height: 50,
  },
  btnActive: {
    color: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 24,
    width: 80,
    backgroundColor: Colors.primary,
    textAlignVertical: 'center',
    position: 'absolute',
    textAlign: 'center',
    overflow: 'hidden',
    height: 46,
  },
})
