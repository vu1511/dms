import { useCoreSlice } from '@/store'
import { PopupState, ToastState } from '@/types'
import { showMessage } from 'react-native-flash-message'

class System {
  static showToast(params: ToastState) {
    showMessage({
      autoHide: true,
      message: params.message,
      type: params.type ?? 'success',
      duration: params.duration ?? 2000,
      position: params.position ?? 'top',
      description: params.description,
    })
  }

  static showPopup(params: Omit<PopupState, 'visible'>) {
    useCoreSlice.getState().setPopup({
      visible: true,
      message: params.message,
      description: params.description,
      cancelBtnText: params.cancelBtnText,
      confirmBtnText: params.confirmBtnText,
      onCancel: params.onCancel,
      onConfirm: params.onConfirm,
    })
  }

  static showBackdrop() {
    useCoreSlice.getState().setBackdropVisible(true)
  }

  static closeBackdrop() {
    useCoreSlice.getState().setBackdropVisible(false)
  }
}

export default System
