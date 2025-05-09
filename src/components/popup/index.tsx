import { BaseStyles, Colors, Typography } from '@/theme'
import React, { ReactNode, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Portal } from 'react-native-portalize'
import Animated, { FadeIn, FadeOut, runOnJS } from 'react-native-reanimated'
import { Button, ButtonProps } from '../button'

export type PopupProps = {
  visible: boolean
  message?: string | ReactNode
  description?: string | ReactNode
  cancelBtnText?: string
  confirmBtnText?: string
  cancelBtnProps?: Partial<ButtonProps>
  confirmBtnProps?: Partial<ButtonProps>
  onClose?(): void
  onDismiss?(): void
  onCancel?(): void
  onConfirm?(): void | Promise<void>
}

const Popup = ({
  message,
  description,
  visible,
  cancelBtnText = 'Đóng',
  confirmBtnText = 'Xác nhận',
  cancelBtnProps,
  confirmBtnProps,
  onClose,
  onCancel,
  onConfirm,
  onDismiss,
}: PopupProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = () => {
    onCancel?.()
    onClose?.()
  }

  const handleConfirm = async () => {
    if (!onConfirm) return

    const instance = onConfirm()

    if (instance instanceof Promise) {
      try {
        setIsLoading(true)
        await instance
      } finally {
        onClose?.()
        setIsLoading(false)
      }
    } else {
      onClose?.()
    }
  }

  if (!visible) {
    return null
  }

  return (
    <Portal>
      <Animated.View
        style={[styles.modal]}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200).withCallback((finished) => {
          if (finished && onDismiss) {
            runOnJS(onDismiss)()
          }
        })}
      >
        <View style={styles.container}>
          <View style={styles.body}>
            {message ? React.isValidElement(message) ? message : <Text style={styles.title}>{message}</Text> : null}
            {description ? (
              React.isValidElement(description) ? (
                description
              ) : (
                <Text style={styles.desc}>{description}</Text>
              )
            ) : null}
          </View>
          <View style={styles.footer}>
            {onCancel ? (
              <Button
                readOnly={isLoading}
                title={cancelBtnText}
                onPress={handleCancel}
                style={styles.cancelBtn}
                textStyle={styles.cancelBtnText}
                {...cancelBtnProps}
              />
            ) : null}
            {onConfirm ? (
              <Button loading={isLoading} title={confirmBtnText} onPress={handleConfirm} {...confirmBtnProps} />
            ) : null}
          </View>
        </View>
      </Animated.View>
    </Portal>
  )
}

export default Popup

const styles = StyleSheet.create({
  modal: {
    ...BaseStyles.flexCenter,
    flex: 1,
    backgroundColor: Colors.black50,
  },
  container: {
    width: 320,
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    rowGap: 16,
  },
  body: {
    rowGap: 8,
  },
  title: {
    ...Typography.body18SemiBold,
    color: '#212121',
    textAlign: 'center',
  },
  desc: {
    ...Typography.body16Normal,
    color: '#0D1A31',
    textAlign: 'center',
  },
  footer: {
    rowGap: 12,
  },
  cancelBtn: {
    backgroundColor: '#E3E9ED',
  },
  cancelBtnText: {
    color: '#505F79',
  },
})
