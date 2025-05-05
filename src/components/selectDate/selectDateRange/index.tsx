import { ArrowLeftIcon, ArrowRightIcon } from '@/assets'
import { Button } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { DateRange } from '@/types'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'

LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng 1',
    'Tháng 2.',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Thg 1',
    'Thg 2.',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9.',
    'Thg 10',
    'Thg 11',
    'Thg 12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  today: 'Hôm nay',
}

LocaleConfig.defaultLocale = 'vi'

type Theme = {
  markColor: string
  markTextColor: string
}

export type SelectDateRangeProps = {
  theme?: Theme
  defaultValue?: Partial<DateRange<string>>
  onClose?: () => void
  onChange?: (date: DateRange<string>) => void
}

type MarkedDates = {
  [key: string]: {
    color: string
    textColor: string
    endingDay?: boolean
    startingDay?: boolean
  }
}

const SelectDateRange = ({
  defaultValue,
  theme = { markColor: Colors.primary, markTextColor: Colors.white },
  onClose,
  onChange,
}: SelectDateRangeProps) => {
  const [isFromDatePicked, setIsFromDatePicked] = useState<boolean>()
  const [isToDatePicked, setIsToDatePicked] = useState<boolean>()
  const [markedDates, setMarkedDates] = useState<MarkedDates | undefined>()
  const [fromDate, setFromDate] = useState<string | undefined>()
  const [dateRange, setDateRange] = useState<DateRange<string>>()

  const hasDateRangeValue = !!(dateRange?.fromDate && dateRange?.toDate)

  useEffect(() => {
    setupInitialRange()
  }, [])

  const setupInitialRange = () => {
    if (!defaultValue?.fromDate || !defaultValue?.toDate) return

    const { fromDate, toDate } = defaultValue
    const [markedDates] = setupMarkedDates(fromDate, toDate, {
      [fromDate]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    })

    setDateRange({ fromDate, toDate })
    setMarkedDates(markedDates)
    // setFromDate(fromDate)
  }

  const setupStartMarker = (day: DateData) => {
    const markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    }

    setIsFromDatePicked(true)
    setIsToDatePicked(false)
    setMarkedDates(markedDates)
    setFromDate(day.dateString)
  }

  const onDayPress = (day: DateData) => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setupStartMarker(day)
      setDateRange(undefined)
    } else if (fromDate && !isToDatePicked) {
      const newMarkedDates = { ...markedDates }
      const [mMarkedDates, range] = setupMarkedDates(fromDate, day.dateString, newMarkedDates)

      if (range >= 0) {
        setIsFromDatePicked(true)
        setIsToDatePicked(true)
        setMarkedDates(mMarkedDates)
        setDateRange({ fromDate, toDate: day.dateString })
      } else {
        setDateRange({ fromDate, toDate: '' })
        setupStartMarker(day)
      }
    }
  }

  const setupMarkedDates = (fromDate: string, toDate: string, markedDates: MarkedDates): [MarkedDates, number] => {
    const mFromDate = dayjs(fromDate)
    const mToDate = dayjs(toDate)
    const range = mToDate.diff(mFromDate, 'days')

    if (range >= 0) {
      if (range === 0) {
        markedDates = {
          [toDate]: {
            color: theme.markColor,
            textColor: theme.markTextColor,
          },
        }
      } else {
        for (let i = 1; i <= range; i++) {
          const tempDate = mFromDate.add(i, 'days').format('YYYY-MM-DD')

          markedDates[tempDate] = {
            endingDay: i >= range,
            color: theme.markColor,
            textColor: theme.markTextColor,
          }
        }
      }
    }
    return [markedDates, range]
  }

  const handleChange = () => {
    if (hasDateRangeValue) {
      onChange?.(dateRange)
    }
  }

  return (
    <View style={styles.container}>
      <View style={BaseStyles.flex1}>
        <Calendar
          enableSwipeMonths
          marking={{ dotColor: Colors.white }}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <ArrowLeftIcon size={20} fill={Colors.gray80} />
            ) : (
              <ArrowRightIcon size={20} fill={Colors.gray80} />
            )
          }
          theme={{ dayTextColor: Colors.gray80 }}
          markingType="period"
          current={fromDate}
          markedDates={markedDates}
          onDayPress={onDayPress}
        />
      </View>
      <View style={styles.footer}>
        <Button style={styles.closeBtn} title="Đóng" onPress={onClose} textStyle={styles.closeBtnText} />
        <Button style={BaseStyles.flex1} title="Xác nhận" onPress={handleChange} disabled={!hasDateRangeValue} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    columnGap: 16,
  },
  closeBtn: { flex: 1, backgroundColor: '#E3E9ED' },
  closeBtnText: {
    color: '#505F79',
  },
})

export default SelectDateRange
