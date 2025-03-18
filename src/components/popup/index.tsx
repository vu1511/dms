import { BaseStyles, Colors, Typography } from '@/theme'
import React, { ReactNode, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
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

  return (
    <Modal
      onDismiss={onDismiss}
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={200}
      animationInTiming={150}
      style={styles.modal}
      backdropOpacity={0.5}
      backdropTransitionOutTiming={1}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
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
    </Modal>
  )
}

export default Popup

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    ...BaseStyles.flexCenter,
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
