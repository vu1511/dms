import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    columnGap: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  image: {
    width: 56,
    height: 56,
  },
  imgCount: {
    backgroundColor: Colors.black50,
    paddingHorizontal: 2,
    borderRadius: 2,
    position: 'absolute',
    zIndex: 10,
    bottom: 4,
    right: 4,
  },
  imgCountLabel: {
    ...Typography.body10Medium,
    color: Colors.white,
  },
  topArea: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
  },
  type: {
    ...Typography.body14Normal,
    color: Colors.gray60,
    marginBottom: 8,
  },
  typeValue: {
    ...Typography.body14Medium,
  },
  ratingContent: {
    ...Typography.body14Normal,
    color: Colors.gray80,
    flexShrink: 1,
  },
  viewMoreText: {
    ...Typography.body12Normal,
    color: Colors.gray60,
    alignSelf: 'flex-end',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    columnGap: 8,
  },
  tagItem: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  date: {
    ...Typography.body12Normal,
    color: Colors.gray60,
  },
  content: {
    flex: 1,
    gap: 4,
  },
})
