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
// import { COLORS, Screen } from '@/common'
// import { useUserSlice } from '@/store'
// import { CustomerRes, Navigation, OutletInfoScreen } from '@/types'
// import { useNavigation } from '@react-navigation/native'
// import { useMemo } from 'react'
// import { Pressable, Text, View } from 'react-native'
// import { styles } from './style'

// export const Menu = () => {
//   const navigation = useNavigation<Navigation>()
//   const accountType = useUserSlice((state) => state.userInfo?.account_type)

//   const options = useMemo(() => {
//     if (!accountType || accountType === 'th') return []

//     const options = [
//       {
//         color: '#0029FF',
//         label: 'Lịch sử Check-in',
//         icon: ClockFillIcon,
//         onPress: () => navigation.navigate(Screen.VisitHistory),
//       },
//       {
//         color: '#01A4FF',
//         label: 'Giỏ hàng',
//         icon: CartFillIcon,
//         onPress: () => navigation.navigate(Screen.Cart),
//       },
//       {
//         color: '#1A96F0',
//         label: 'Khách hàng',
//         icon: UsersFillIcon,
//         onPress: () => navigation.navigate(Screen.ManagerAccount),
//       },

//       {
//         color: '#7000FF',
//         label: 'Chấm công',
//         icon: NoteEditFillIcon,
//         onPress: () => navigation.navigate(Screen.Timekeeping),
//       },
//       {
//         color: '#FF9900',
//         label: 'Trả hàng',
//         icon: ReturnGoodsFillIcon,
//         onPress: () => navigation.navigate(Screen.ReturnMaterial),
//       },
//       {
//         color: '#57629E',
//         label: 'Đặt hàng QR',
//         icon: BarCodeIcon,
//         onPress: () => navigation.navigate(Screen.QuickOrder),
//       },
//       {
//         color: '#6E579E',
//         label: 'Báo cáo',
//         icon: NoteCheckFillIcon,
//         onPress: () => navigation.navigate(Screen.Report),
//       },
//       {
//         color: '#00BCD3',
//         label: 'Kiểm tồn',
//         icon: TrolleyFillIcon,
//         onPress: () =>
//           navigation.navigate(Screen.CreateInventory, {
//             onSuccess: (item: CustomerRes) => {
//               ;(navigation as any)?.replace?.(Screen.OutletInfo, {
//                 item,
//                 initialRoute: OutletInfoScreen.inventory,
//               })
//             },
//             shouldNavigate: false,
//           }),
//       },
//       {
//         color: '#D180ED',
//         label: 'Công nợ',
//         icon: MoneyBagFillIcon,
//         onPress: () => navigation.navigate(Screen.Debts),
//       },
//       {
//         color: '#1A82F0',
//         label: 'Khuyến mãi',
//         icon: CouponIcon,
//         onPress: () => navigation.navigate(Screen.Promotion),
//       },
//     ]

//     if (['asm', 'nvkd', 'gsbh'].includes(accountType)) {
//       options.unshift(
//         ...[
//           // {
//           //   color: '#FFC700',
//           //   label: 'Check-in',
//           //   icon: MapFillIcon,
//           //   onPress: () => navigation.navigate(Screen.Visit),
//           // },
//           {
//             color: '#FF2E00',
//             label: 'Tuyến (MCP)',
//             icon: RouteIcon,
//             onPress: () => navigation.navigate(Screen.Route),
//           },
//         ]
//       )
//     }

//     return options
//   }, [accountType])

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tiện ích</Text>
//       <View style={styles.list}>
//         {options.map(({ color, icon: Icon, label, onPress }, index) => (
//           <Pressable
//             key={label}
//             onPress={onPress}
//             style={[styles.listItem, (index + 1) % 4 === 0 && { paddingRight: 0 }]}
//           >
//             <View style={styles.listItemInner}>
//               <View style={[styles.listItemIcon, { backgroundColor: color }]}>
//                 <Icon size={28} fill={COLORS.white} />
//               </View>
//             </View>
//             <Text numberOfLines={2} style={styles.listItemText}>
//               {label}
//             </Text>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   )
// }

export {}
