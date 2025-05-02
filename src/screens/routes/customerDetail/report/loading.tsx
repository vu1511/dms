import { Colors } from '@/theme'
import { View } from 'react-native'

export const ReportLoading = () => {
  return (
    <View style={{ rowGap: 24, paddingVertical: 16 }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={{ flexDirection: 'row', columnGap: 12 }}>
          <View
            style={{ width: 24, height: 24, backgroundColor: Colors.gray20, borderRadius: 8, alignSelf: 'center' }}
          />
          <View style={{ flex: 1, height: 16, backgroundColor: Colors.gray20, borderRadius: 4, alignSelf: 'center' }} />
        </View>
      ))}
    </View>
  )
}
