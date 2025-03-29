import { Container } from '@/components'
import CustomersCheckin from './customersCheckin'

const RouteCustomers = () => {
  return (
    <Container left={null} title="Công việc" headerShadowVisible={false}>
      <CustomersCheckin />
    </Container>
  )
}

export default RouteCustomers
