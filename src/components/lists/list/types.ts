import { type EmptyProps } from '@/components'
import { type FlashList, type FlashListProps } from '@shopify/flash-list'
import type { FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native'

type ListProvider = 'FlatList' | 'FlashList'

type ListProviderProps<Data = any, Provider extends ListProvider = 'FlatList'> = Provider extends 'FlatList'
  ? FlatListProps<Data>
  : FlashListProps<Data>

type ListElement =
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | null
  | undefined

type ListRef<Data = any, Provider extends ListProvider = 'FlatList'> = Provider extends 'FlatList'
  ? FlatList<Data>
  : FlashList<Data>

type ListProps<Data = any, Provider extends ListProvider = 'FlatList'> = ListProviderProps<Data, Provider> & {
  provider?: Provider
  isLoading?: boolean
  hasMore?: boolean
  emptyTitle?: string
  emptyProps?: EmptyProps
  showBottomAreaView?: boolean
  containerStyle?: StyleProp<ViewStyle>
  ListLoadingComponent?: ListElement
  StickyHeaderComponent?: ListElement
  StickyFooterComponent?: ListElement
}

export { ListProps, ListProvider, ListProviderProps, ListRef, ListElement }
