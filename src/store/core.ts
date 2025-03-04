import { PopupState } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type State = {
  backdropVisible: boolean
  setBackdropVisible: (value: boolean) => void
  popup: PopupState
  setPopup: (params: PopupState) => void
  isUploadingImage: boolean
  setIsUploadingImage: (params: boolean) => void
}

export const useCoreSlice = create<State, [['zustand/devtools', never], ['zustand/immer', never]]>(
  devtools(
    immer((set) => ({
      backdropVisible: false,
      isUploadingImage: false,
      newMessageInConversationAppend: undefined,
      popup: { visible: false },
      setBackdropVisible: (backdropVisible) =>
        set((state) => {
          state.backdropVisible = backdropVisible
        }),
      setPopup: (params) =>
        set((state) => {
          state.popup = params
        }),
      setIsUploadingImage: (params) =>
        set((state) => {
          state.isUploadingImage = params
        }),
    }))
  )
)
