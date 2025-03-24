import { CloseIcon, ThreeDotsIcon, TrashIcon, UserAddIcon, UsersFillIcon } from '@/assets'
import {
  BottomSheetModal,
  Button,
  Container,
  CustomersLoading,
  Empty,
  Header,
  IconButton,
  ListItem,
  ListItemSeparator,
  Popover,
} from '@/components'
import { SwrKey } from '@/constants'
import { System } from '@/core'
import { useAsyncV2, useVisibleRef } from '@/hooks'
import { Navigation, RouteProp, Routes } from '@/routes'
import { routeAPI } from '@/services'
import { BaseStyles, Colors } from '@/theme'
import { PartnerRes } from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { produce, WritableDraft } from 'immer'
import { useCallback } from 'react'
import { FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import useSWR from 'swr'
import { CustomerItem } from './customerItem'
import { Customers } from './customers'
import { styles } from './styles'

const MIN_OFFSET_Y = 16

const UpdateRoute = () => {
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<Routes.UpdateRoute>>()
  const { data } = params
  const { bottom } = useSafeAreaInsets()

  const { onClose, onOpen, ref } = useVisibleRef()

  const animatedValue = useSharedValue(0)

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    elevation: animatedValue.value === 1 ? 6 : 0,
    shadowColor: animatedValue.value === 1 ? Colors.gray50 : Colors.transparent,
    borderBottomWidth: animatedValue.value === 1 ? 1 : 0,
  }))

  const { trigger } = useAsyncV2(routeAPI.updateRoute, {
    showBackdrop: false,
    errorMsg: 'Cập nhật tuyến không thành công',
  })

  const {
    data: customers,
    isLoading,
    mutate,
  } = useSWR<PartnerRes[]>(SwrKey.route_customers(data.hierarchy_id), () =>
    routeAPI
      .getRouteDetail({ hierarchy_id: data.hierarchy_id })
      .then((res) => res?.result?.data?.[0]?.partner_ids?.[0] || [])
      .catch(() => [])
  )

  const deleteCustomer = useCallback(
    (customerId: number) => {
      if (!customers?.length) return

      System.showPopup({
        confirmBtnText: 'Xoá khách hàng',
        message: 'Bạn có chắc muốn xoá khách hàng này?',
        confirmBtnProps: { style: { backgroundColor: Colors.danger } },
        onCancel: () => {},
        onConfirm: () => {
          let customer: PartnerRes | undefined
          let customerIndex = -1

          mutate(
            (customers) =>
              produce(customers, (draft) => {
                if (customers?.length && draft?.length) {
                  const index = customers.findIndex((item) => item.id === customerId)
                  if (index !== -1) {
                    customerIndex = index
                    customer = customers[index]
                    draft.splice(index, 1)
                  }
                }
              }),
            false
          )

          const partner_ids = customers.filter((item) => item.id !== customerId).map((item) => item.id)

          trigger({
            partner_ids,
            delete_partner_ids: [customerId],
            hierarchy_id: data.hierarchy_id,
          }).then(({ isSuccess }) => {
            if (!isSuccess && customerIndex > -1 && customer) {
              mutate(
                (customers) =>
                  produce(customers, (draft) => {
                    if (draft?.length) {
                      draft.splice(customerIndex, 0, customer as WritableDraft<PartnerRes>)
                    }
                  }),
                false
              )
            }
          })
        },
      })
    },
    [customers, data.hierarchy_id, mutate, trigger]
  )

  const addCustomers = async (partners: PartnerRes[]) => {
    const nextCustomers = [...(customers || []), ...partners]

    const { isSuccess } = await trigger({
      delete_partner_ids: [],
      hierarchy_id: data.hierarchy_id,
      partner_ids: nextCustomers.map((item) => item.id),
    })

    if (isSuccess) {
      onClose()
      mutate(nextCustomers, false)
    }
  }

  const renderItem: ListRenderItem<PartnerRes> = useCallback(
    ({ item }) => (
      <CustomerItem
        key={item.id}
        name={item.name}
        phone={item.phone}
        avatar={item?.img_url || ''}
        onDelete={() => deleteCustomer(item?.id)}
      />
    ),
    [deleteCustomer]
  )

  const handleScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y
    animatedValue.value = offsetY > MIN_OFFSET_Y ? 1 : 0
  }, [])

  const deleteAllCustomers = () => {
    if (!customers?.length) return

    System.showPopup({
      message: 'Bạn có chắc muốn xoá tất cả khách hàng?',
      description: 'Hành động này không thể hoàn tác',
      confirmBtnProps: { style: { backgroundColor: Colors.danger } },
      onCancel: () => {},
      onConfirm: async () => {
        const delete_partner_ids = customers.map((item) => item.id)

        const { isSuccess } = await trigger({
          partner_ids: [],
          delete_partner_ids,
          hierarchy_id: data.hierarchy_id,
        })

        if (isSuccess) {
          mutate([])
        }
      },
    })
  }

  return (
    <Container headerShadowVisible={false} title={`Cập nhật ${data?.name ?? ''}`}>
      <FlatList
        data={customers}
        refreshing={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: bottom, flexGrow: 1 }}
        onRefresh={mutate}
        onScroll={handleScroll}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        ListHeaderComponent={
          <Animated.View style={[styles.header, headerAnimatedStyle, { shadowOffset: { width: 0, height: 3 } }]}>
            <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap4]}>
              <UsersFillIcon size={16} fill={Colors.primary} />
              <Text style={styles.headerTitle}>Khách hàng ({customers?.length ?? 0})</Text>
            </View>
            <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap32]}>
              <Popover trigger={<IconButton color={Colors.gray80} size={18} onPress={onOpen} icon={ThreeDotsIcon} />}>
                {({ closePopover }) => (
                  <View style={styles.popover}>
                    <ListItem
                      onPress={() => {
                        closePopover()
                        requestAnimationFrame(() => {
                          navigation.navigate(Routes.CreateCustomer, {
                            showRoute: false,
                            onSuccess: () => {
                              mutate()
                              navigation.pop()
                            },
                            route: { id: data.hierarchy_id, name: data.name },
                          })
                        })
                      }}
                      title="Tạo khách hàng"
                      left={<UserAddIcon size={18} fill={Colors.gray80} />}
                    />
                    <ListItem
                      title="Xoá tất cả"
                      disabled={!customers?.length}
                      titleStyle={styles.dangerColor}
                      left={<TrashIcon size={18} fill={Colors.danger} />}
                      onPress={() => {
                        closePopover()
                        requestAnimationFrame(() => {
                          deleteAllCustomers()
                        })
                      }}
                    />
                  </View>
                )}
              </Popover>
              <Button
                type="text"
                title="Thêm"
                onPress={onOpen}
                textStyle={styles.addBtnText}
                left={
                  <SvgXml
                    color={Colors.primary}
                    xml='<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M8.75004 4.66666C8.38337 4.66666 8.08337 4.96666 8.08337 5.33333V7.33333H6.08337C5.71671 7.33333 5.41671 7.63333 5.41671 8C5.41671 8.36666 5.71671 8.66666 6.08337 8.66666H8.08337V10.6667C8.08337 11.0333 8.38337 11.3333 8.75004 11.3333C9.11671 11.3333 9.41671 11.0333 9.41671 10.6667V8.66666H11.4167C11.7834 8.66666 12.0834 8.36666 12.0834 8C12.0834 7.63333 11.7834 7.33333 11.4167 7.33333H9.41671V5.33333C9.41671 4.96666 9.11671 4.66666 8.75004 4.66666ZM8.75004 1.33333C5.07671 1.33333 2.08337 4.32666 2.08337 8C2.08337 11.6733 5.07671 14.6667 8.75004 14.6667C12.4234 14.6667 15.4167 11.6733 15.4167 8C15.4167 4.32666 12.4234 1.33333 8.75004 1.33333ZM8.75004 13.3333C5.81004 13.3333 3.41671 10.94 3.41671 8C3.41671 5.06 5.81004 2.66666 8.75004 2.66666C11.69 2.66666 14.0834 5.06 14.0834 8C14.0834 10.94 11.69 13.3333 8.75004 13.3333Z" fill="currentColor"/></svg>'
                  />
                }
              />
            </View>
          </Animated.View>
        }
        ListEmptyComponent={
          isLoading ? (
            <CustomersLoading />
          ) : (
            <Empty onBtnPress={onOpen} title="Chưa có khách hàng nào trong tuyến" titleBtn="Thêm khách hàng" />
          )
        }
      />

      <BottomSheetModal ref={ref} showBottomSpacing={false} snapPoints={['85%']}>
        <Header
          title="Thêm khách hàng"
          right={<IconButton onPress={onClose} icon={CloseIcon} size={20} color={Colors.gray80} />}
        />
        <Customers onChange={addCustomers} />
      </BottomSheetModal>
    </Container>
  )
}

export default UpdateRoute
