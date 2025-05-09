import { StyleSheet } from 'react-native'
import { Colors } from './color'
import { Typography } from './typography'

export const BaseStyles = StyleSheet.create({
  py6: {
    paddingVertical: 6,
  },
  py10: {
    paddingVertical: 10,
  },
  py8: {
    paddingVertical: 8,
  },
  pt0: {
    paddingTop: 0,
  },
  pt16: {
    paddingTop: 16,
  },
  pt12: {
    paddingTop: 12,
  },
  pt72: {
    paddingTop: 72,
  },
  mt24: {
    marginTop: 24,
  },
  mb24: {
    marginBottom: 24,
  },
  mb16: {
    marginBottom: 16,
  },
  mb8: {
    marginBottom: 8,
  },
  pl16: {
    paddingLeft: 16,
  },
  mb12: {
    marginBottom: 12,
  },
  pb0: {
    paddingBottom: 0,
  },
  pb8: {
    paddingBottom: 8,
  },
  pb16: {
    paddingBottom: 16,
  },
  pb24: {
    paddingBottom: 24,
  },
  py4: {
    paddingVertical: 4,
  },
  py3: {
    paddingVertical: 3,
  },
  p2: {
    padding: 2,
  },
  p4: {
    padding: 4,
  },
  p8: {
    padding: 8,
  },
  p12: {
    padding: 12,
  },
  p16: {
    padding: 16,
  },
  p24: {
    padding: 24,
  },
  px16: {
    paddingHorizontal: 16,
  },
  py12: {
    paddingVertical: 12,
  },
  py16: {
    paddingVertical: 16,
  },
  rGap4: {
    rowGap: 4,
  },
  rGap2: {
    rowGap: 2,
  },
  cGap2: {
    columnGap: 2,
  },
  cGap4: {
    columnGap: 4,
  },
  rGap8: {
    rowGap: 8,
  },
  cGap8: {
    columnGap: 8,
  },
  rGap12: {
    rowGap: 12,
  },
  cGap12: {
    columnGap: 12,
  },
  rGap16: {
    rowGap: 16,
  },
  cGap16: {
    columnGap: 16,
  },
  cGap24: {
    columnGap: 24,
  },
  cGap32: {
    columnGap: 32,
  },

  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },

  // Flexbox
  flex1: {
    flex: 1,
  },
  grow1: {
    flexGrow: 1,
  },
  shrink1: {
    flexShrink: 1,
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowItemsCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  opacity50: {
    opacity: 0.5,
  },
  bgTransparent: {
    backgroundColor: Colors.transparent,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },

  // Border
  border: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  borderTop: {
    color: Colors.border,
    borderTopWidth: 1,
  },

  absoluteInset: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Shadow
  shadowSm: {
    shadowColor: Colors.gray80,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: Colors.gray80,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  shadowLg: {
    shadowColor: Colors.gray80,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  shadowXl: {
    shadowColor: Colors.gray80,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },

  inputErrorMessage: {
    ...Typography.body14Normal,
    color: Colors.danger,
  },
  textCenter: {
    textAlign: 'center',
  },
})
