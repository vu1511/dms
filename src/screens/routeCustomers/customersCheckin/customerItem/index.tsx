import { LocationIcon, PhoneIcon, RouteIcon, ThreeDotsHorizontalIcon } from '@/assets'
import { Avatar, Button, ListItem, Popover } from '@/components'
import { useUserSlice } from '@/store'
import { Colors } from '@/theme'
import { CustomerCheckinMenuOptions, ECustomerCheckinMenuOption, SearchCustomerRouteRes } from '@/types'
import { formatMoneyVND, getAddressLabel, openZaloProfile, toImageUrl } from '@/utils'
import { Pressable, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { styles } from './style'
import { Dot } from '../dot'

type Action = (data: SearchCustomerRouteRes) => void

type CustomerItemProps = {
  data: SearchCustomerRouteRes
  style?: StyleProp<ViewStyle>
  onPress?: Action
  onCheckIn: Action
  onCreateOrder: Action
  onMenuItemPress?(action: ECustomerCheckinMenuOption, data: SearchCustomerRouteRes): void
}

export const CustomerItem = ({
  data,
  style,
  onPress,
  onCheckIn,
  onCreateOrder,
  onMenuItemPress,
}: CustomerItemProps) => {
  const isCheckedin = data.checkin
  const shippingAddress = data?.shipping_adress?.[0]
  const accountType = useUserSlice((store) => store.userInfo?.account_type)

  return (
    <TouchableOpacity
      disabled={!onPress}
      activeOpacity={0.5}
      style={[styles.container, style]}
      onPress={() => onPress?.(data)}
    >
      <View>
        <Avatar source={toImageUrl(data?.img_url)} size={48} label={data.name} />
        <Dot size={14} isCheckin={data.checkin} style={styles.dot} borderVisible />
      </View>
      <View style={styles.content}>
        <View style={styles.contentInfo}>
          <View style={styles.nameArea}>
            <Text numberOfLines={1} style={styles.name}>
              {data.name}
            </Text>
            {data.phone ? (
              <TouchableOpacity
                hitSlop={8}
                activeOpacity={0.5}
                style={styles.phoneBtn}
                onPress={() => openZaloProfile(data.phone)}
              >
                <PhoneIcon size={14} fill={Colors.active} />
                <Text numberOfLines={1} style={styles.phone}>
                  {data.phone}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.addressLine}>
            <View style={styles.addressIcon}>
              <LocationIcon fill={Colors.gray70} size={16} />
            </View>
            <Text numberOfLines={2} style={styles.address}>
              {getAddressLabel(
                shippingAddress?.street,
                shippingAddress?.ward_id?.name,
                shippingAddress?.district_id?.name,
                shippingAddress?.state_id?.name,
                shippingAddress?.country_id?.name
              ) || 'Chưa có địa chỉ'}
            </Text>
          </View>
          <View style={styles.lineItem}>
            <RouteIcon fill={Colors.gray70} size={16} />
            <Text numberOfLines={1} style={styles.lineItemLabel}>
              Khoảng cách:{' '}
              <Text numberOfLines={1} style={styles.lineItemValue}>
                {typeof data.distance === 'number' ? formatMoneyVND(data.distance, ' (m)') : 'Chưa có khoảng cách'}
              </Text>
            </Text>
          </View>
        </View>
        {['asm', 'gsbh', 'nvkd'].includes(accountType as string) ? (
          <Pressable style={styles.footer}>
            <Button
              type="button"
              title="Đặt hàng"
              onPress={() => onCreateOrder(data)}
              textStyle={styles.footerBtnCheckinText}
              style={[styles.footerBtn, styles.footerBtnCheckin]}
            />
            <Button
              type="button"
              textStyle={styles.footerBtnText}
              title={!isCheckedin ? 'Check In' : 'Đã Check In'}
              onPress={!isCheckedin ? () => onCheckIn(data) : undefined}
              style={[styles.footerBtn, isCheckedin && styles.footerBtnSuccess]}
            />
            {onMenuItemPress ? (
              <Popover
                offset={8}
                arrowSize={0}
                trigger={
                  <TouchableOpacity activeOpacity={0.5} style={styles.optionBtn}>
                    <ThreeDotsHorizontalIcon size={18} fill="#505F79" />
                  </TouchableOpacity>
                }
              >
                {({ closePopover }) => (
                  <View style={styles.popover}>
                    {CustomerCheckinMenuOptions.map(({ label, value, icon: Icon }) => (
                      <ListItem
                        key={value}
                        title={label}
                        onPress={() => {
                          closePopover()
                          onMenuItemPress(value, data)
                        }}
                        left={<Icon size={18} fill={Colors.gray80} />}
                      />
                    ))}
                  </View>
                )}
              </Popover>
            ) : null}
          </Pressable>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}
