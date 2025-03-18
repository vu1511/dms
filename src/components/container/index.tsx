import { BaseStyles, Colors } from '@/theme'
import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Header, { HeaderProps } from '../header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from '../button'
import { ArrowLeftIcon } from '@/assets'

type ContainerProps = Partial<HeaderProps> & {
  backgroundColor?: string
  children?: ReactNode
  headerShown?: boolean
  contentStyle?: StyleProp<ViewStyle>
}

const Container = ({
  children,
  backgroundColor = Colors.background,
  headerShown = true,
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
        <View style={{ paddingTop: top, backgroundColor: Colors.white }}>
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
