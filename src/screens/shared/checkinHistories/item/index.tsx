import { Chip, Image } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { toImageUrl } from '@/utils'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { styles } from './styles'

interface ItemAttendanceProps {
  onPress?(): void
  customerName?: string
  userName?: string
  status: string
  statusLabel: string
  checkInDate?: string
  imgUrl: string
  style?: StyleProp<ViewStyle>
}

export const ItemAttendance = ({
  imgUrl,
  status,
  userName,
  statusLabel,
  checkInDate,
  customerName,
  style,
  onPress,
}: ItemAttendanceProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.container, style]} onPress={() => onPress?.()}>
      <Image borderRadius={4} width={56} height={56} source={toImageUrl(imgUrl)} />
      <View style={styles.content}>
        <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap4]}>
          {customerName ? (
            <Text style={styles.name} numberOfLines={1}>
              {customerName}
            </Text>
          ) : null}
          <Chip label={statusLabel} color={status === 'open' ? Colors.green : Colors.red} />
        </View>
        {userName ? <Text style={styles.label}>Nhân viên: {userName}</Text> : null}
        {checkInDate ? <Text style={styles.label}>{'Checkin/out: ' + checkInDate}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}
