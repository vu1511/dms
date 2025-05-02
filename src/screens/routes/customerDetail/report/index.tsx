import { ArrowDownIcon, BoxesIcon, CloseIcon, MoneyArrowLeftIcon, MoneyIcon, WalletIcon } from '@/assets'
import { BottomSheetModal, Empty, Header, IconButton, LineItem, ListItem, PercentBar } from '@/components'
import { useVisibleRef } from '@/hooks'
import { userAPI } from '@/services'
import { BaseStyles, Colors, Typography } from '@/theme'
import { AccountType, DefaultMonthTime, timePeriodOptions } from '@/types'
import { formatMoneyVND } from '@/utils'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import useSWR from 'swr'
import { ReportLoading } from './loading'
import styles from './styles'

export const Report = ({ customerId, accountType }: { customerId: number; accountType?: AccountType }) => {
  const [time, setTime] = useState(DefaultMonthTime)
  const { ref, onClose, onOpen } = useVisibleRef()

  const { isLoading, data: reportInfo } = useSWR(`report_by_user?id=${customerId}&time=${time.value}`, () =>
    userAPI
      .getReportInfoV2({
        partner_id: customerId,
        date_type: time.value,
      })
      .then((res) => res.result?.data)
  )

  return (
    <>
      <View style={styles.container}>
        <View style={{ ...BaseStyles.flexRowSpaceBetween, columnGap: 12, marginBottom: 12 }}>
          <Text style={{ ...Typography.body16SemiBold }}>Báo cáo</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={onOpen} style={styles.dateFilter}>
            <Text style={styles.dateFilterText}>{time?.label}</Text>
            <ArrowDownIcon size={16} fill={Colors.gray70} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ReportLoading />
        ) : !reportInfo ? (
          <Empty />
        ) : (
          <View style={{ gap: 12 }}>
            <LineItem
              labelStyle={styles.lineItemLabel}
              label="Doanh số (Đơn chưa duyệt)"
              value={formatMoneyVND(reportInfo.revenue_today)}
            />
            <LineItem
              labelStyle={styles.lineItemLabel}
              label="Doanh thu (Đơn đã duyệt)"
              value={formatMoneyVND(reportInfo.sale_amount_today)}
            />
            <LineItem
              labelStyle={styles.lineItemLabel}
              label="Doanh thu đến thời điểm hiện tại"
              value={formatMoneyVND(reportInfo.cumulative_sale)}
            />
            <LineItem
              labelStyle={styles.lineItemLabel}
              label="KPI doanh số"
              value={formatMoneyVND(reportInfo.sale_standard)}
            />

            <View>
              <Text style={[styles.fieldName]}>Khách hàng đã đạt chỉ tiêu</Text>
              <PercentBar percent={(reportInfo.cumulative_sale ?? 0 / reportInfo.sale_standard ?? 0) * 100} />
            </View>

            <View style={styles.wrapper}>
              <LineItem
                labelStyle={styles.lineItemLabel}
                left={<BoxesIcon fill={Colors.gray80} />}
                label="Tổng số đơn hàng"
                value={reportInfo.number_sale_order}
              />
              <LineItem
                labelStyle={styles.lineItemLabel}
                left={<WalletIcon fill={Colors.gray80} />}
                label="Tổng nợ của khách"
                value={formatMoneyVND(reportInfo.credit)}
              />
              <LineItem
                labelStyle={styles.lineItemLabel}
                left={<MoneyArrowLeftIcon fill={Colors.gray80} />}
                label="Khách đã thanh toán"
                value={formatMoneyVND(reportInfo.debt_recovery)}
              />
              <LineItem
                labelStyle={styles.lineItemLabel}
                left={<MoneyIcon fill={Colors.gray80} />}
                label="Hạn mức nợ cho khách"
                value={formatMoneyVND(reportInfo.credit_limit)}
              />
              {accountType === 'th' ? null : (
                <View style={{ gap: 12 }}>
                  <LineItem
                    labelStyle={styles.lineItemLabel}
                    label="Tổng khách hàng đang quản lý"
                    value={reportInfo.number_old_customer}
                  />
                  <LineItem
                    labelStyle={styles.lineItemLabel}
                    label="Tổng khách hàng mới đã mua hàng"
                    value={reportInfo.number_new_customer}
                  />
                  <LineItem
                    labelStyle={styles.lineItemLabel}
                    label="Kết quả checkin khách hàng"
                    value={reportInfo.manager_data?.number_image}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      <BottomSheetModal ref={ref}>
        <Header
          title="Chọn thời gian"
          right={<IconButton onPress={onClose} icon={CloseIcon} size={20} color={Colors.gray80} />}
        />
        {timePeriodOptions.map((i) => (
          <ListItem
            key={i.value}
            title={i.label}
            active={i.value === time.value}
            onPress={() => {
              onClose()
              setTime(i)
            }}
          />
        ))}
      </BottomSheetModal>
    </>
  )
}
