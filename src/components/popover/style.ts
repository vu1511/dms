import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  triggerBtn: {
    alignSelf: 'flex-start',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  popover: {
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
  shadow: {
    shadowColor: '#262626',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
})
