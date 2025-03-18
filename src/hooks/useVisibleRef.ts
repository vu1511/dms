import { VisibleAction } from '@/types'
import { RefObject, useCallback, useMemo, useRef } from 'react'

export type UseVisibleRef = {
  ref: RefObject<VisibleAction>
  onClose: () => void
  onOpen: () => void
}

export const useVisibleRef = (): UseVisibleRef => {
  const ref = useRef<VisibleAction>(null)

  const onClose = useCallback(() => {
    ref.current?.close()
  }, [])

  const onOpen = useCallback(() => {
    ref.current?.open()
  }, [])

  return useMemo(
    () => ({
      ref,
      onClose,
      onOpen,
    }),
    [ref, onClose, onOpen]
  )
}
