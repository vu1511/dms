import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef } from 'react'

export const useScreenFocus = (callback: () => void) => {
  const navigation = useNavigation()
  const isMounted = useRef(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isMounted.current) {
        callback()
      } else {
        isMounted.current = true
      }
    })

    return () => {
      isMounted.current = false
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])
}
