import { Popup as PopupComponent } from '@/components'
import { useCoreSlice } from '@/store'
import { isAsyncFunction } from '@/utils'
import { Portal } from 'react-native-portalize'

const Popup = () => {
  const popup = useCoreSlice((state) => state.popup)
  const setPopup = useCoreSlice((state) => state.setPopup)

  const { visible, message, cancelBtnText, confirmBtnText, description, onCancel, onConfirm } = popup
  const isAsyncConfirmFunction = isAsyncFunction(onConfirm)

  const closePopup = () => {
    setPopup({ ...popup, visible: false })
  }

  const clearPopup = () => {
    setPopup({ visible: false })
  }

  const confirmAsync = async () => {
    await onConfirm?.()
    closePopup()
  }

  const confirmSync = () => {
    onConfirm?.()
    closePopup()
  }

  const handleCancel = () => {
    onCancel?.()
    closePopup()
  }

  return (
    <Portal>
      <PopupComponent
        visible={visible}
        message={message}
        description={description}
        cancelBtnText={cancelBtnText}
        confirmBtnText={confirmBtnText}
        onDismiss={clearPopup}
        onCancel={onCancel ? handleCancel : undefined}
        onConfirm={onConfirm ? (isAsyncConfirmFunction ? confirmAsync : confirmSync) : undefined}
      />
    </Portal>
  )
}

export default Popup
