import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...BaseStyles.flexRowItemsCenter,
    flex: 1,
    columnGap: 12,
  },
  bar: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    width: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  percent: {
    backgroundColor: Colors.active,
    borderTopRightRadius: 12.5,
    borderBottomRightRadius: 12.5,
    height: '100%',
  },
  percentLabel: {
    ...Typography.body12Medium,
  },
})

export default styles
