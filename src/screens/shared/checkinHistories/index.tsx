import { Container, CustomersLoading, QueryInfiniteList } from '@/components'
import { userAPI } from '@/services'
import { BaseStyles } from '@/theme'
import { AccountType, AttendanceRes, CustomerId, GetAttendanceReq } from '@/types'
import { removeEmptyValueFromObject } from '@/utils'
import { ListRenderItem } from '@shopify/flash-list'
import { useCallback, useState } from 'react'
import { ItemAttendance } from './item'

const CheckinHistories = ({
  customerId,
  customerType,
}: CustomerId & {
  customerType: AccountType
}) => {
  const [initialParams] = useState<GetAttendanceReq>(
    removeEmptyValueFromObject({
      type_checkin: 'no_sale',
      customer_id: customerType === 'th' ? customerId : undefined,
      partner_id: customerType !== 'th' ? customerId : undefined,
    })
  )

  const renderItem: ListRenderItem<AttendanceRes> = useCallback(
    ({ item }) => (
      <ItemAttendance
        onPress={() => {}}
        imgUrl={item.image}
        checkInDate={item.check_in}
        status={item.store_status?.value}
        statusLabel={item.store_status?.name}
      />
    ),
    []
  )

  return (
    <Container title="Lịch sử check-in">
      <QueryInfiniteList
        provider="FlashList"
        estimatedItemSize={80}
        swrKey="attendance_photos"
        emptyTitle="Không có hình ảnh nào"
        renderItem={renderItem}
        ListLoadingComponent={<CustomersLoading />}
        fetcher={userAPI.getListAttendanceByDay}
        contentContainerStyle={BaseStyles.pt16}
        initialParams={initialParams}
      />
    </Container>
  )
}

export default CheckinHistories
