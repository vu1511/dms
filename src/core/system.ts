import { useCoreSlice } from '@/store'
import { PopupState, ToastOptions } from '@/types'
import { showMessage } from 'react-native-flash-message'

class System {
  static showToast(params: ToastOptions) {
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
      ...params,
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
