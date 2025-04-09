import { CartEmptyIcon, PlusIcon, TrashIcon } from '@/assets'
import { Button, IconButton } from '@/components'
import { System } from '@/core'
import { Navigation, Routes } from '@/routes'
import { BaseStyles, Colors } from '@/theme'
import { CreateInventoryForm, InventoryLineForm } from '@/types'
import { useNavigation } from '@react-navigation/native'
import { produce } from 'immer'
import { Control, useController } from 'react-hook-form'
import { Text, View } from 'react-native'
import { InventoryProductItem } from './productItem'
import { styles } from './style'

type InventoryProductsProps = {
  control: Control<CreateInventoryForm, any>
  inventory_store_id?: number
  onDeleteInventory?: () => void
}

type DeleteId = { id: number; index: number }

export const InventoryProductsField = ({ control, inventory_store_id, onDeleteInventory }: InventoryProductsProps) => {
  const navigation = useNavigation<Navigation>()

  const {
    field: { onChange, value },
  } = useController({ name: 'inventory_store_lines', control })

  const selectProduct = () => {
    navigation.navigate(Routes.SelectProductVariant, {
      defaultValues: value,
      unitSelectable: true,
      onChangeMany: (products) => {
        onChange(
          products.map((item) => {
            const product = value?.find((i) => i.id === item.id)
            if (product) {
              return { ...product, ...item }
            } else {
              return { ...item, quantity: 1, exp_date: new Date() }
            }
          })
        )
        navigation.pop()
      },
    })
  }

  const updateProduct = (product: InventoryLineForm, index: number) => {
    if (value?.[index]) {
      onChange(
        produce(value, (draft) => {
          draft[index] = product
        })
      )
    }
  }

  const deleteProduct = (index: number) => {
    if (value?.[index]) {
      onChange(
        produce(value, (draft) => {
          draft.splice(index, 1)
        })
      )
    }
  }

  const deleteInventoryLine = ({ id, index }: DeleteId) => {}

  const deleteAllProducts = () => {
    System.showPopup({
      message: `Bạn có chắc chắn muốn xoá toàn bộ sản phẩm?`,
      onCancel: () => {},
      onConfirm: () => {
        onChange([])
      },
    })
  }

  return (
    <View style={{ backgroundColor: Colors.white }}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          Sản phẩm ({value?.length || 0})
        </Text>
        {!!value?.length && <IconButton icon={TrashIcon} color={Colors.gray80} size={18} onPress={deleteAllProducts} />}
        {!inventory_store_id && !!value?.length && (
          <Button
            type="text"
            title="Thêm sản phẩm"
            onPress={selectProduct}
            textStyle={styles.addBtn}
            left={<PlusIcon size={20} fill={Colors.primary} />}
          />
        )}
      </View>
      {!value?.length ? (
        <View style={[BaseStyles.flexCenter, BaseStyles.py16]}>
          <CartEmptyIcon />
          <Button title="Thêm sản phẩm" onPress={selectProduct} />
        </View>
      ) : (
        value.map((item, index) => {
          return (
            <InventoryProductItem
              data={item}
              key={`line-${item.id}`}
              onChange={(product) => updateProduct(product, index)}
              onDelete={() =>
                item.inventory_store_line_id
                  ? deleteInventoryLine({
                      id: item.inventory_store_line_id,
                      index,
                    })
                  : deleteProduct(index)
              }
              borderBottomVisible={index < (value?.length ?? 0) - 1}
            />
          )
        })
      )}
    </View>
  )
}
