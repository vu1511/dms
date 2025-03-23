import { VisibleAction } from '@/types'
import { RefObject, useCallback, useMemo, useRef } from 'react'
import { Keyboard } from 'react-native'

export type UseVisibleRef = {
  ref: RefObject<VisibleAction>
  onClose: () => void
  onOpen: () => void
}

export const useVisibleRef = (shouldDismissKeyboard = true): UseVisibleRef => {
  const ref = useRef<VisibleAction>(null)

  const onClose = useCallback(() => {
    shouldDismissKeyboard && Keyboard.dismiss()
    ref.current?.close()
  }, [shouldDismissKeyboard])

  const onOpen = useCallback(() => {
    shouldDismissKeyboard && Keyboard.dismiss()
    ref.current?.open()
  }, [shouldDismissKeyboard])

  return useMemo(
    () => ({
      ref,
      onClose,
      onOpen,
    }),
    [ref, onClose, onOpen]
  )
}
