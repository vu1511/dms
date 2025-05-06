import { ArrowLeftIcon } from '@/assets'
import { BaseStyles, Colors } from '@/theme'
import { useNavigation } from '@react-navigation/native'
import { ReactNode, useCallback, useMemo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IconButton } from '../button'
import Header, { HeaderProps } from '../header'

type ContainerProps = Partial<HeaderProps> & {
  backgroundColor?: string
  children?: ReactNode
  headerShown?: boolean
  headerBackground?: string
  headerShadowVisible?: boolean
  HeaderComponent?: ReactNode
  contentStyle?: StyleProp<ViewStyle>
}

const Container = ({
  children,
  headerShown = true,
  headerShadowVisible = true,
  headerBackground = Colors.white,
  backgroundColor = Colors.background,
  contentStyle,
  HeaderComponent,
  ...props
}: ContainerProps) => {
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()

  const headerStyles = useMemo(
    () => [
      { paddingTop: top, backgroundColor: headerBackground },
      headerShadowVisible && { ...BaseStyles.shadowSm, zIndex: 10 },
    ],
    [headerBackground, headerShadowVisible, top]
  )

  const childrenStyle = useMemo(
    () => [BaseStyles.flex1, { backgroundColor }, contentStyle],
    [backgroundColor, contentStyle]
  )

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <View style={BaseStyles.flex1}>
      {headerShown ? (
        <View style={headerStyles}>
          <Header
            left={<IconButton size={20} icon={ArrowLeftIcon} color={Colors.gray80} onPress={goBack} />}
            {...props}
          />
          {HeaderComponent}
        </View>
      ) : null}
      <View style={childrenStyle}>{children}</View>
    </View>
  )
}

export default Container
