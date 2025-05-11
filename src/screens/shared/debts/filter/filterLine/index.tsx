import { ArrowRightIcon, CloseIcon } from '@/assets'
import { BottomSheetModal, Checkbox, Header, IconButton, List, ListItem, ListItemSeparator } from '@/components'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { EDebtsFilterKey, GetDebtsReq } from '@/types'
import { FilterData } from '..'
import { FilterTag } from '../tag'

export const FilterLine = ({
  label,
  items,
  value,
  params,
  onChange,
}: FilterData & {
  params: GetDebtsReq
  onChange(value: Partial<GetDebtsReq>): void
}) => {
  const { ref, onOpen, onClose } = useVisibleRef()
  const filterValue = params?.[value]
  const valueLabel = filterValue ? items?.find((i) => i.value === filterValue)?.label : undefined

  const handleChange = (itemValue: string) => {
    onClose()
    if (value === EDebtsFilterKey.DateType) {
      onChange({ [value]: itemValue, start_date: undefined, end_date: undefined })
    } else {
      onChange({ [value]: itemValue })
    }
  }

  const handleReset = () => {
    onChange({ [value]: undefined })
  }

  return (
    <>
      <ListItem
        title={label}
        onPress={onOpen}
        style={BaseStyles.py16}
        subTitle={valueLabel ? <FilterTag label={valueLabel} onPress={handleReset} /> : undefined}
        right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
      />
      <BottomSheetModal ref={ref} showBottomSpacing={false}>
        <Header
          title={label}
          right={<IconButton icon={CloseIcon} size={24} color={Colors.gray80} onPress={onClose} />}
        />
        <List
          data={items}
          provider="BottomSheetFlatList"
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => {
            const isActive = filterValue === item.value
            return (
              <ListItem
                key={item.value}
                title={item.label}
                onPress={() => handleChange(item.value)}
                left={<Checkbox size={20} type="radio" readOnly value={isActive} />}
              />
            )
          }}
        />
      </BottomSheetModal>
    </>
  )
}

const Separator = () => <ListItemSeparator style={BaseStyles.pl16} />
