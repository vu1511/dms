import { useEffect, useRef } from 'react'
import { AppState, Platform } from 'react-native'

type UseAppStateChangeProps = {
  callback: () => void
  condition?: boolean
}

export const useAppStateChange = ({ callback, condition = true }: UseAppStateChangeProps) => {
  const firstRef = useRef<boolean>(false)

  useEffect(() => {
    const subcription = AppState.addEventListener(Platform.OS === 'android' ? 'focus' : 'change', async (e) => {
      if ((e === 'active' || Platform.OS === 'android') && condition) {
        if (!firstRef.current) {
          firstRef.current = true
        } else {
          callback()
        }
      }
    })

    return () => subcription?.remove?.()
  }, [])
}
