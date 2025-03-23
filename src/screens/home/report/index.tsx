import { ArrowRightIcon, LocationIcon, OrderIcon, UserAddIcon, UserIcon } from '@/assets'
import { ActivityIndicator, CircularProgressBar, Typography } from '@/components'
import { Navigation, Routes } from '@/routes'
import { userAPI } from '@/services'
import { BaseStyles, Colors } from '@/theme'
import { DefaultMonthTime } from '@/types'
import { formatMoneyVND } from '@/utils'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import useSWR from 'swr'
import { Statistical } from './statistical'
import { styles } from './style'

export const Report = () => {
  const navigation = useNavigation<Navigation>()
  const [timeline, setTimeline] = useState(DefaultMonthTime)

  const fetcherHandler = async () => {
    const reportRsp = await userAPI.getReportInfoV2({ date_type: timeline.value })
    return reportRsp?.result?.data
  }

  const { data, isLoading } = useSWR(`home_report?date=${timeline.value}`, fetcherHandler)

  const currentTargetSales = data?.cumulative_sale ?? 0
  const targetSales = data?.sale_standard ?? 0
  const targetSalesRemaining = Math.max(targetSales - currentTargetSales, 0)
  const _targetSalesPercentage = Math.round((currentTargetSales / targetSales) * 100) || 0
  const targetSalesPercentage =
    _targetSalesPercentage > 100 ? 100 : _targetSalesPercentage < 0 ? 0 : _targetSalesPercentage

  const totalCheckinShop = data?.manager_data?.number_checkin ?? 0
  const targetCheckin = data?.number_standard ?? 0
  const _percentageTargetWork = Math.round((totalCheckinShop / targetCheckin) * 100) || 0
  const percentageTargetWork = _percentageTargetWork > 100 ? 100 : _percentageTargetWork < 0 ? 0 : _percentageTargetWork
  const _totalUnCheckinShop = targetCheckin - totalCheckinShop
  const totalUnCheckinShop = _totalUnCheckinShop >= 0 ? _totalUnCheckinShop : 0

  const totalNewCustomer = data?.number_new_customer ?? 0
  const totalShopHasOrder = data?.number_sale_order ?? 0
  const _totalNewCustomerPercentage = Math.round((totalNewCustomer / totalShopHasOrder) * 100) || 0

  const totalNewCustomerPercentage =
    _totalNewCustomerPercentage > 100 ? 100 : _totalNewCustomerPercentage < 0 ? 0 : _totalNewCustomerPercentage

  const navigateToHistory = () => {
    // navigation.navigate(Routes.History, { isScreen: true })
  }

  return (
    <View style={styles.container}>
      <View style={styles.statisticalArea}>
        <Statistical
          color="#49BC78"
          label={
            <View style={BaseStyles.flexRowSpaceBetween}>
              <Typography fontSize={14} fontWeight="400" color={Colors.gray70} style={BaseStyles.flex1}>
                Doanh số tháng
              </Typography>
              <TouchableOpacity
                hitSlop={12}
                activeOpacity={0.5}
                style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap4]}
                onPress={() => navigation.navigate(Routes.Report)}
              >
                <Typography fontSize={14} fontWeight="500" color={Colors.primary} style={BaseStyles.shrink1}>
                  Xem chi tiết
                </Typography>
                <ArrowRightIcon size={16} fill={Colors.primary} />
              </TouchableOpacity>
            </View>
          }
          value={
            isLoading ? (
              <View style={[BaseStyles.py8, BaseStyles.alignSelfStart]}>
                <ActivityIndicator size={24} color={Colors.primary} />
              </View>
            ) : (
              <Typography fontSize={28} lineHeight={40} fontWeight="600">
                {formatMoneyVND(data?.sale_amount_today ?? 0, '')}{' '}
                <Typography fontSize={20} fontWeight="400" color={Colors.gray70}>
                  đ
                </Typography>
              </Typography>
            )
          }
        />
        <View style={styles.statisticalList}>
          <Pressable style={BaseStyles.flex1} onPress={navigateToHistory}>
            <Statistical color="#D53F8C" label="Đơn hàng" value={formatMoneyVND(data?.total_sale_draft ?? 0, '')} />
          </Pressable>
          <Pressable style={BaseStyles.flex1} onPress={navigateToHistory}>
            <Statistical color="#F97415" label="Xuất kho" value={formatMoneyVND(data?.total_sale_stock ?? 0, '')} />
          </Pressable>
          <Pressable style={BaseStyles.flex1} onPress={navigateToHistory}>
            <Statistical color="#2378E8" label="Thu tiền" value={formatMoneyVND(data?.total_sale_invoice ?? 0, '')} />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Tổng quan
          </Text>
        </View>
        <View style={styles.listItem}>
          <View style={styles.firstItem}>
            <Pressable style={BaseStyles.flex1} onPress={() => navigation.navigate(Screen.History, { isScreen: true })}>
              <Statistical
                color="#2378E8"
                label="Đơn hàng"
                icon={<OrderIcon size={16} fill={Colors.gray70} />}
                value={isLoading ? <Loading /> : formatMoneyVND(data?.number_sale_order ?? 0, '')}
              />
            </Pressable>
          </View>
          <View style={styles.secondItem}>
            <Pressable
              style={BaseStyles.flex1}
              onPress={() => navigation.navigate(Screen.VisitHistory, { dateType: timeline?.value })}
            >
              <Statistical
                color="#49BC78"
                label="Check-in"
                icon={<LocationIcon size={16} fill={Colors.gray70} />}
                value={isLoading ? <Loading /> : formatMoneyVND(data?.manager_data?.number_checkin ?? 0, '')}
              />
            </Pressable>
          </View>
          <View style={styles.thirdItem}>
            <Pressable style={BaseStyles.flex1} onPress={() => navigation.navigate(Screen.ManagerAccount)}>
              <Statistical
                color="#F97415"
                label="Khách hàng mới"
                icon={<UserAddIcon size={16} fill={Colors.gray70} />}
                value={isLoading ? <Loading /> : formatMoneyVND(totalNewCustomer, '')}
              />
            </Pressable>
          </View>
          <View style={styles.fourthItem}>
            <Pressable style={BaseStyles.flex1} onPress={() => navigation.navigate(Screen.ManagerAccount)}>
              <Statistical
                color="#D53F8C"
                label="Khách hàng"
                icon={<UserIcon size={16} fill={Colors.gray70} />}
                value={isLoading ? <Loading /> : formatMoneyVND(data?.manager_data?.number_customer ?? 0, '')}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Doanh thu
          </Text>
        </View>
        <View style={[BaseStyles.cGap12, BaseStyles.flexRowItemsCenter]}>
          <CircularProgressBar percentage={targetSalesPercentage} />
          <View style={BaseStyles.rGap12}>
            <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
              <View style={{ height: 12, width: 12, borderRadius: 4, backgroundColor: Colors.primary }} />
              <Typography fontSize={12} fontWeight={500} style={BaseStyles.shrink1}>
                <Typography fontSize={12} fontWeight={400} color={Colors.gray70}>
                  Thực hiện:{' '}
                </Typography>
                {formatMoneyVND(currentTargetSales)}
              </Typography>
            </View>
            <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
              <View style={{ height: 12, width: 12, borderRadius: 4, backgroundColor: Colors.gray30 }} />
              <Typography fontSize={12} fontWeight={500}>
                <Typography fontSize={12} fontWeight={400} color={Colors.gray70}>
                  Mục tiêu:{' '}
                </Typography>
                {formatMoneyVND(targetSales)}
              </Typography>
            </View>
            <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
              <View style={{ height: 12, width: 12, borderRadius: 4, backgroundColor: '#49BC78' }} />
              <Typography fontSize={12} fontWeight={500}>
                <Typography fontSize={12} fontWeight={400} color={Colors.gray70}>
                  Còn:{' '}
                </Typography>
                {formatMoneyVND(targetSalesRemaining)}
              </Typography>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={[styles.section, { flex: 1 }]}>
          <View style={styles.header}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              Tổng khách mua hàng
            </Text>
          </View>
          <View style={BaseStyles.rGap12}>
            <CircularProgressBar percentage={totalNewCustomerPercentage} />
            <View style={BaseStyles.rGap4}>
              <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
                <View style={{ height: 12, width: 12, borderRadius: 4, backgroundColor: Colors.primary }} />
                <Typography fontSize={12} fontWeight={500}>
                  <Typography fontSize={12} fontWeight={400} color={Colors.gray70}>
                    Khách mới:{' '}
                  </Typography>
                  {formatMoneyVND(totalNewCustomer, '')}
                </Typography>
              </View>
              <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
                <View style={{ height: 12, width: 12, borderRadius: 4, backgroundColor: Colors.gray30 }} />
                <Typography fontSize={12} fontWeight={500}>
                  <Typography fontSize={12} fontWeight={400} color={Colors.gray70}>
                    Tổng:{' '}
                  </Typography>
                  {formatMoneyVND(totalShopHasOrder, '')}
                </Typography>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.section, { flex: 1 }]}>
          <View style={styles.header}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              Check-in
            </Text>
          </View>
          <View style={BaseStyles.rGap12}>
            <CircularProgressBar percentage={percentageTargetWork} />
            <View style={BaseStyles.rGap4}>
              <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
                <View style={{ height: 12, width: 12, borderRadius: 4, backgroundColor: Colors.primary }} />
                <Typography fontSize={12} fontWeight={500}>
                  <Typography fontSize={12} fontWeight={400} color={Colors.gray70}>
                    Đã check-in:{' '}
                  </Typography>
                  {formatMoneyVND(totalCheckinShop, '')}
                </Typography>
              </View>
              <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
                <View style={{ height: 12, width: 12, borderRadius: 4, backgroundColor: Colors.gray30 }} />
                <Typography fontSize={12} fontWeight={500}>
                  <Typography fontSize={12} fontWeight={400} color={Colors.gray70}>
                    Mục tiêu:{' '}
                  </Typography>
                  {formatMoneyVND(targetCheckin, '')}
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const Loading = () => (
  <View style={[BaseStyles.alignSelfStart, BaseStyles.py3]}>
    <ActivityIndicator color={Colors.primary} size={16} />
  </View>
)
