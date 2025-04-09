import { ArrowDownIcon, CloseIcon, InventoryIcon, TickCircleIcon, TickIcon } from '@/assets'
import { DotSeparator, IconButton, Image, ListItem, ListItemSeparator, Popover } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { ProductUom, ProductVariant } from '@/types'
import { formatMoneyVND, toImageUrl } from '@/utils'
import { memo, ReactNode } from 'react'
import { FlatList, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { styles } from './style'

export type ProductItemProps = Pick<
  ProductVariant,
  | 'id'
  | 'code'
  | 'price'
  | 'imageUrl'
  | 'name'
  | 'units'
  | 'type'
  | 'unitId'
  | 'unitName'
  | 'pricelist'
  | 'categoryName'
  | 'stockQuantity'
> & {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
  isAdded?: boolean
  isActive?: boolean
  onPress?: () => void
  onDelete?: () => void
  onChangeUnit?: (id: number, unit: ProductUom) => void
}

const ProductItem = memo(
  ({
    price: externalPrice,
    id,
    code,
    imageUrl,
    name,
    units,
    type,
    unitId,
    unitName,
    pricelist,
    categoryName,
    stockQuantity,
    isAdded,
    isActive,
    style,
    children,
    onPress,
    onDelete,
    onChangeUnit,
  }: ProductItemProps) => {
    const isProductType = type === 'product'
    const isTrackingInventory = typeof stockQuantity === 'number'
    const price = unitId && pricelist?.[id] ? pricelist[id][unitId] : externalPrice
    const hasPrice = typeof price === 'number'

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={!onPress || isAdded}
        onPress={() => onPress?.()}
        style={[styles.container, isActive && styles.active, style]}
      >
        <View style={[styles.imageArea, isAdded && styles.added]}>
          <Image
            width={56}
            height={56}
            borderRadius={8}
            contentFit="contain"
            recyclingKey={`product_item_${id}`}
            source={toImageUrl(imageUrl)}
          />
          {isActive && (
            <View style={styles.imageOverlay}>
              <TickCircleIcon fill={Colors.success} size={20} />
            </View>
          )}
        </View>

        <View style={[styles.productInfo, isAdded && styles.added]}>
          <View style={styles.nameArea}>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>
            {isAdded && (
              <View style={styles.addedArea}>
                <TickIcon fill="#2F9369" size={16} />
                <Text style={styles.addedTitle}>Đã thêm</Text>
              </View>
            )}
            {!!onDelete && <IconButton icon={CloseIcon} size={16} color={Colors.gray80} onPress={onDelete} />}
          </View>
          <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap8]}>
            {!!categoryName && (
              <View style={styles.trigger}>
                <Text style={styles.triggerLabel} numberOfLines={1}>
                  {categoryName}
                </Text>
              </View>
            )}
            {!!onChangeUnit && units?.length && unitId && isProductType && (
              <Popover
                offset={4}
                placement="autoVertical"
                popoverStyle={styles.popover}
                trigger={({ sourceRef, openPopover }) => (
                  <TouchableOpacity
                    hitSlop={12}
                    ref={sourceRef}
                    activeOpacity={0.5}
                    style={[styles.trigger, styles.triggerUnit]}
                    disabled={units.length < 2}
                    onPress={units.length > 1 ? openPopover : undefined}
                  >
                    <Text numberOfLines={1} style={styles.triggerLabel}>
                      {unitName}
                    </Text>
                    {units.length > 1 && <ArrowDownIcon size={14} fill="#6C798F" />}
                  </TouchableOpacity>
                )}
              >
                {({ closePopover }) => (
                  <FlatList
                    data={units}
                    bounces={false}
                    style={styles.unitPopover}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => {
                      const isActive = unitId === item.uom_id
                      return (
                        <ListItem
                          active={isActive}
                          key={item.uom_id}
                          title={item.uom_name}
                          onPress={() => {
                            if (!isActive) {
                              onChangeUnit(id, item)
                            }
                            closePopover()
                          }}
                        />
                      )
                    }}
                  />
                )}
              </Popover>
            )}
          </View>
          <View style={styles.line}>
            {hasPrice ? (
              <Text numberOfLines={1} style={styles.lineText}>
                {formatMoneyVND(price || 0)}
              </Text>
            ) : null}
            {isTrackingInventory && (
              <>
                {hasPrice && <DotSeparator />}
                <View style={styles.lineContent}>
                  <InventoryIcon size={12} fill="#6C798F" />
                  <Text numberOfLines={1} style={styles.lineText}>
                    {formatMoneyVND(stockQuantity, '')}
                  </Text>
                </View>
              </>
            )}
            {code && (
              <>
                {(hasPrice || isTrackingInventory) && code && <DotSeparator />}
                <Text numberOfLines={1} style={[styles.lineText, styles.codeText]}>
                  Mã: {code}
                </Text>
              </>
            )}
          </View>
          {children}
        </View>
      </TouchableOpacity>
    )
  }
)

export default ProductItem
