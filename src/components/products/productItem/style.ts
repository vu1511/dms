import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  active: {
    backgroundColor: '#F0F3F5',
  },
  iconCheck: {
    ...BaseStyles.flexCenter,
    ...BaseStyles.absoluteInset,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 26, 49, 0.6)',
  },
  unitPopover: {
    maxHeight: 200,
  },
  selected: {
    backgroundColor: '#F0F3F5',
  },
  added: {
    opacity: 0.5,
  },
  addedArea: {
    ...BaseStyles.flexRowItemsCenter,
    alignSelf: 'flex-start',
    columnGap: 4,
  },
  addedTitle: {
    ...Typography.body12Normal,
    color: '#2F9369',
  },
  imageArea: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  imageOverlay: {
    ...BaseStyles.flexCenter,
    ...BaseStyles.absoluteInset,
    borderRadius: 8,
    backgroundColor: 'rgba(33, 33, 33, 0.5)',
  },
  imageOverlayText: {
    ...Typography.body10Medium,
    color: Colors.white,
  },
  productImg: {
    backgroundColor: 'transparent',
    marginVertical: 4,
  },
  productInfo: {
    flex: 1,
    rowGap: 6,
  },
  name: {
    ...Typography.body14Medium,
    flex: 1,
  },
  nameArea: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 8,
  },
  popover: {
    width: 216,
  },
  trigger: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
    flexShrink: 1,
    flexGrow: 0,
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  triggerUnit: {
    maxWidth: 152,
  },
  triggerLabel: {
    ...Typography.body12Normal,
    color: '#6C798F',
    flexShrink: 1,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  lineContent: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
    flexShrink: 1,
  },
  lineText: {
    flexShrink: 1,
    ...Typography.body12Normal,
    color: '#6C798F',
  },
  codeText: {
    maxWidth: 140,
  },
})
