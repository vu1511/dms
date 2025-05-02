import { useUserSlice } from '@/store'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { AuthNavigator } from './authNavigator'
import { RootNavigator } from './rootNavigator'

export const navigationRef = createNavigationContainerRef<any>()

export const AppNavigator = () => {
  const token = useUserSlice((state) => state.token)
  const accountType = useUserSlice((state) => state.userInfo?.account_type)
  // const { navigationReadyhandler } = useInitApp() // onReady={navigationReadyhandler}

  return (
    <NavigationContainer ref={navigationRef}>
      {!token || accountType === 'th' ? <AuthNavigator /> : <RootNavigator />}
    </NavigationContainer>
  )
}
