import { type RouteProp as RNRouteProp } from '@react-navigation/native'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IconProps } from './core'

export type StackParamsList = {
  Home: undefined
}

export type StackParamsListKey = keyof StackParamsList

export type Navigation = NativeStackNavigationProp<StackParamsList, StackParamsListKey>

export type RouteProp<RouteName extends keyof StackParamsList> = RNRouteProp<StackParamsList, RouteName>

export interface RouteData {
  route: string
  label: string
  Component: () => JSX.Element | null
  Icon: (props: IconProps) => JSX.Element
  IconActive: (props: IconProps) => JSX.Element
}
