import { Chip } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { DebtPaymentState, DebtPaymentStateColor } from '@/types'
import { formatMoneyVND } from '@/utils'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface DebtItemProps {
  name: string
  customerName?: string
  amountTotal: number
  amountPaid: number
  amountResidual: number
  createDate: string
  state: DebtPaymentState
  stateLabel: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export const DebtItem = ({
  name,
  state,
  stateLabel,
  customerName,
  amountTotal,
  amountPaid,
  amountResidual,
  createDate,
  style,
  onPress,
}: DebtItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress?.()} style={[styles.container, style]}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Chip color={DebtPaymentStateColor?.[state] || Colors.gray80} label={stateLabel} />
      </View>
      <View style={styles.content}>
        <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
          {customerName && (
            <Text numberOfLines={1} style={styles.partnerName}>
              {customerName}
            </Text>
          )}
          <Text numberOfLines={1} style={styles.date}>
            {createDate}
          </Text>
        </View>
        <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
          <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.flex1, BaseStyles.cGap4]}>
            <Text numberOfLines={1} style={styles.money}>
              Trả: {formatMoneyVND(amountPaid)} / {formatMoneyVND(amountTotal)}
            </Text>
          </View>
          <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap4]}>
            <Text numberOfLines={1} style={styles.money}>
              Còn: {formatMoneyVND(amountResidual)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
