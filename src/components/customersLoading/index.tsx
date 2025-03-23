import { Colors } from '@/theme'
import { View } from 'react-native'

const CustomersLoading = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {Array.from({ length: 16 }).map((_, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 48 / 2,
              marginRight: 12,
              backgroundColor: Colors.gray20,
            }}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{ height: 18, width: 120, marginBottom: 8, backgroundColor: Colors.gray20, borderRadius: 8 }}
            />
            <View style={{ height: 12, width: '80%', backgroundColor: Colors.gray20, borderRadius: 8 }} />
          </View>
          <View style={{ width: 36, height: 12, backgroundColor: Colors.gray20, borderRadius: 8 }} />
        </View>
      ))}
    </View>
  )
}

export default CustomersLoading
