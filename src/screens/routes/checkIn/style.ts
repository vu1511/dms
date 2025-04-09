import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    ...BaseStyles.flexCenter,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    ...BaseStyles.flexCenter,
    position: 'relative',
    borderRadius: 10,
    rowGap: 8,
    overflow: 'hidden',
    width: 300,
    height: 300,
    backgroundColor: Colors.primaryBg,
  },
  imagePlaceholderLine: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 24,
    backgroundColor: Colors.primary,
  },
  deleteBtnArea: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
  },
  deleteBtn: {
    backgroundColor: Colors.black20,
  },
  imagePlaceholderText: {
    ...Typography.body16Normal,
    color: Colors.primary,
  },
  title: {
    ...Typography.body16SemiBold,
    flex: 1,
    marginBottom: 8,
  },
  line: {
    ...Typography.body14Normal,
  },
  typeStore: {
    ...BaseStyles.flexRowSpaceBetween,
    marginBottom: 24,
    columnGap: 16,
  },
  p4: {
    padding: 4,
  },
})
