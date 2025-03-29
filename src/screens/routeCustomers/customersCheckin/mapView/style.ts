import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapView: {
    flex: 1,
  },
  backdrop: {
    ...BaseStyles.absoluteInset,
    ...BaseStyles.flexCenter,
    zIndex: 10,
    backgroundColor: Colors.black20,
  },
  markerIcon: {
    width: 38,
    height: 38,
  },
  dot: {
    position: 'absolute',
    borderWidth: 1,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
  avatar: {
    position: 'absolute',
    top: 3,
    left: 7,
    zIndex: 1,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  actionBtnList: {
    flexGrow: 1,
    gap: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionBtn: {
    ...BaseStyles.flexRowItemsCenter,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#E3E9ED',
    alignSelf: 'flex-start',
    columnGap: 8,
  },
  actionBtnText: {
    ...Typography.body14Medium,
    color: '#505F79',
  },
  separator: {
    height: 1,
    overflow: 'hidden',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginBottom: 12,
  },
  separatorInner: {
    height: 2,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
})
