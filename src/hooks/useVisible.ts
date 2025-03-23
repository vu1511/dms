import { useCallback, useMemo, useState } from 'react'

export const useVisible = () => {
  const [visible, setVisible] = useState<boolean>(false)

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
    [visible]
  )
}
