// import {
//   BarCodeIcon,
//   CartFillIcon,
//   ClockFillIcon,
//   CouponIcon,
//   MoneyBagFillIcon,
//   NoteCheckFillIcon,
//   NoteEditFillIcon,
//   ReturnGoodsFillIcon,
//   RouteIcon,
//   TrolleyFillIcon,
//   UsersFillIcon,
// } from '@/assets'
import { Navigation, Routes } from '@/routes'
import { useUserSlice } from '@/store'
import { useNavigation } from '@react-navigation/native'
import { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './style'

export const Menu = () => {
  const navigation = useNavigation<Navigation>()
  const accountType = useUserSlice((state) => state.userInfo?.account_type)

  const options = useMemo(() => {
    if (!accountType || accountType === 'th') return []

    const options = [
      {
        color: '#0029FF',
        label: 'Lịch sử Check-in',
        // icon: ClockFillIcon,
        onPress: () => navigation.navigate(Routes.VisitHistory),
      },
      {
        color: '#01A4FF',
        label: 'Giỏ hàng',
        // icon: CartFillIcon,
        onPress: () => navigation.navigate(Routes.Cart),
      },
      {
        color: '#1A96F0',
        label: 'Khách hàng',
        // icon: UsersFillIcon,
        onPress: () => navigation.navigate(Routes.ManagerAccount),
      },

      {
        color: '#7000FF',
        label: 'Chấm công',
        // icon: NoteEditFillIcon,
        onPress: () => navigation.navigate(Routes.Timekeeping),
      },
      {
        color: '#FF9900',
        label: 'Trả hàng',
        // icon: ReturnGoodsFillIcon,
        onPress: () => navigation.navigate(Routes.ReturnMaterial),
      },
      {
        color: '#57629E',
        label: 'Đặt hàng QR',
        // icon: BarCodeIcon,
        onPress: () => navigation.navigate(Routes.QuickOrder),
      },
      {
        color: '#6E579E',
        label: 'Báo cáo',
        // icon: NoteCheckFillIcon,
        onPress: () => navigation.navigate(Routes.Report),
      },
      {
        color: '#00BCD3',
        label: 'Kiểm tồn',
        // icon: TrolleyFillIcon,
        onPress: () =>
          navigation.navigate(Routes.CreateInventory, {
            // onSuccess: (item: CustomerRes) => {
            //   navigation.replace(Routes.OutletInfo, {
            //     item,
            //     initialRoute: OutletInfoRoutes.inventory,
            //   })
            // },
            // shouldNavigate: false,
          }),
      },
      {
        color: '#D180ED',
        label: 'Công nợ',
        // icon: MoneyBagFillIcon,
        onPress: () => navigation.navigate(Routes.Debts),
      },
      {
        color: '#1A82F0',
        label: 'Khuyến mãi',
        // icon: CouponIcon,
        onPress: () => navigation.navigate(Routes.Promotion),
      },
    ]

    if (['asm', 'nvkd', 'gsbh'].includes(accountType)) {
      options.unshift(
        ...[
          // {
          //   color: '#FFC700',
          //   label: 'Check-in',
          // icon: MapFillIcon,
          //   onPress: () => navigation.navigate(Routes.Visit),
          // },
          {
            color: '#FF2E00',
            label: 'Tuyến (MCP)',
            // icon: RouteIcon,
            onPress: () => navigation.navigate(Routes.RouteList),
          },
        ]
      )
    }

    return options
  }, [accountType])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiện ích</Text>
      <View style={styles.list}>
        {options.map(({ color, label, onPress }, index) => (
          <Pressable
            key={label}
            onPress={onPress}
            style={[styles.listItem, (index + 1) % 4 === 0 && { paddingRight: 0 }]}
          >
            <View style={styles.listItemInner}>
              <View style={[styles.listItemIcon, { backgroundColor: color }]}>
                {/* <Icon size={28} fill={COLORS.white} /> */}
              </View>
            </View>
            <Text numberOfLines={2} style={styles.listItemText}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
