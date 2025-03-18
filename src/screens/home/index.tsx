import { Container } from '@/components'
import { BaseStyles } from '@/theme'
import { ScrollView } from 'react-native'
import { HomeHeader } from './header'
import { Report } from './report'

const Home = () => {
  return (
    <Container headerShown={false}>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[BaseStyles.pb16, BaseStyles.rGap12]}
      >
        <HomeHeader />
        <Report />
      </ScrollView>
    </Container>
  )
}

export default Home
