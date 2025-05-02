import { BaseStyles, Colors, Typography } from '@/theme'
import { DebtsAdditionalDataRes } from '@/types'
import { formatMoneyVND } from '@/utils'
import { StyleSheet, Text, View } from 'react-native'

type DebtsHeaderProps = {
  data: DebtsAdditionalDataRes
}

export const DebtsHeader = ({ data }: DebtsHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.label}>
          Số lượng: <Text style={styles.value}>{data?.total_payment || 0}</Text>
        </Text>
        <Text style={styles.label}>
          Tổng tiền: <Text style={styles.value}>{formatMoneyVND(data?.total_amount || 0)}</Text>
        </Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.label}>
          Tổng thu vào: <Text style={styles.value}>{formatMoneyVND(data?.total_inbound || 0)}</Text>
        </Text>
        <Text style={styles.label}>
          Tổng chi ra: <Text style={styles.value}>{formatMoneyVND(data?.total_outbound || 0)}</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  line: {
    ...BaseStyles.flexRowSpaceBetween,
  },
  value: {
    ...Typography.body12Medium,
    flexShrink: 1,
  },
  label: {
    ...Typography.body12Normal,
    color: Colors.gray60,
    flexShrink: 1,
  },
})
