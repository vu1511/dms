import { useCallback, useMemo, useState } from 'react'

export const useVisible = (initialState?: boolean | (() => boolean)) => {
  const [visible, setVisible] = useState<boolean>(initialState ?? false)

  const onClose = useCallback(() => setVisible(false), [])
  const onOpen = useCallback(() => setVisible(true), [])
  const toggle = useCallback(() => setVisible((value) => !value), [])

  return useMemo(
    () => ({
      visible,
      onClose,
      onOpen,
      toggle,
    }),
    [onClose, onOpen, toggle, visible]
  )
}
