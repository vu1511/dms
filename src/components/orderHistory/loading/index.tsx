import { BaseStyles, Colors } from '@/theme'
import { View } from 'react-native'

const OrderHistoryListLoading = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {Array.from({ length: 16 }).map((_, index) => (
        <View key={index} style={{ paddingHorizontal: 16, paddingVertical: 12, rowGap: 12 }}>
          <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap12]}>
            <View style={{ height: 24, width: 120, backgroundColor: Colors.gray20, borderRadius: 8 }} />
            <View style={{ width: 42, height: 24, backgroundColor: Colors.gray20, borderRadius: 8 }} />
          </View>

          <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap32]}>
            <View style={{ height: 12, width: '70%', backgroundColor: Colors.gray20, borderRadius: 8 }} />
          </View>
          <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap32]}>
            <View style={{ height: 12, width: '90%', backgroundColor: Colors.gray20, borderRadius: 8 }} />
          </View>
          <View style={[BaseStyles.flexRowSpaceBetween, BaseStyles.cGap32]}>
            <View style={{ height: 12, width: '100%', backgroundColor: Colors.gray20, borderRadius: 8 }} />
          </View>
        </View>
      ))}
    </View>
  )
}

export default OrderHistoryListLoading
