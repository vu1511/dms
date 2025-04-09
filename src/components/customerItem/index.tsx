import { PhoneIcon, TickIcon, TrashIcon } from '@/assets'
import { Avatar, Checkbox, IconButton } from '@/components'
import { BaseStyles, Colors, Typography } from '@/theme'
import { toImageUrl } from '@/utils'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type CustomerItemProps = {
  name: string
  phone: string
  avatar: string
  isActive?: boolean
  isSelected?: boolean
  onPress?: () => void
  onSelect?: () => void
  onDelete?: () => void
}

const CustomerItem = ({
  avatar,
  name,
  phone,
  isActive,
  isSelected,
  onDelete,
  onSelect,
  onPress,
}: CustomerItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} disabled={!onPress} onPress={() => onPress?.()} style={styles.container}>
      {onSelect ? (
        <View>
          <Checkbox size={18} value={isSelected} onChange={() => onSelect()} />
        </View>
      ) : null}
      <Avatar size={40} source={toImageUrl(avatar)} />
      <View style={[BaseStyles.flex1, BaseStyles.rGap4]}>
        <View style={BaseStyles.flexRowSpaceBetween}>
          <Text numberOfLines={1} style={styles.customerName}>
            {name}
          </Text>
          {onDelete ? (
            <IconButton onPress={onDelete} size={16} icon={<TrashIcon size={16} fill={Colors.gray80} />} />
          ) : null}
        </View>
        <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap4]}>
          <PhoneIcon size={14} fill={Colors.gray70} />
          <Text numberOfLines={1} style={styles.phone}>
            {phone}
          </Text>
        </View>
      </View>
      {isActive && <TickIcon size={24} fill={Colors.primary} />}
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  container: {
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  customerName: {
    ...Typography.body14SemiBold,
    flex: 1,
    textTransform: 'capitalize',
  },
  phone: {
    ...Typography.body12Normal,
    color: Colors.gray70,
  },
})

export default CustomerItem
