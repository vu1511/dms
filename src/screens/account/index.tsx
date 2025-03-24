import { ArrowRightIcon, SecureIcon } from '@/assets'
import { Avatar, Button, Container } from '@/components'
import { SwrKey } from '@/constants'
import { System } from '@/core'
import { useAuth } from '@/hooks'
import { Routes } from '@/routes'
import { userAPI } from '@/services'
import { useUserSlice } from '@/store'
import { Colors, Typography } from '@/theme'
import { AccountType, AccountTypeNames } from '@/types'
import { formatMoneyVND } from '@/utils'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import { useNavigation } from '@react-navigation/native'
import { useMemo } from 'react'
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useSWR from 'swr'
import { styles } from './styles'

const Account = () => {
  const navigation = useNavigation<any>()
  const { top } = useSafeAreaInsets()

  const setUserInfo = useUserSlice((state) => state.setUserInfo)
  const user = useUserSlice((state) => state.userInfo)
  const { logout } = useAuth()

  useSWR(SwrKey.userInfo, () =>
    userAPI.getUserInfo().then((res) => {
      const result = res.result.data
      if (result.info_customer?.id) {
        setUserInfo(result.info_customer)
      }
    })
  )

  const options = useMemo(() => {
    if (!user?.id) return []

    const options = [
      {
        id: 1,
        title: 'Cá nhân',
        children: [
          // {
          //   name: 'Tài khoản',
          //   Icon: UserIcon,
          //   route: Routes.AccountInfo,
          //   hidden: false,
          // },
          // {
          //   name: 'Yêu thích',
          //   Icon: HeartIcon,
          //   route: Routes.WishList,
          //   hidden: false,
          // },
          // {
          //   id: 4,
          //   name: 'Khuyến mãi',
          //   Icon: CouponIcon,
          //   route: Routes.Promotion,
          //   hidden: false,
          // },
        ],
      },
      {
        id: 2,
        title: 'Cài đặt',
        children: [
          {
            id: 7,
            name: 'Đổi mật khẩu',
            Icon: SecureIcon,
            route: Routes.ChangePassword,
            hidden: false,
          },
          // {
          //   id: 8,
          //   name: 'Thiết lập máy in',
          //   Icon: ShareIcon,
          //   route: Routes.SelectPrinter,
          //   hidden: !user?.account_type || user?.account_type === 'th',
          // },
          // {
          //   id: 9,
          //   name: 'Truy cập trang admin',
          //   Icon: ShareIcon,
          //   route: Routes.AdminSite,
          //   hidden: !user?.account_type || user?.account_type === 'th',
          // },
          // {
          //   id: 8,
          //   name: 'Liên hệ chúng tôi',
          //   Icon: NoteIcon,
          //   route: Routes.ContactUs,
          //   hidden: false,
          // },
        ],
      },
    ]

    return options
  }, [user])

  const handleLogout = () => {
    System.showPopup({
      message: 'Bạn có chắc chắn muốn đăng xuất',
      onCancel: () => {},
      onConfirm: logout,
    })
  }

  return (
    <Container headerShown={false}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={{ padding: 12 }}>
            <View style={{ height: top }} />
            <View style={styles.userInfoSection}>
              <Pressable onPress={() => navigation.navigate(Routes.AccountInfo)} style={styles.userInfo}>
                <Avatar size={62} source={user?.image_url || ''} />
                <View style={styles.userInfoContent}>
                  <Text numberOfLines={1} style={[Typography.body16SemiBold, { marginBottom: 4 }]}>
                    {user?.name || ''}
                  </Text>
                  <Text numberOfLines={1} style={[Typography.body13Medium, { color: Colors.gray60, marginBottom: 2 }]}>
                    {AccountTypeNames?.[user?.account_type as AccountType] || ''}
                  </Text>
                  <Text numberOfLines={1} style={[Typography.body13Medium, { color: Colors.gray60 }]}>
                    {user?.phone || ''}
                  </Text>
                </View>
              </Pressable>
              <View style={styles.statistical}>
                <View style={styles.statisticalItem}>
                  <Text numberOfLines={1} style={styles.statisticalItemLabel}>
                    Tổng điểm
                  </Text>
                  <Text style={styles.statisticalItemValue}>{user?.loyalty_point || 0}</Text>
                </View>
                <View style={[styles.statisticalItem, { backgroundColor: Colors.greenBg }]}>
                  <Text numberOfLines={1} style={styles.statisticalItemLabel}>
                    Tổng đơn hàng
                  </Text>
                  <Text style={styles.statisticalItemValue}>{user?.total_sale_order || 0}</Text>
                </View>
                <View style={[styles.statisticalItem, { backgroundColor: Colors.orangeBg }]}>
                  <Text numberOfLines={1} style={styles.statisticalItemLabel}>
                    Doanh thu / Tháng
                  </Text>
                  <Text style={styles.statisticalItemValue}>{formatMoneyVND(user?.total || 0)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.optionArea}>
            {user?.barcode ? (
              <View style={styles.optionParentBarcode}>
                <View style={styles.optionItemBarcode}>
                  <Barcode maxWidth={Dimensions.get('window').width - 32} width={2} height={48} value={user?.barcode} />
                </View>
              </View>
            ) : null}

            {options.map((item) => (
              <View key={item.id} style={styles.optionParent}>
                <Text style={styles.optionTitle}>{item.title}</Text>

                {item.children.map(
                  ({ name, route, hidden }) =>
                    !hidden && (
                      <Pressable key={route} style={styles.optionItem} onPress={() => navigation.navigate(route)}>
                        {/* <Icon size={16} fill={Colors.gray70} /> */}
                        <Text style={styles.optionItemLabel}>{name}</Text>
                        <ArrowRightIcon size={24} fill={Colors.gray50} />
                      </Pressable>
                    )
                )}
              </View>
            ))}
          </View>

          <Button
            style={{ backgroundColor: Colors.white }}
            textStyle={{ color: Colors.danger }}
            onPress={handleLogout}
            title="Đăng xuất"
          />
        </View>
      </ScrollView>
    </Container>
  )
}

export default Account
