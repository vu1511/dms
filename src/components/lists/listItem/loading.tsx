import { BaseStyles, Colors } from '@/theme'
import { View } from 'react-native'

const ListItemLoading = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {Array.from({ length: 30 }).map((_, index) => (
        <View
          key={index}
          style={{
            ...BaseStyles.flexRowItemsCenter,
            backgroundColor: Colors.white,
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <View style={{ height: 24, width: 24, marginRight: 12, backgroundColor: Colors.gray20, borderRadius: 8 }} />
          <View style={{ flex: 1, height: 24, backgroundColor: Colors.gray20, borderRadius: 8 }} />
        </View>
      ))}
    </View>
  )
}

export default ListItemLoading
