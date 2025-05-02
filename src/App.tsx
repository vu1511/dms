import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Host } from 'react-native-portalize'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SWRConfig } from 'swr'
import { Providers } from './providers'
import { AppNavigator } from './routes'
import { BaseStyles, Colors } from './theme'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-MediumItalic': require('./assets/fonts/Inter-MediumItalic.ttf'),
    'Inter-NormalItalic': require('./assets/fonts/Inter-NormalItalic.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        provider: () => new Map(),
        isVisible: () => {
          return true
        },
        initFocus(callback) {
          let appState = AppState.currentState

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
              callback()
            }
            appState = nextAppState
          }

          const subscription = AppState.addEventListener('change', onAppStateChange)

          return () => {
            subscription?.remove?.()
          }
        },
      }}
    >
      <StatusBar style="dark" backgroundColor={Colors.transparent} translucent />
      <SafeAreaProvider>
        <GestureHandlerRootView style={BaseStyles.flex1}>
          <Host>
            <BottomSheetModalProvider>
              <KeyboardProvider statusBarTranslucent>
                <Providers />
                <AppNavigator />
              </KeyboardProvider>
            </BottomSheetModalProvider>
          </Host>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </SWRConfig>
  )
}
