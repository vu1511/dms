import { StyleSheet } from 'react-native'
import { Colors } from './color'

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
  pt72: {
    paddingTop: 72,
  },
  pb8: {
    paddingBottom: 8,
  },
  py4: {
    paddingVertical: 4,
  },
  py3: {
    paddingVertical: 3,
  },
  p16: {
    padding: 16,
  },
  px16: {
    paddingHorizontal: 16,
  },
  py16: {
    paddingVertical: 16,
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

  // Flexbox
  flex1: {
    flex: 1,
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
    shadowColor: Colors.gray30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: Colors.gray40,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  shadowLg: {
    shadowColor: Colors.gray50,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  shadowXl: {
    shadowColor: Colors.gray60,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
})
