import { BaseStyles, Colors, Typography } from '@/theme'
import { Loyalty } from '@/types'
import { formatMoneyVND } from '@/utils'
import dayjs from 'dayjs'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type LoyaltyItemProps = {
  data: Loyalty
  onPress(data: Loyalty): void
}

export const LoyaltyItem = ({ data, onPress }: LoyaltyItemProps) => {
  const loyaltyPoint = data?.loyalty_point ?? 0

  const handlePress = () => {
    onPress?.(data)
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.nameArea}>
          <Text numberOfLines={1} style={styles.name}>
            {data.order_id ? 'Đơn hàng ' : ''}#{data.order_name}
          </Text>
        </View>
        <View style={styles.dateArea}>
          <Text style={styles.label}>Thời gian giao dịch:</Text>
          <Text style={styles.label}>{dayjs(data.date).format('HH:mm - DD/MM/YYYY')}</Text>
        </View>
        {loyaltyPoint !== 0 ? (
          <View style={styles.pointArea}>
            <Text style={styles.label}>{loyaltyPoint < 0 ? 'Sử dụng điểm:' : 'Tích điểm mua hàng:'}</Text>
            <Text style={loyaltyPoint < 0 ? styles.pointSubtract : styles.pointPlus}>
              {loyaltyPoint > 0 ? '+' : ''}
              {formatMoneyVND(loyaltyPoint, '')}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    columnGap: 8,
  },
  content: {
    flex: 1,
    rowGap: 4,
  },
  icon: {
    top: 2,
  },
  nameArea: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
  },
  name: {
    ...Typography.body14Medium,
    flex: 1,
  },
  pointArea: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
  },
  pointPlus: {
    ...Typography.body12Medium,
    color: Colors.green,
  },
  pointSubtract: {
    ...Typography.body12Medium,
    color: Colors.red,
  },
  dateArea: {
    ...BaseStyles.flexRowSpaceBetween,
    columnGap: 8,
  },
  label: {
    ...Typography.body12Normal,
    color: Colors.gray60,
    flexShrink: 1,
  },
})
