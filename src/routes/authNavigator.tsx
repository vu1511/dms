import { ChangePassword, Login } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Routes } from './types'

const Stack = createNativeStackNavigator()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{
        headerShown: false,
        // statusBarBackgroundColor: COLORS.transparent,
        // statusBarTranslucent: true,
        // statusBarStyle: 'dark',
      }}
    >
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.ChangePassword} component={ChangePassword} />
    </Stack.Navigator>
  )
}
