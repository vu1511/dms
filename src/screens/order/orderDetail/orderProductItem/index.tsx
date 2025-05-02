import { Image } from '@/components'
import { BaseStyles } from '@/theme'
import { formatMoneyVND, toImageUrl } from '@/utils'
import { Text, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface OrderProductItemProps {
  image: string
  name: string
  uom: string
  price: number
  quantity: number
  style?: ViewStyle
}

export const OrderProductItem = ({ image, name, uom, price, quantity, style }: OrderProductItemProps) => {
  return (
    <View style={[styles.productContainer, style]}>
      <Image borderRadius={4} width={52} height={52} source={toImageUrl(image)} />
      <View style={[BaseStyles.flex1, BaseStyles.rGap2]}>
        <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap4]}>
          <Text numberOfLines={1} style={styles.productName}>
            {name}
          </Text>
          <Text numberOfLines={1} style={styles.productUom}>
            ({uom})
          </Text>
        </View>
        <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap12]}>
          <Text numberOfLines={1} style={styles.productPrice}>
            {formatMoneyVND(price)}
          </Text>
          <Text style={styles.productQty}>x {quantity}</Text>
        </View>
      </View>
    </View>
  )
}
