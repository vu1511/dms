import { Image } from '@/components'
import { BaseStyles, Colors, Typography } from '@/theme'
import { toImageUrl } from '@/utils'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

type Props = {
  name: string
  uom: string
  qty: number
  imgUrl: string
  style?: ViewStyle
}

export const PromotionGiftedProduct = ({ name, qty, uom, imgUrl, style }: Props) => {
  return (
    <View style={[styles.giftedProduct, style]}>
      <Image borderRadius={4} width={40} height={40} source={toImageUrl(imgUrl)} />
      <View style={styles.giftedProductContent}>
        <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap4]}>
          <Text style={styles.giftedProductLabel}>Quà tặng</Text>
          <Text numberOfLines={1} style={styles.giftedProductText}>
            {name}
          </Text>
        </View>
        <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
          <Text numberOfLines={1} style={[styles.giftedProductQty, BaseStyles.flex1]}>
            {uom}
          </Text>
          <Text numberOfLines={1} style={styles.giftedProductQty}>
            x{qty}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  giftedProduct: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
  },
  giftedProductContent: {
    flex: 1,
    rowGap: 4,
  },
  giftedProductLabel: {
    borderWidth: 0.6,
    borderColor: Colors.primary,
    ...Typography.body10Normal,
    color: Colors.primary,
    paddingHorizontal: 2,
    borderRadius: 2,
  },
  giftedProductText: {
    ...Typography.body12Normal,
    flex: 1,
  },
  giftedProductQty: {
    ...Typography.body12Normal,
    color: Colors.gray70,
  },
})
