import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@/assets'
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Chip,
  Empty,
  Header,
  IconButton,
  ListItem,
  ListItemSeparator,
  MovableScreen,
} from '@/components'
import { SwrKey } from '@/constants'
import { BaseStyles, Colors } from '@/theme'
import { BookingType, BookingTypeLabel, GetOrderHistoryListReq, GetStatusOrderRes, Option } from '@/types'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Fragment, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import { styles } from './style'

type FilterProps = {
  onClose: () => void
  onChange?: (val: GetOrderHistoryListReq) => void
  defaultValue?: GetOrderHistoryListReq
}

type Params = Omit<GetOrderHistoryListReq, 'limit' | 'offset'>

export const Filter = ({ onClose, onChange, defaultValue }: FilterProps) => {
  const { bottom } = useSafeAreaInsets()

  const { data, isLoading } = useSWR<GetStatusOrderRes>(SwrKey.orderStatuses)

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [params, setParams] = useState<Params>(() => {
    const { limit, offset, keyword, partner_id, ...rest } = defaultValue || {}
    return rest
  })

  const options = useMemo<(Option<BookingType> & { items: Option[] })[]>(() => {
    return data
      ? Object.entries(data).map(([key, value]) => ({
          value: key as BookingType,
          label: BookingTypeLabel?.[key as BookingType] ?? '',
          items: Object.entries(value).map(([key, value]) => ({
            value: key,
            label: value as string,
          })),
        }))
      : []
  }, [data])

  const isVisible = currentIndex !== null
  const currentStatus = isVisible ? options[currentIndex] : null

  const RenderHeader = useMemo(() => {
    return (
      <Header
        title="Bộ lọc"
        right={<IconButton color={Colors.gray80} size={20} icon={CloseIcon} onPress={onClose} />}
      />
    )
  }, [onClose])

  const goBack = () => {
    setCurrentIndex(null)
  }

  const handleChange = () => {
    onClose()
    requestAnimationFrame(() => {
      onChange?.(params)
    })
  }

  if (isLoading) {
    return (
      <>
        {RenderHeader}
        <ActivityIndicator size={24} style={BaseStyles.pt72} />
      </>
    )
  }

  if (!options.length) {
    return (
      <>
        {RenderHeader}
        <Empty />
      </>
    )
  }

  return (
    <MovableScreen
      visible={isVisible}
      movableScreen={
        !!currentStatus && (
          <>
            <Header
              title={currentStatus.label}
              left={<IconButton color={Colors.gray80} size={20} icon={ArrowLeftIcon} onPress={goBack} />}
              right={<IconButton color={Colors.gray80} size={20} icon={CloseIcon} onPress={onClose} />}
            />
            <BottomSheetScrollView contentContainerStyle={[BaseStyles.grow1, { paddingBottom: bottom }]}>
              {currentStatus.items.map((i, _index) => {
                const isActive = params?.booking_type === currentStatus.value && params?.booking_state === i.value
                return (
                  <Fragment key={i.value}>
                    <ListItem
                      title={i.label}
                      style={BaseStyles.py16}
                      onPress={() => {
                        goBack()
                        setParams((prevParams) => ({
                          ...prevParams,
                          booking_type: currentStatus.value,
                          booking_state: i.value,
                        }))
                      }}
                      left={<Checkbox readOnly size={20} type="radio" value={isActive} />}
                    />
                    {_index < currentStatus.items.length - 1 && <ListItemSeparator style={BaseStyles.pl16} />}
                  </Fragment>
                )
              })}
            </BottomSheetScrollView>
          </>
        )
      }
    >
      {RenderHeader}
      <BottomSheetScrollView contentContainerStyle={BaseStyles.grow1}>
        {options.map((item, index) => {
          const isActive = params?.booking_type === item.value
          const subTitle = isActive ? item.items.find((i) => i.value === params?.booking_state)?.label : undefined
          return (
            <View key={item.value}>
              <ListItem
                title={item.label}
                style={BaseStyles.py16}
                disabled={!item.items?.length}
                onPress={() => setCurrentIndex(index)}
                right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
                left={<Checkbox readOnly size={20} type="radio" value={isActive} />}
                subTitle={
                  subTitle && (
                    <Chip
                      label={subTitle}
                      color={Colors.primary}
                      right={<CloseIcon size={14} fill={Colors.primary} />}
                      onPress={() =>
                        setParams((prevParams) => ({
                          ...prevParams,
                          booking_type: undefined,
                          booking_state: undefined,
                        }))
                      }
                    />
                  )
                }
              />
              {index < options.length - 1 && <ListItemSeparator style={BaseStyles.pl16} />}
            </View>
          )
        })}
      </BottomSheetScrollView>
      <View style={styles.footer}>
        <Button
          title="Đặt lại"
          onPress={() => setParams({ booking_state: undefined, booking_type: undefined })}
          style={styles.footerLeftBtn}
          textStyle={styles.footerLeftBtnText}
        />
        <Button title="Lưu" style={styles.footerRightBtn} onPress={handleChange} />
      </View>
    </MovableScreen>
  )
}
