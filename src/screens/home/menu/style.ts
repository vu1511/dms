import { Colors, BaseStyles, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  title: {
    ...Typography.body16SemiBold,
    marginBottom: 16,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -12,
  },
  listItem: {
    ...BaseStyles.flexCenter,
    width: '25%',
    paddingRight: 24,
    paddingBottom: 24,
  },
  listItemInner: {},
  listItemIcon: {
    opacity: 1,
    borderRadius: 12,
    width: 48,
    height: 48,
    ...BaseStyles.flexCenter,
  },
  listItemText: {
    ...Typography.body12Normal,
    marginTop: 8,
    lineHeight: 16,
    textAlign: 'center',
    flex: 1,
    color: Colors.gray80,
  },
})
