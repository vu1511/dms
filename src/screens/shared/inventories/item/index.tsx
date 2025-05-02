import { StarRating, Tag } from '@/components'
import { BaseStyles, Colors, Typography } from '@/theme'
import { InventoryRes } from '@/types'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface InventoryDataItemProps {
  data: InventoryRes
  style?: StyleProp<ViewStyle>
  onPress?: (data: InventoryRes) => void
}

export const InventoryItem = ({ data, style, onPress }: InventoryDataItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress?.(data)} style={[styles.container, style]}>
      <Text numberOfLines={1} style={styles.name}>
        {data.inventory_store_name}
      </Text>
      <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
        <StarRating size={14} gap={2} value={data?.rating_star?.rating_star_int} />
        <Text style={[Typography.body12Normal, { color: Colors.gray60 }]}>Ngày tạo: {data.inventory_date}</Text>
      </View>

      <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
        <Text style={[Typography.body12Normal, { color: Colors.gray60 }]}>Khách hàng: {data.customer?.name}</Text>
        {/* <DotSeparator /> */}
        <Text style={[Typography.body12Normal, { color: Colors.gray60 }]}>
          Tổng sản phẩm: {data?.inventory_store_lines?.length ?? 0}
        </Text>
      </View>
      {/* <Text style={[Typography.body12Normal, { color: Colors.gray60 }]}>{data.rating_content}</Text> */}
      {data.rating_tags.length > 0 && (
        <View style={styles.tags}>
          {data.rating_tags.slice(0, 2).map((item) => (
            <Tag
              isActive
              key={item.tag_id}
              style={styles.tagItem}
              label={item.tag_content}
              labelStyle={Typography.body10Normal}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  )
}
