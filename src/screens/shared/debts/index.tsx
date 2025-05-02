import {
  BaseMutateFetcherResponse,
  BaseQueryInfiniteList,
  BaseRenderQueryInfiniteComponent,
  Container,
  CustomersLoading,
  ListItemSeparator,
  SearchInput,
} from '@/components'
import { SwrKey } from '@/constants'
import { Navigation, RouteProp, Routes } from '@/routes'
import { debtAPI } from '@/services'
import { BaseStyles, Colors } from '@/theme'
import { DebtRes, GetDebtsReq, GetDebtsRes, HTTPResponse } from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ListRenderItem } from '@shopify/flash-list'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { DebtItem } from './debtItem'
import { DebtsHeader } from './header'

type RenderQueryInfiniteComponent = BaseRenderQueryInfiniteComponent<
  GetDebtsReq,
  HTTPResponse<GetDebtsRes>,
  GetDebtsReq,
  DebtRes
>

const Debts = () => {
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<Routes.Inventories>>()

  const renderItem: ListRenderItem<DebtRes> = useCallback(
    ({ item }) => {
      return (
        <DebtItem
          name={item.name}
          amountPaid={item.amount_paid}
          amountResidual={item.amount_residual}
          amountTotal={item.amount_total}
          createDate={item.create_date}
          state={item.payment_state?.value}
          stateLabel={item.payment_state?.name}
          onPress={() => {
            navigation.navigate(Routes.DebtDetail, { debtId: item.id, initialData: item })
          }}
        />
      )
    },
    [navigation]
  )

  const renderStickyHeader: RenderQueryInfiniteComponent = useCallback(
    ({ filter, params }) => (
      <View style={styles.header}>
        <SearchInput value={params?.keyword} onChange={(keyword) => filter({ keyword })} />
      </View>
    ),
    []
  )

  const renderHeader: RenderQueryInfiniteComponent = useCallback(
    ({ data, additionalData }) =>
      additionalData &&
      !!data?.length && (
        <View style={BaseStyles.mb16}>
          <DebtsHeader data={additionalData} />
        </View>
      ),
    []
  )

  const mutateFetcherResponse: BaseMutateFetcherResponse<HTTPResponse<GetDebtsRes>, DebtRes, GetDebtsReq> = useCallback(
    (res, params) => {
      const { payments, ...additionalData } = res.result.data
      return {
        data: payments,
        additionalData,
        hasMore: payments.length >= (params.limit ?? 0),
      }
    },
    []
  )

  return (
    <Container title="Công nợ" headerShadowVisible={false}>
      <BaseQueryInfiniteList
        swrKey={SwrKey.debts}
        provider="FlashList"
        estimatedItemSize={92}
        fetcher={debtAPI.getDebts}
        ListLoadingComponent={<CustomersLoading />}
        initialParams={params.initialParams}
        mutateFetcherResponse={mutateFetcherResponse}
        renderHeader={renderHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        renderStickyHeader={renderStickyHeader}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    ...BaseStyles.borderBottom,
  },
})

export default Debts
