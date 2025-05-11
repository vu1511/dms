import { ArrowRightIcon, CloseIcon } from '@/assets'
import { BottomSheetModal, Header, IconButton, ListItem, SelectDateRange } from '@/components'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { DateRange, EDebtsFilterKey, EDebtsFilterKeyName, GetDebtsReq } from '@/types'
import { formatDate, getDateRangeLabel } from '@/utils'
import { FilterTag } from '../tag'

type DateRangeLineProps = {
  value?: DateRange<string>
  onChange(value: Partial<GetDebtsReq>): void
}

export const DateRangeLine = ({ onChange, value }: DateRangeLineProps) => {
  const { ref, onOpen, onClose } = useVisibleRef()

  const title = EDebtsFilterKeyName[EDebtsFilterKey.StartDate]

  const handleChange = (value: DateRange<string>) => {
    onClose()
    onChange({
      date_type: undefined,
      end_date: formatDate(value.toDate, 'YYYY-MM-DD'),
      start_date: formatDate(value.fromDate, 'YYYY-MM-DD'),
    })
  }

  const handleReset = () => {
    onChange({ end_date: undefined, start_date: undefined })
  }

  return (
    <>
      <ListItem
        title={title}
        onPress={onOpen}
        style={BaseStyles.py16}
        right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
        subTitle={value ? <FilterTag onPress={handleReset} label={getDateRangeLabel(value)} /> : undefined}
      />
      <BottomSheetModal ref={ref} snapPoints={[600]} showBottomSpacing={false}>
        <Header
          title={title}
          right={<IconButton onPress={onClose} icon={CloseIcon} size={24} color={Colors.gray80} />}
        />
        <SelectDateRange onChange={handleChange} defaultValue={value} />
      </BottomSheetModal>
    </>
  )
}
