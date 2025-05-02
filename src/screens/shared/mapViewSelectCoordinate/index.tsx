import { ArrowLeftIcon, LocationIcon } from '@/assets'
import { BottomAreaView, Button, IconButton } from '@/components'
import { useCurrentLocation } from '@/hooks'
import { RouteProp, Routes } from '@/routes'
import { BaseStyles, Colors } from '@/theme'
import { LngLat } from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import debounce from 'lodash/debounce'
import { useCallback, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import RMapView, { Region } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MarkerIcon } from './marker'
import { styles } from './style'

const MARKER_WIDTH = 30
const MARKER_HEIGHT = 60

const MapViewSelectCoordinate = () => {
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()
  const {
    params: { defaultValues, onChange },
  } = useRoute<RouteProp<Routes.MapViewSelectCoordinate>>()
  const ref = useRef<RMapView>(null)

  const [currentLocation, setCurrentLocation] = useState<LngLat>(
    defaultValues || {
      latitude: 10.7717269,
      longitude: 106.7428548,
    }
  )
  const [coordinate, setCoordinate] = useState<LngLat>(currentLocation)

  useCurrentLocation({
    onSuccess: (value) => {
      setCurrentLocation(value)
      setCoordinate(value)
    },
  })

  const handleChange = ({ latitude, longitude }: Region) => {
    setCoordinate({ latitude, longitude })
  }

  const regionChangeDebounce = useCallback(debounce(handleChange, 500), [])

  const confirmCoordinate = () => {
    if (coordinate?.latitude && coordinate?.latitude) {
      onChange?.(coordinate)
    }
  }

  return (
    <View style={styles.container}>
      <View style={BaseStyles.flex1}>
        <View style={[styles.backButtonArea, { top: top + 12 }]}>
          <IconButton
            size={20}
            color={Colors.gray80}
            icon={ArrowLeftIcon}
            backgroundColor={Colors.white}
            onPress={() => navigation.goBack()}
          />
        </View>
        <RMapView
          ref={ref}
          provider="google"
          showsUserLocation
          showsMyLocationButton
          style={BaseStyles.flex1}
          showsBuildings={false}
          showsTraffic={false}
          showsCompass={false}
          showsScale={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
          showsIndoorLevelPicker={false}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          }}
          onRegionChange={regionChangeDebounce}
        />
        <View
          style={[
            styles.currentLocationIcon,
            {
              top: '50%',
              left: '50%',
              transform: [{ translateY: -MARKER_HEIGHT / 4 }, { translateX: -MARKER_WIDTH / 2 }],
            },
          ]}
        >
          <MarkerIcon width={MARKER_WIDTH} height={MARKER_HEIGHT} />
        </View>
      </View>

      <BottomAreaView style={styles.footer}>
        <View style={styles.resultArea}>
          <LocationIcon size={20} fill={Colors.gray80} />
          <Text style={styles.resultLabel}>
            Lng: {coordinate.latitude.toFixed(8)}, Lat: {coordinate.longitude.toFixed(8)}
          </Text>
        </View>
        <Button title="Xác nhận toạ độ" disabled={!coordinate} onPress={confirmCoordinate} />
      </BottomAreaView>
    </View>
  )
}

export default MapViewSelectCoordinate
