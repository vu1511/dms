import { Colors } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  footer: {
    padding: 16,
    columnGap: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  footerLeftBtn: {
    height: 42,
    flex: 1,
    backgroundColor: '#E3E9ED',
  },
  footerLeftBtnText: {
    color: '#505F79',
  },
  footerRightBtn: {
    height: 42,
    flex: 1,
  },
})
