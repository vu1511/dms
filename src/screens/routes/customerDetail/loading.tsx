import { Colors } from '@/theme'
import { View } from 'react-native'

export const UserInfoLoading = () => {
  return (
    <View style={{ paddingVertical: 12, rowGap: 12 }}>
      <View style={{ backgroundColor: Colors.white, padding: 16, rowGap: 24 }}>
        <View style={{ rowGap: 12 }}>
          <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
            <View style={{ width: 56, height: 56, backgroundColor: Colors.gray20, borderRadius: 56 / 2 }} />
            <View style={{ flex: 1, rowGap: 12 }}>
              <View style={{ width: '70%', height: 16, backgroundColor: Colors.gray20, borderRadius: 4 }} />
              <View style={{ width: '90%', height: 12, backgroundColor: Colors.gray20, borderRadius: 4 }} />
            </View>
          </View>
          <View
            style={{ width: '70%', height: 32, backgroundColor: Colors.gray20, borderRadius: 8, alignSelf: 'center' }}
          />
        </View>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={{ flexDirection: 'row', columnGap: 12 }}>
            <View
              style={{ width: 24, height: 24, backgroundColor: Colors.gray20, borderRadius: 8, alignSelf: 'center' }}
            />
            <View
              style={{ flex: 1, height: 24, backgroundColor: Colors.gray20, borderRadius: 8, alignSelf: 'center' }}
            />
          </View>
        ))}
      </View>
    </View>
  )
}
