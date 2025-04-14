import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

const RADIUS = 4

export const styles = StyleSheet.create({
  contentContainer: {
    ...BaseStyles.flexRowItemsCenter,
    gap: 8,
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  label: {
    ...Typography.body12Normal,
    textAlign: 'center',
    color: Colors.gray70,
  },
  overlay: {
    ...BaseStyles.absoluteInset,
    ...BaseStyles.flexRowCenter,
    borderRadius: RADIUS,
    backgroundColor: Colors.black50,
    zIndex: 1,
  },
  deleteBtn: {
    position: 'absolute',
    right: 4,
    top: 4,
    zIndex: 2,
  },
  placeholder: {
    ...BaseStyles.flexCenter,
    borderRadius: RADIUS,
    gap: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.gray40,
    backgroundColor: Colors.inputBg,
  },
  placeholderError: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerBg,
  },
  colorDanger: {
    color: Colors.danger,
  },
  imageItem: {
    borderRadius: 4,
    overflow: 'hidden',
  },
})
