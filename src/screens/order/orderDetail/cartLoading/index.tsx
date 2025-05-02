import { BaseStyles, Colors } from '@/theme'
import { View } from 'react-native'

export const CartLoading = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <View
        style={{
          marginBottom: 8,
          marginTop: 8,
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
      >
        <View style={{ width: 120, height: 20, marginBottom: 8, backgroundColor: Colors.gray20, borderRadius: 8 }} />
        <View style={{ width: '80%', height: 20, marginBottom: 4, backgroundColor: Colors.gray20, borderRadius: 8 }} />
        <View style={{ width: 120, height: 20, marginBottom: 8, backgroundColor: Colors.gray20, borderRadius: 8 }} />
      </View>
      <View>
        <View
          style={{
            ...BaseStyles.flexRowSpaceBetween,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderBottomColor: Colors.gray10,
            borderBottomWidth: 0.8,
            borderRadius: 8,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 28, height: 28, marginRight: 8, backgroundColor: Colors.gray20, borderRadius: 8 }} />
            <View style={{ width: 120, height: 20, backgroundColor: Colors.gray20, borderRadius: 8 }} />
          </View>
          <View style={{ width: 28, height: 18, backgroundColor: Colors.gray20, borderRadius: 8 }} />
        </View>
        <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
          <View
            style={{
              marginBottom: 24,
              width: 150,
              height: 20,
              backgroundColor: Colors.gray20,
              borderRadius: 8,
            }}
          />
          {Array.from({ length: 12 }).map((_, index) => (
            <View key={index} style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{ width: 28, height: 28, marginRight: 12, backgroundColor: Colors.gray20, borderRadius: 8 }}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: Colors.gray20,
                      marginRight: 12,
                      borderRadius: 8,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <View style={{ marginBottom: 8, height: 20, backgroundColor: Colors.gray20, borderRadius: 8 }} />
                    <View style={{ width: 120, height: 20, backgroundColor: Colors.gray20, borderRadius: 8 }} />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
