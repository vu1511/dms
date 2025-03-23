import { PhoneIcon, TrashIcon } from '@/assets'
import { Avatar, Checkbox, IconButton } from '@/components'
import { BaseStyles, Colors, Typography } from '@/theme'
import { toImageUrl } from '@/utils'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CustomerItemProps {
  avatar: string
  name: string
  phone: string
  active?: boolean
  onSelect?: () => void
  onDelete?: () => void
}

export const CustomerItem = ({ avatar, name, phone, active, onDelete, onSelect }: CustomerItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.5} disabled={!onSelect} onPress={onSelect} style={styles.container}>
      {onSelect ? (
        <View>
          <Checkbox size={18} value={active} readOnly />
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
