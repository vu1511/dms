import { ArrowLeftIcon } from '@/assets'
import { BaseStyles, Colors } from '@/theme'
import { useNavigation } from '@react-navigation/native'
import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IconButton } from '../button'
import Header, { HeaderProps } from '../header'

type ContainerProps = Partial<HeaderProps> & {
  backgroundColor?: string
  children?: ReactNode
  headerShown?: boolean
  headerShadowVisible?: boolean
  contentStyle?: StyleProp<ViewStyle>
}

const Container = ({
  children,
  headerShown = true,
  headerShadowVisible = true,
  backgroundColor = Colors.background,
  contentStyle,
  ...props
}: ContainerProps) => {
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={BaseStyles.flex1}>
      {headerShown ? (
        <View
          style={[
            { paddingTop: top, backgroundColor: Colors.white },
            headerShadowVisible && { ...BaseStyles.shadowMd, zIndex: 10 },
          ]}
        >
          <Header
            left={<IconButton size={20} icon={ArrowLeftIcon} color={Colors.gray80} onPress={goBack} />}
            {...props}
          />
        </View>
      ) : null}
      <View style={[BaseStyles.flex1, { backgroundColor }, contentStyle]}>{children}</View>
    </View>
  )
}

export default Container
