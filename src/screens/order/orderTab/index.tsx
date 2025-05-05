import { PlusIcon } from '@/assets'
import { Container, OrderHistoryList } from '@/components'
import { Colors } from '@/theme'

const OrderTab = () => {
  return (
    <Container
      left={null}
      title="Lịch sử đơn hàng"
      headerShadowVisible={false}
      right={<PlusIcon fill={Colors.gray80} size={20} />}
    >
      <OrderHistoryList />
    </Container>
  )
}

export default OrderTab
