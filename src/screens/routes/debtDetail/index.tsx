import { CopyIcon } from '@/assets'
import { BottomAreaView, Chip, Container, DotSeparator, Empty, LineItem } from '@/components'
import { SwrKey } from '@/constants'
import { System } from '@/core'
import { RouteProp, Routes } from '@/routes'
import { CartLoading } from '@/screens/order/orderDetail/cartLoading'
import { debtAPI } from '@/services'
import { BaseStyles, Colors, Typography } from '@/theme'
import { DebtPaymentStateColor, DebtStateColor } from '@/types'
import { formatMoneyVND, replaceLineBreaks } from '@/utils'
import { useRoute } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import useSWR from 'swr'

const DebtDetail = () => {
  const {
    params: { debtId, initialData },
  } = useRoute<RouteProp<Routes.DebtDetail>>()
  const { data, isLoading } = useSWR(SwrKey.debtDetail(debtId), () =>
    debtAPI
      .getDetailDebt({ payment_id: debtId })
      .then((res) => res?.result?.data)
      .catch(() => undefined)
  )

  const address = replaceLineBreaks(data?.partner?.contact_address ?? '')
  const phone = data?.partner?.phone ?? ''
  const invoiceLines = data?.invoice_line_ids

  return (
    <Container title={`Chi tiết công nợ${data?.id ? ` (#${data.id})` : ''}`}>
      {isLoading ? (
        <CartLoading />
      ) : !data ? (
        <Empty title="Không tìm thấy công nợ" />
      ) : (
        <ScrollView contentContainerStyle={{ paddingVertical: 12, rowGap: 12 }} showsVerticalScrollIndicator={false}>
          <View style={[styles.card, BaseStyles.rGap8]}>
            <View style={BaseStyles.rGap2}>
              <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
                <Text style={styles.name}>{data.name}</Text>
                <Chip color={DebtStateColor?.[data.state?.value] || Colors.gray80} label={data.state?.name} />
              </View>
              {data.ref && <Text style={styles.text12NormalGray}>Ref: {data.ref}</Text>}
            </View>
            <LineItem label="Ngày tạo" value={data.create_date} valueStyle={{ textTransform: 'capitalize' }} />
            <LineItem label="Công ty" value={data.company?.name ?? ''} valueStyle={{ textTransform: 'capitalize' }} />
          </View>
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, BaseStyles.mb8]}>Khách hàng</Text>
            <View style={BaseStyles.rGap8}>
              <LineItem
                label="Tên khách hàng"
                value={data.partner?.name ?? ''}
                valueStyle={{ textTransform: 'capitalize' }}
              />
              <LineItem
                value={phone}
                label="Số điện thoại"
                valueStyle={{ textTransform: 'capitalize' }}
                onPress={() => System.copyToClipboard(phone)}
                right={
                  <View style={{ top: 4 }}>
                    <CopyIcon size={14} fill={Colors.gray80} />
                  </View>
                }
              />
              <LineItem
                label="Địa chỉ"
                value={address}
                valueStyle={{ textTransform: 'capitalize' }}
                onPress={() => System.copyToClipboard(address)}
                right={
                  <View style={{ top: 4 }}>
                    <CopyIcon size={14} fill={Colors.gray80} />
                  </View>
                }
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8, BaseStyles.mb8]}>
              <Text style={styles.sectionTitle}>Thanh toán</Text>
              <Chip
                color={DebtPaymentStateColor?.[data.payment_state?.value] || Colors.gray80}
                label={data.payment_state?.name}
              />
            </View>
            <View style={BaseStyles.rGap8}>
              <LineItem label="Tổng tiền" value={formatMoneyVND(initialData.amount_total)} />
              <LineItem label="Đã trả" value={formatMoneyVND(initialData.amount_paid)} />
              <LineItem label="Còn lại" value={formatMoneyVND(initialData.amount_residual)} />
              <LineItem label="Loại" value={data.move_type?.name ?? ''} />
              <LineItem label="Sổ nhật ký" value={data.journal?.journal_name ?? ''} />
            </View>
          </View>
          {invoiceLines?.length ? (
            <View style={styles.card}>
              <Text style={[styles.sectionTitle, BaseStyles.mb8]}>Chi tiết giao dịch ({invoiceLines.length})</Text>
              <View style={BaseStyles.rGap8}>
                {invoiceLines.map((line) => (
                  <View key={line.id} style={styles.lineItem}>
                    <Text numberOfLines={2} style={styles.lineItemText}>
                      {line.name}
                    </Text>
                    <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
                      <Text style={styles.text12NormalGray}>Số lượng: {line.quantity}</Text>
                      <DotSeparator />
                      <Text style={styles.text12NormalGray}>Tổng tiền: {formatMoneyVND(line.price_total)}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
          <BottomAreaView bgColor={Colors.transparent} />
        </ScrollView>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  amountTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  name: {
    ...Typography.body18SemiBold,
  },
  sectionTitle: {
    ...Typography.body14SemiBold,
    flexShrink: 1,
  },
  text12NormalGray: {
    ...Typography.body12Normal,
    color: Colors.gray60,
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  lineItem: {
    borderWidth: 1,
    borderColor: Colors.gray30,
    borderRadius: 8,
    padding: 12,
    rowGap: 4,
  },
  lineItemText: {
    ...Typography.body14Medium,
    flexShrink: 1,
  },
})

export default DebtDetail
