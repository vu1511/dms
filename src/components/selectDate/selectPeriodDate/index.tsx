import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ResetIcon } from '@/assets'
import { BottomSheetModal, IconButton, ListItem } from '@/components'
import Header from '@/components/header'
import { useVisible, useVisibleRef } from '@/hooks'
import { Colors } from '@/theme'
import { DateRange, ETimePeriod, timePeriodOptions } from '@/types'
import dayjs from 'dayjs'
import { cloneElement, ReactElement, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import SelectDateRange from '../selectDateRange'

type Value = {
  dateRange?: DateRange
  periodDate?: ETimePeriod
}

export type SelectPeriodDateProps = {
  onChange?(value: Value): void
  defaultValue?: Value
  children: ReactElement<any, string>
}

const SelectPeriodDate = ({ children, ...rest }: SelectPeriodDateProps) => {
  const { onClose, onOpen, ref } = useVisibleRef()

  const triggerElement = useMemo(() => {
    return cloneElement(children, { onPress: onOpen })
  }, [children, onOpen])

  return (
    <>
      {triggerElement}
      <BottomSheetModal ref={ref} enableDynamicSizing>
        <Content {...rest} onClose={onClose} />
      </BottomSheetModal>
    </>
  )
}

const Content = ({
  onClose,
  onChange,
  defaultValue,
}: Omit<SelectPeriodDateProps, 'children'> & {
  onClose(): void
}) => {
  const { onClose: onCloseDateRange, onOpen: onOpenDateRange, visible: dateRangeVisible } = useVisible()

  const hasDateRangeValue = !!(defaultValue?.dateRange?.fromDate && defaultValue?.dateRange?.toDate)
  const hasPeriodDateValue = !!defaultValue?.periodDate

  return (
    <>
      <Header
        title={dateRangeVisible ? 'Chọn khoảng thời gian' : 'Chọn thời gian'}
        right={<IconButton onPress={onClose} icon={CloseIcon} size={20} color={Colors.gray80} />}
        left={
          dateRangeVisible ? (
            <IconButton size={20} icon={ArrowLeftIcon} color={Colors.gray80} onPress={onCloseDateRange} />
          ) : (
            <IconButton
              size={20}
              icon={ResetIcon}
              color={Colors.gray80}
              disabled={!hasDateRangeValue && !hasPeriodDateValue}
              onPress={() => {
                onClose()
                requestAnimationFrame(() => {
                  onChange?.({ dateRange: undefined, periodDate: undefined })
                })
              }}
            />
          )
        }
      />
      {dateRangeVisible ? (
        <View style={styles.dateRange}>
          <SelectDateRange
            defaultValue={defaultValue?.dateRange}
            onClose={onCloseDateRange}
            onChange={(value) => {
              onClose()
              requestAnimationFrame(() => {
                onChange?.({ dateRange: { fromDate: value.fromDate, toDate: value.toDate }, periodDate: undefined })
              })
            }}
          />
        </View>
      ) : (
        <>
          {timePeriodOptions.map((i) => (
            <ListItem
              key={i.value}
              title={i.label}
              active={i.value === defaultValue?.periodDate}
              onPress={() => {
                onClose()
                requestAnimationFrame(() => {
                  onChange?.({ periodDate: i.value, dateRange: undefined })
                })
              }}
            />
          ))}
          <ListItem
            onPress={onOpenDateRange}
            active={hasDateRangeValue}
            title="Trong khoảng thời gian"
            right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
            subTitle={
              hasDateRangeValue
                ? `${dayjs(defaultValue.dateRange?.fromDate).format('DD/MM/YYYY')} -> ${dayjs(defaultValue.dateRange?.toDate).format('DD/MM/YYYY')}`
                : undefined
            }
          />
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  dateRange: {
    height: 500,
  },
})

export default SelectPeriodDate
