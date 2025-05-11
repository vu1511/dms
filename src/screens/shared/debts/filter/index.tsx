import { CloseIcon, ResetIcon } from '@/assets'
import {
  ActivityIndicator,
  BottomAreaView,
  Button,
  Container,
  Empty,
  IconButton,
  ListItemSeparator,
} from '@/components'
import { useDebtsFilter } from '@/hooks'
import { Navigation, RouteProp, Routes } from '@/routes'
import { BaseStyles, Colors } from '@/theme'
import { EDebtsFilterKey, GetDebtsReq, Option } from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Fragment, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { DateRangeLine } from './dateRangeLine'
import { FilterLine } from './filterLine'
import { PartnersLine } from './partnersLine'

export type FilterData = Option & { items: Option[] }

const DebtsFilter = () => {
  const navigation = useNavigation<Navigation>()
  const {
    params: { onChange, defaultValues },
  } = useRoute<RouteProp<Routes.DebtsFilter>>()

  const [params, setParams] = useState<GetDebtsReq>(defaultValues || {})

  const hasFilterValue = !!(
    params.partner_ids?.length ||
    (params.end_date && params.start_date) ||
    params.date_type ||
    params.state ||
    params.move_type ||
    params.payment_state
  )

  const { data, isLoading } = useDebtsFilter()

  const handleReset = () => {
    setParams({
      date_type: undefined,
      move_type: undefined,
      partner_ids: undefined,
      payment_state: undefined,
      start_date: undefined,
      end_date: undefined,
      state: undefined,
    })
  }

  const handleChange = (value: Partial<GetDebtsReq>) => {
    setParams((prevParams) => ({ ...prevParams, ...value }))
  }

  const handleSubmit = () => {
    onChange?.(params)
  }

  return (
    <Container
      title="Bộ lọc"
      headerShadowVisible={false}
      backgroundColor={Colors.white}
      left={<IconButton size={24} icon={CloseIcon} color={Colors.gray80} onPress={() => navigation.goBack()} />}
      right={
        <IconButton size={24} icon={ResetIcon} color={Colors.gray80} onPress={handleReset} disabled={!hasFilterValue} />
      }
    >
      <View style={BaseStyles.flex1}>
        {isLoading ? (
          <ActivityIndicator size={28} style={BaseStyles.pt72} />
        ) : !data ? (
          <Empty title="Không có bộ lọc nào được tìm thấy" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
              <Fragment key={item.value}>
                {item.value === EDebtsFilterKey.PartnerIds ? (
                  <PartnersLine
                    onChange={handleChange}
                    data={item.items as any}
                    partnerIds={params[item.value] || []}
                  />
                ) : item.value === EDebtsFilterKey.StartDate || item.value === EDebtsFilterKey.EndDate ? (
                  <DateRangeLine
                    onChange={handleChange}
                    value={
                      params.start_date && params.end_date
                        ? { fromDate: params.start_date, toDate: params.end_date }
                        : undefined
                    }
                  />
                ) : (
                  <FilterLine {...item} params={params} onChange={handleChange} />
                )}

                {index < data.length - 1 && <ListItemSeparator style={BaseStyles.pl16} />}
              </Fragment>
            ))}
          </ScrollView>
        )}
      </View>
      <BottomAreaView>
        <Button title="Xác nhận" onPress={handleSubmit} />
      </BottomAreaView>
    </Container>
  )
}

export default DebtsFilter
