import { type EmptyProps } from '@/components'
import { type FlashList, type FlashListProps } from '@shopify/flash-list'
import { StyleProp, ViewStyle, type FlatList, type FlatListProps } from 'react-native'

export type Provider = 'FlatList' | 'FlashList'

export type ListProvider<Data = any, P extends Provider = 'FlatList'> = P extends 'FlatList'
  ? FlatListProps<Data>
  : FlashListProps<Data>

type Element =
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | null
  | undefined

export type ListRef<Data = any, P extends Provider = 'FlatList'> = P extends 'FlatList'
  ? FlatList<Data>
  : FlashList<Data>

export type ListProps<Data = any, P extends Provider = 'FlatList'> = ListProvider<Data, P> & {
  provider?: P
  isLoading?: boolean
  hasMore?: boolean
  emptyTitle?: string
  emptyProps?: EmptyProps
  showBottomAreaView?: boolean
  containerStyle?: StyleProp<ViewStyle>
  ListLoadingComponent?: Element
}
