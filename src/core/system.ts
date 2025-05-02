import { useCoreSlice } from '@/store'
import { PopupState, ToastOptions } from '@/types'
import { setStringAsync } from 'expo-clipboard'
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

  static async copyToClipboard(value: string, options?: ToastOptions) {
    try {
      await setStringAsync(value)
      this.showToast({ message: 'Đã sao chép', type: 'info', ...options })
    } catch (error) {}
  }
}

export default System
