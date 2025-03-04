import { Colors } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  indicator: {
    backgroundColor: '#B0B0B0',
    height: 6,
    width: 36,
    borderRadius: 16,
  },
  indicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  zIndex1000: {
    zIndex: 1000,
  },
  zIndex1001: {
    zIndex: 1001,
  },
})
