import { Chip } from '@/components'
import { useUserSlice } from '@/store'
import { Colors } from '@/theme'
import { OrderStateColor } from '@/types'
import { formatMoneyVND } from '@/utils'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'

interface OrderHistoryItemProps {
  orderName: string
  stateName: string
  stateValue: string
  sellBy: string
  amountTotal: number
  customerName: string
  createDate: string
  onPress?: () => void
}

export const OrderHistoryItem = ({
  sellBy,
  amountTotal,
  createDate,
  orderName,
  customerName,
  stateName,
  stateValue,
  onPress,
}: OrderHistoryItemProps) => {
  const accountType = useUserSlice((state) => state.userInfo?.account_type)

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress?.()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.nameArea}>
            <Text numberOfLines={1} style={styles.name}>
              #{orderName}
            </Text>
          </View>
          <Chip label={stateName} color={OrderStateColor?.[stateValue] || Colors.gray80} />
        </View>
        <View style={styles.lineItem}>
          <Text numberOfLines={1} style={styles.lineItemText}>
            {formatMoneyVND(amountTotal)}
          </Text>
          <Text numberOfLines={1} style={styles.lineItemText}>
            {createDate}
          </Text>
        </View>
        <View style={styles.lineItem}>
          {sellBy && accountType !== 'nvkd' && (
            <Text numberOfLines={1} style={styles.lineItemText}>
              Nhân viên: <Text style={styles.capitalize}>{sellBy}</Text>
            </Text>
          )}
          <Text numberOfLines={1} style={[styles.lineItemText, styles.textRight]}>
            Khách hàng: <Text style={styles.capitalize}>{customerName}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
