import { BaseStyles, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: BaseStyles.flexRowItemsCenter,
  input: {
    ...Typography.body14Medium,
    lineHeight: 18,
    textAlign: 'center',
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    width: 42,
  },
  inputTextSmall: {
    ...Typography.body12Medium,
    lineHeight: 16,
  },
  btn: {
    ...BaseStyles.flexCenter,
    backgroundColor: '#E5EFFF',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  opacity50: {
    opacity: 0.5,
  },
})
