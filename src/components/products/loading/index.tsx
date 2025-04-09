import { Colors } from '@/theme'
import { View } from 'react-native'

const ProductsLoading = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {Array.from({ length: 16 }).map((_, index) => (
        <View key={index} style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              marginRight: 12,
              backgroundColor: Colors.gray20,
            }}
          />
          <View style={{ flex: 1, rowGap: 8 }}>
            <View style={{ height: 16, width: '100%', backgroundColor: Colors.gray20, borderRadius: 4 }} />
            <View style={{ height: 12, width: '80%', backgroundColor: Colors.gray20, borderRadius: 4 }} />
            <View style={{ height: 12, width: '70%', backgroundColor: Colors.gray20, borderRadius: 4 }} />
          </View>
        </View>
      ))}
    </View>
  )
}

export default ProductsLoading
