import { Container } from '@/components'
import { BaseStyles } from '@/theme'
import { ScrollView } from 'react-native'
import { HomeHeader } from './header'
import { Report } from './report'
import { Menu } from './menu'

const Home = () => {
  return (
    <Container headerShown={false}>
      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[BaseStyles.pb16, BaseStyles.rGap12]}
      >
        <HomeHeader />
        <Report />
        <Menu />
      </ScrollView>
    </Container>
  )
}

export default Home
