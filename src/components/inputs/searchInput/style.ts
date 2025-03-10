import { Colors, Spacings, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputContainer: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Spacings.sm,
    backgroundColor: Colors.inputBg,
    borderColor: Colors.transparent,
    paddingHorizontal: 12,
  },
  inputText: {
    ...Typography.body14Normal,
    lineHeight: undefined,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
    paddingHorizontal: 8,
  },
})
