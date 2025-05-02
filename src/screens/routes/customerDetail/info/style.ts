import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 12,
    gap: 12,
  },
  card: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  info: {
    backgroundColor: Colors.white,
    ...BaseStyles.shadowSm,
    gap: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    columnGap: 8,
  },
  infoName: {
    ...Typography.body16SemiBold,
    flexShrink: 1,
  },
  infoNameArea: {
    rowGap: 8,
    flex: 1,
  },
  infoEmpty: {
    justifyContent: 'flex-start',
    paddingTop: 72,
  },
  infoLine: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 12,
  },
  infoLineLabel: {},
  infoLineValue: {
    flexShrink: 1,
    ...Typography.body14Normal,
    color: Colors.gray80,
  },
  barcode: {
    ...BaseStyles.flexCenter,
    gap: 2,
  },
  barcodeLabel: { ...Typography.body12Medium },
  editButton: {
    backgroundColor: '#E3E9ED',
    borderRadius: 10,
    height: 40,
  },
  editButtonText: {
    color: '#505F79',
  },
  userTier: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 25,
    backgroundColor: '#FEF3C8',
    borderWidth: 1,
    borderColor: '#FDE68B',
    alignSelf: 'flex-start',
    columnGap: 4,
    ...BaseStyles.flexRowItemsCenter,
  },
  userTierLabel: {
    ...Typography.body12SemiBold,
    flexShrink: 1,
  },
})
