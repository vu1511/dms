import { CalendarIcon, LocationIcon, MoneyCoinIcon, PhoneIcon } from '@/assets'
import { Avatar, Button } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { UserInfo } from '@/types'
import { formatMoneyVND, getAddressLabel, reverseDateFormat, toImageUrl } from '@/utils'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { styles } from './style'

export const Info = ({ data, onUpdate }: { data: UserInfo; onUpdate(): void }) => {
  const { width } = useWindowDimensions()

  const [isBarcodeError, setIsBarcodeError] = useState(false)

  return (
    <View style={[styles.card, BaseStyles.rGap12]}>
      <View style={styles.infoHeader}>
        <Avatar source={toImageUrl(data.image_url)} size={56} />
        <View style={styles.infoNameArea}>
          <Text numberOfLines={1} style={styles.infoName}>
            {data?.name}
          </Text>
          <View style={styles.userTier}>
            <MoneyCoinIcon />
            <Text style={styles.userTierLabel}>{formatMoneyVND(data?.loyalty_point ?? 0, '')} điểm</Text>
          </View>
        </View>
      </View>
      {data?.barcode && !isBarcodeError ? (
        <View style={styles.barcode}>
          <Barcode
            width={2}
            height={36}
            value={data.barcode}
            lineColor={Colors.gray80}
            maxWidth={width - 120}
            onError={() => setIsBarcodeError(true)}
          />
          <Text numberOfLines={1} style={styles.barcodeLabel}>
            {data.barcode}
          </Text>
        </View>
      ) : null}
      <View style={styles.infoLine}>
        <CalendarIcon size={20} fill={Colors.gray80} />
        <Text numberOfLines={2} style={styles.infoLineValue}>
          {data.birth_day ? dayjs(reverseDateFormat(data.birth_day)).format('DD/MM/YYYY') : 'Chưa có thông tin'}
        </Text>
      </View>
      <View style={styles.infoLine}>
        <PhoneIcon size={20} fill={Colors.gray80} />
        <Text numberOfLines={2} style={styles.infoLineValue}>
          {data.phone ?? 'Chưa có thông tin'}
        </Text>
      </View>
      <View style={styles.infoLine}>
        <LocationIcon size={20} fill={Colors.gray80} />
        <Text numberOfLines={2} style={styles.infoLineValue}>
          {getAddressLabel(
            data.shipping_adress?.[0]?.street,
            data.shipping_adress?.[0]?.ward_id,
            data.shipping_adress?.[0]?.district_id,
            data.shipping_adress?.[0]?.state_id,
            data.shipping_adress?.[0]?.country_id
          ) ?? 'Chưa có thông tin'}
        </Text>
      </View>
      <Button
        type="button"
        onPress={onUpdate}
        title="Chỉnh sửa thông tin"
        style={styles.editButton}
        textStyle={styles.editButtonText}
      />
    </View>
  )
}
