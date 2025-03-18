import { ArrowDownIcon, CloseIcon, LocationFillIcon, NotificationIcon } from '@/assets'
import {
  ActivityIndicator,
  Avatar,
  BottomSheetModal,
  Empty,
  Header,
  IconButton,
  ListItem,
  ListItemSeparator,
} from '@/components'
import { SwrKey } from '@/constants'
import { useVisibleRef } from '@/hooks'
import { Routes } from '@/routes'
import { productAPI } from '@/services'
import { useUserSlice } from '@/store'
import { BaseStyles, Colors } from '@/theme'
import { Navigation } from '@/types'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import { styles } from './style'

export const HomeHeader = () => {
  const { top } = useSafeAreaInsets()
  const navigation = useNavigation<Navigation>()
  const { onClose, onOpen, ref } = useVisibleRef()

  const user = useUserSlice((state) => state.userInfo)
  const company = useUserSlice((state) => state.company)
  const setCompany = useUserSlice((state) => state.setCompany)

  const { data: msgUnreadCount = 0 } = useSWR<number>(SwrKey.notification_count)

  const { data: companies, isLoading: isLoadingCompanies } = useSWR(SwrKey.companies, () =>
    productAPI
      .getCompanies()
      .then((res) => {
        const companies = res?.result?.data?.[0]?.lst_companies || []
        if (companies?.[0]?.id && !company) {
          setCompany(companies[0])
        }
        return companies
      })
      .catch(() => undefined)
  )

  return (
    <View style={styles.header}>
      <View style={styles.userSectionWrapper}>
        <View style={{ height: top }} />
        <View style={styles.userInfo}>
          <View style={styles.userInfo}>
            <Avatar source={user?.image_url ?? ''} size={40} />
            <View style={styles.userContent}>
              <Text numberOfLines={1} style={styles.userName}>
                {user?.name ?? ''}
              </Text>
              <TouchableOpacity hitSlop={12} activeOpacity={0.5} onPress={onOpen} style={styles.companyArea}>
                <LocationFillIcon fill={Colors.white} size={16} />
                <Text numberOfLines={1} style={styles.companyText}>
                  {company?.name ? company.name : 'Chưa có công ty nào'}
                </Text>
                <ArrowDownIcon fill={Colors.white} size={16} />
              </TouchableOpacity>
            </View>
          </View>
          <Pressable onPress={() => navigation.navigate(Routes.Notification)} style={styles.notification}>
            <View style={styles.notificationIconWrapper}>
              <NotificationIcon fill={Colors.text} size={20} />
              {msgUnreadCount > 0 ? <View style={styles.dot} /> : null}
            </View>
          </Pressable>
        </View>
      </View>
      <BottomSheetModal ref={ref} snapPoints={[400]}>
        <Header
          title="Chọn công ty"
          right={<IconButton color={Colors.gray80} size={20} icon={CloseIcon} onPress={onClose} />}
        />
        <BottomSheetFlatList
          data={companies}
          ItemSeparatorComponent={ListItemSeparator}
          ListEmptyComponent={
            isLoadingCompanies ? (
              <View style={[BaseStyles.pt72, BaseStyles.flexCenter]}>
                <ActivityIndicator size={24} color={Colors.primary} />
              </View>
            ) : (
              <Empty title="Không có công ty nào" />
            )
          }
          renderItem={({ item }) => {
            const isActive = company?.id === item.id
            return (
              <ListItem
                onPress={() => {
                  if (!isActive) {
                    setCompany(item)
                  }
                  onClose()
                }}
                active={isActive}
                title={item.name}
              />
            )
          }}
        />
      </BottomSheetModal>
    </View>
  )
}
