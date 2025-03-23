import { ClockFillIcon, UsersFillIcon } from '@/assets'
import { DotSeparator } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { RouteRes } from '@/types'
import moment from 'moment'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface RouteItemProps {
  data: RouteRes
  style?: StyleProp<ViewStyle>
  onPress?: (data: RouteRes) => void
}

export const RouteItem = ({ data, style, onPress }: RouteItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress?.(data)}>
      <View style={[styles.container, style]}>
        <Text numberOfLines={1} style={styles.name}>
          {data?.name}
        </Text>
        <View style={[BaseStyles.flexRowItemsCenter]}>
          <View style={styles.item}>
            <UsersFillIcon fill={Colors.gray60} size={14} />
            <Text style={styles.itemValue}>{data.number_total}</Text>
          </View>
          <DotSeparator />
          <View style={[styles.item]}>
            <ClockFillIcon fill={Colors.gray60} size={14} />
            <Text style={styles.itemValue}>{moment(data.date_sale).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
