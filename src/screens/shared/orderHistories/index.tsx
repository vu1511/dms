import { Container, OrderHistoryList } from '@/components'
import { RouteProp, Routes } from '@/routes'
import { useRoute } from '@react-navigation/native'

const OrderHistories = () => {
  const { params } = useRoute<RouteProp<Routes.OrderHistories>>()

  return (
    <Container title="Lịch sử đơn hàng" headerShadowVisible={false}>
      <OrderHistoryList initialParams={params.initialParams} />
    </Container>
  )
}

export default OrderHistories
