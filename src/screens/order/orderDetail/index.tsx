import { ShareIcon, ThreeDotsHorizontalIcon } from '@/assets'
import {
  BottomAreaView,
  Chip,
  Container,
  Empty,
  IconButton,
  LineItem,
  ListItem,
  ListItemSeparator,
  Popover,
} from '@/components'
import { SwrKey } from '@/constants'
import { System } from '@/core'
import { RouteProp, Routes } from '@/routes'
import { orderAPI } from '@/services'
import { BaseStyles, Colors, Typography } from '@/theme'
import { OrderStateColor } from '@/types'
import { formatMoneyVND } from '@/utils'
import { useRoute } from '@react-navigation/native'
import { ScrollView, Text, View } from 'react-native'
import Share from 'react-native-share'
import { SvgXml } from 'react-native-svg'
import useSWR from 'swr'
import { CartLoading } from './cartLoading'
import { OrderProductItem } from './orderProductItem'
import { PromotionsAppliedOnOrderView } from './promotionsAppliedOnOrderView'
import { StatusOrder } from './statusOrder'
import { styles } from './styles'

const OrderDetail = () => {
  const { params } = useRoute<RouteProp<Routes.OrderDetail>>()
  const { orderId } = params

  const { data, isLoading } = useSWR(SwrKey.orderHistoryDetail(orderId), () =>
    orderAPI
      .getOrderHistoryDetail({ sale_order_id: orderId })
      .then((res) => res.result?.data?.info_booking)
      .catch(() => undefined)
  )

  const { data: shareOrderFile } = useSWR(SwrKey.shareOrderFile(orderId), () =>
    orderAPI
      .getOrderPrint({ sale_id: orderId })
      .then((res) => res?.result?.data)
      .catch(() => undefined)
  )

  const handleShare = async () => {
    if (!shareOrderFile || !data) return

    try {
      await Share.open({
        title: data.name,
        filenames: [data.name],
        url: `data:application/pdf;base64,${shareOrderFile}`,
        failOnCancel: false,
      })
    } catch (error) {
      System.showToast({
        type: 'danger',
        message: 'Có lỗi xảy ra khi chia sẻ đơn hàng',
        description: 'Vui lòng thử lại sau',
      })
    }
  }

  return (
    <Container
      title="Chi tiết đơn hàng"
      right={
        !data ? null : (
          <Popover
            offset={4}
            popoverStyle={{ width: 220 }}
            trigger={<IconButton icon={ThreeDotsHorizontalIcon} size={20} color={Colors.gray80} />}
          >
            {({ closePopover }) => (
              <>
                <ListItem
                  title="Chia sẻ đơn hàng"
                  disabled={!shareOrderFile}
                  left={<ShareIcon size={16} fill={Colors.gray80} />}
                  onPress={() => {
                    closePopover()
                    handleShare()
                  }}
                />
              </>
            )}
          </Popover>
        )
      }
    >
      {isLoading ? (
        <CartLoading />
      ) : !data ? (
        <Empty title="Không tìm thấy đơn hàng" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <View style={styles.section}>
            <StatusOrder state={data.state} state_delivery={data.state_delivery} state_paid={data.state_paid} />
          </View>

          <View style={styles.section}>
            <View style={BaseStyles.rGap2}>
              <View style={[BaseStyles.flexRowItemsCenter]}>
                <Text style={styles.textNormalGray}>Ngày tạo đơn: {data.create_date}</Text>
              </View>
              <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
                <Text style={{ ...Typography.body18SemiBold, fontSize: 24, lineHeight: 36, flexShrink: 1 }}>
                  #{data.name}
                </Text>
                <Chip
                  label={data?.state_view?.name}
                  color={OrderStateColor?.[data?.state_view?.value] || Colors.gray80}
                />
              </View>
              <View style={BaseStyles.rGap8}>
                <LineItem labelStyle={styles.lineItemLabel} label="Công ty" value={data.company_name} />
                <LineItem labelStyle={styles.lineItemLabel} label="Người tạo đơn" value={data?.sell_by} />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={BaseStyles.rGap12}>
              <View style={BaseStyles.rGap8}>
                <LineItem labelStyle={styles.lineItemLabel} label="Tên khách hàng" value={data.partner_name} />
                <LineItem labelStyle={styles.lineItemLabel} label="Số điện thoại" value={data.partner_phone} />
                <LineItem labelStyle={styles.lineItemLabel} label="Địa chỉ" value={data.partner_address} />
              </View>
            </View>
          </View>

          {data.note && (
            <View style={[styles.section, BaseStyles.rGap12]}>
              <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
                <SvgXml xml='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6.875 4.12498C6.39175 4.12498 6 4.51674 6 4.99998C6 5.48323 6.39175 5.87498 6.875 5.87498H13.125C13.6082 5.87498 14 5.48323 14 4.99998C14 4.51674 13.6082 4.12498 13.125 4.12498H6.875Z" fill="#0D1A31"/><path d="M6 8.12498C6 7.64174 6.39175 7.24998 6.875 7.24998H13.125C13.6082 7.24998 14 7.64174 14 8.12498C14 8.60823 13.6082 8.99998 13.125 8.99998H6.875C6.39175 8.99998 6 8.60823 6 8.12498Z" fill="#0D1A31"/><path d="M6.875 10.375C6.39175 10.375 6 10.7667 6 11.25C6 11.7332 6.39175 12.125 6.875 12.125H10C10.4832 12.125 10.875 11.7332 10.875 11.25C10.875 10.7667 10.4832 10.375 10 10.375H6.875Z" fill="#0D1A31"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 0.999985C4.10622 0.999985 2.875 2.2312 2.875 3.74998V16.25C2.875 17.7688 4.10622 19 5.625 19H14.375C15.8938 19 17.125 17.7688 17.125 16.25V3.74998C17.125 2.2312 15.8938 0.999985 14.375 0.999985H5.625ZM4.625 3.74998C4.625 3.1977 5.07272 2.74998 5.625 2.74998H14.375C14.9273 2.74998 15.375 3.1977 15.375 3.74998V16.25C15.375 16.8023 14.9273 17.25 14.375 17.25H5.625C5.07272 17.25 4.625 16.8023 4.625 16.25V3.74998Z" fill="#0D1A31"/></svg>' />
                <Text style={styles.sectionTitle}>Ghi chú đơn hàng</Text>
              </View>
              <Text style={styles.textNormalBlack}>{data.note}</Text>
            </View>
          )}

          <View style={[styles.section, BaseStyles.rGap12]}>
            <View style={BaseStyles.rGap8}>
              {data.products.map((item, index) => (
                <OrderProductItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  uom={item.product_uom}
                  quantity={item?.quantity}
                  image={item.image_url?.[0]}
                />
              ))}
            </View>

            {data?.discount?.length ? (
              <>
                <ListItemSeparator />
                <PromotionsAppliedOnOrderView data={data.discount} />
              </>
            ) : null}
          </View>

          <View style={[styles.section, styles.summary]}>
            <LineItem label="Tổng tiền" value={formatMoneyVND(data?.amount_subtotal)} />
            <LineItem label="Phí vận chuyển" value={formatMoneyVND(data?.shipping_fee)} />
            <LineItem
              label="Chiết khấu"
              labelStyle={styles.summaryItemLabelItalic}
              value={`-${formatMoneyVND(data?.promotion_total)}`}
            />
            <LineItem label="Thành tiền" value={formatMoneyVND(data?.amount_total)} />
            <ListItemSeparator />
            <LineItem label="Tổng điểm sử dụng" value={`-${formatMoneyVND(data?.translate_point, '')}`} />
            <LineItem
              label="Tổng điểm tích luỹ"
              value={formatMoneyVND(data?.partner_point, '')}
              valueStyle={{ color: Colors.primary }}
            />
            <LineItem
              label="Điểm tích do mua hàng"
              value={`+${formatMoneyVND(data?.loyal_point_sale, '')}`}
              valueStyle={{ color: Colors.primary }}
            />
          </View>

          <BottomAreaView bgColor={Colors.transparent} />
        </ScrollView>
      )}
    </Container>
  )
}

export default OrderDetail
