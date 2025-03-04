import { Colors, Typography } from '@/theme'
import { ToastProps } from '@/types'
import { Platform } from 'react-native'
import FlashMessage from 'react-native-flash-message'

const Toast = (props: ToastProps) => {
  return (
    <FlashMessage
      position="top"
      type="success"
      duration={2000}
      style={{ paddingTop: Platform.select({ android: 32 }) }}
      titleStyle={[Typography.body14Medium, { color: Colors.white }]}
      textStyle={[Typography.body13Normal, { color: Colors.white }]}
      {...props}
    />
  )
}

export default Toast
