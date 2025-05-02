import { CalendarIcon } from '@/assets'
import { ProductItem } from '@/components'
import { useVisible } from '@/hooks'
import { BaseStyles, Colors, Typography } from '@/theme'
import { InventoryLineForm } from '@/types'
import dayjs from 'dayjs'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { QuantityInput } from '../quantityInput'

type InventoryProductItemProps = {
  data: InventoryLineForm
  borderBottomVisible?: boolean
  onChange: (data: InventoryLineForm) => void
  onDelete: (data: InventoryLineForm) => void
}

export const InventoryProductItem = ({ data, borderBottomVisible, onDelete, onChange }: InventoryProductItemProps) => {
  const { visible, onClose, onOpen } = useVisible()

  const handleChange = (params: Partial<InventoryLineForm>) => {
    const newProduct = { ...data, ...params }
    onChange?.(newProduct)
  }

  const handleConfirm = (exp_date: Date) => {
    handleChange({ exp_date })
    onClose()
  }

  return (
    <View style={borderBottomVisible && BaseStyles.borderBottom}>
      <ProductItem
        {...data}
        onDelete={() => onDelete(data)}
        onChangeUnit={(id, unit) => onChange({ ...data, unitId: unit.uom_id, unitName: unit.uom_name })}
      >
        <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap12]}>
          <QuantityInput
            min={1}
            max={10000}
            value={data.quantity}
            onChange={(quantity) => {
              handleChange({ quantity })
            }}
          />
          <TouchableOpacity onPress={onOpen} hitSlop={8} activeOpacity={0.5} style={styles.dateTrigger}>
            <Text numberOfLines={1} style={styles.dateTriggerLabel}>
              {dayjs(data.exp_date).format('DD/MM/YYYY')}
            </Text>
            <CalendarIcon size={16} fill="#6C798F" />
          </TouchableOpacity>
        </View>
      </ProductItem>

      <DateTimePicker
        mode="date"
        locale="vi"
        display="inline"
        themeVariant="light"
        isVisible={visible}
        accentColor={Colors.primary}
        buttonTextColorIOS={Colors.primary}
        onCancel={onClose}
        onConfirm={handleConfirm}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dateTrigger: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
  },
  dateTriggerLabel: {
    ...Typography.body12Medium,
    color: '#6C798F',
    flexShrink: 1,
  },
})
