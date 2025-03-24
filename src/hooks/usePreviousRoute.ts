import { Navigation, StackParamsList, StackParamsListKey } from '@/routes'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useRef } from 'react'

type Route = {
  key: string
  path?: string
  name: StackParamsListKey
  params?: StackParamsList[StackParamsListKey]
}

/**
  The usePreviousRoute hook is designed to track and capture the previous route (or screen) in a React Navigation setup,
  whether it's a stack or tab navigator. This is useful when you need to know where the user navigated from when they land on a new screen.
**/
export const usePreviousRoute = (callback: (prevRoute: Route | null) => void) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation<Navigation>()

  const firstRef = useRef<boolean>(false)
  const prevRouteRef = useRef<Route | null>(null)

  useEffect(() => {
    if (firstRef.current === false) {
      firstRef.current = true
    } else if (isFocused) {
      callback(prevRouteRef.current)
      if (prevRouteRef?.current) {
        prevRouteRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused])

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const type = navigation?.getState?.()?.type
      let routes: Route[] = []

      if (type === 'stack') {
        routes = navigation?.getState?.()?.routes || []
      } else if (type === 'tab') {
        routes = (navigation?.getParent?.()?.getState?.()?.routes || []) as Route[]
      }

      prevRouteRef.current = routes?.[routes.length - 1] ?? null
    })

    return unsubscribe
  }, [navigation])
}
