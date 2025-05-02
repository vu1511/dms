import { ListItemSeparator } from '@/components'
import { BaseStyles, Colors, Typography } from '@/theme'
import { PromotionOrderRes } from '@/types'
import { Fragment } from 'react'
import { Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { CouponItem } from '../couponItem'
import { PromotionGiftedProduct } from '../promotionGiftedProduct'

type Props = {
  data: PromotionOrderRes[]
}

export const PromotionsAppliedOnOrderView = ({ data }: Props) => {
  return (
    <View style={BaseStyles.rGap12}>
      <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
        <SvgXml
          color={Colors.primary}
          xml='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15.3333 6.66667C15.7013 6.66667 16 6.368 16 6V2.66667C16 2.29867 15.7013 2 15.3333 2H0.666667C0.298667 2 0 2.29867 0 2.66667V6C0 6.368 0.298667 6.66667 0.666667 6.66667C1.42667 6.66667 2 7.24 2 8C2 8.76 1.42667 9.33333 0.666667 9.33333C0.298667 9.33333 0 9.632 0 10V13.3333C0 13.7013 0.298667 14 0.666667 14H15.3333C15.7013 14 16 13.7013 16 13.3333V10C16 9.632 15.7013 9.33333 15.3333 9.33333C14.5733 9.33333 14 8.76 14 8C14 7.24 14.5733 6.66667 15.3333 6.66667ZM5.66667 4.66667C6.21867 4.66667 6.66667 5.11467 6.66667 5.66667C6.66667 6.21867 6.21867 6.66667 5.66667 6.66667C5.11467 6.66667 4.66667 6.21867 4.66667 5.66667C4.66667 5.11467 5.11467 4.66667 5.66667 4.66667ZM10.3333 11.3333C9.78133 11.3333 9.33333 10.8853 9.33333 10.3333C9.33333 9.78133 9.78133 9.33333 10.3333 9.33333C10.8853 9.33333 11.3333 9.78133 11.3333 10.3333C11.3333 10.8853 10.8853 11.3333 10.3333 11.3333ZM5.33333 11.6093L4.39067 10.6667L10.6667 4.39067L11.6093 5.33333L5.33333 11.6093Z" fill="currentColor"/></svg>'
        />
        <Text numberOfLines={1} style={[Typography.body14SemiBold]}>
          Chương trình khuyến mãi
        </Text>
      </View>
      <View style={{ rowGap: 8 }}>
        {data.map((item, index) => (
          <Fragment key={item.promotion_id}>
            <View style={BaseStyles.rGap8}>
              <CouponItem
                label={
                  item.promotion_type === 'range' && item.range_line?.range_discount_type !== 'free_product'
                    ? item.range_line.range_name
                    : item.promotion_name
                }
              />
              {item.promotion_type === 'bogo_sale' && item?.free_product?.length ? (
                <View style={BaseStyles.rGap8}>
                  {item.free_product.map((product, index) => (
                    <PromotionGiftedProduct
                      key={index}
                      qty={product.quantity}
                      name={product.product_name}
                      uom={product.uom_id?.uom_name}
                      imgUrl={product.representation_image?.image_url}
                    />
                  ))}
                </View>
              ) : item.promotion_type === 'range' && item?.free_product?.length ? (
                <View style={BaseStyles.rGap12}>
                  {item.free_product.map((product, index) => (
                    <PromotionGiftedProduct
                      key={index}
                      qty={product.quantity}
                      name={product.product_name}
                      uom={product.uom_id?.uom_name}
                      imgUrl={product.representation_image?.image_url}
                    />
                  ))}
                </View>
              ) : null}
            </View>
            {index !== data.length - 1 && <ListItemSeparator />}
          </Fragment>
        ))}
      </View>
    </View>
  )
}
