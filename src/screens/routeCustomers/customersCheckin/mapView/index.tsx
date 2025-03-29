import { ActivityIndicator, Avatar, BottomSheetModal } from '@/components'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { CustomerCheckinMenuOptions, ECustomerCheckinMenuOption, LngLat, SearchCustomerRouteRes } from '@/types'
import { toImageUrl } from '@/utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import RMapView, { Marker, Region, UserLocationChangeEvent } from 'react-native-maps'
import { CustomerItem } from '../customerItem'
import { styles } from './style'

type Action = (data: SearchCustomerRouteRes) => void

type MapViewProps = {
  isLoading?: boolean
  currentLocation: LngLat
  data: SearchCustomerRouteRes[]
  onCheckIn: Action
  onCreateOrder: Action
  onMenuItemPress(action: ECustomerCheckinMenuOption, data: SearchCustomerRouteRes): void
}

const LATITUDE = 10.7717269
const LONGITUDE = 106.7428548
const LATITUDE_DELTA = 0.07
const LONGITUDE_DELTA = 0.07

export const MapView = ({
  data,
  isLoading,
  currentLocation: initialLocation,
  onCheckIn,
  onCreateOrder,
  onMenuItemPress,
}: MapViewProps) => {
  const mapRef = useRef<RMapView>(null)
  const { ref, onOpen, onClose } = useVisibleRef()

  const currentLocation = useRef(initialLocation ?? { LATITUDE, LONGITUDE })
  const [mapVisible, setMapVisible] = useState<boolean>()
  const [customer, setCustomer] = useState<SearchCustomerRouteRes | null>()
  const [tracksChanges, setTracksChanges] = useState(true)
  const lastActionRef = useRef<{ fn: Function; params: any[] } | null>(null)
  const deltaRef = useRef({ latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA })

  const panToLocation = useCallback(
    (data: LngLat) => {
      if (mapVisible && mapRef.current) {
        mapRef.current?.animateToRegion({
          latitude: data.latitude,
          longitude: data.longitude,
          ...deltaRef.current,
        })
      }
    },
    [mapVisible]
  )

  const routes = useMemo(() => {
    const routes = data.filter((item) => !!(item.latitude && item.longitude))
    if (!routes?.length) {
      return []
    }

    const customer = routes[0]

    if (customer) {
      panToLocation({
        latitude: Number(customer.latitude),
        longitude: Number(customer.longitude),
      })
    }

    setCustomer(customer)
    setTracksChanges(true)

    return routes
  }, [data, panToLocation])

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined

    if (tracksChanges) {
      timeout = setTimeout(() => setTracksChanges(false), 5000)
    }

    return () => clearTimeout(timeout)
  }, [tracksChanges])

  const onMapReady = useCallback(() => {
    setMapVisible(true)
  }, [])

  const dismissKeyboard = useCallback(() => {
    Keyboard.isVisible() && Keyboard.dismiss()
  }, [])

  const onUserLocationChange = useCallback(({ nativeEvent: { coordinate } }: UserLocationChangeEvent) => {
    if (coordinate) {
      currentLocation.current = { latitude: coordinate.latitude, longitude: coordinate.longitude }
    }
  }, [])

  const onRegionChangeComplete = useCallback(({ latitudeDelta, longitudeDelta }: Region) => {
    deltaRef.current = { latitudeDelta, longitudeDelta }
  }, [])

  const onDismissBottomSheet = useCallback(() => {
    if (lastActionRef.current?.fn) {
      lastActionRef.current.fn?.(...lastActionRef.current.params)
      lastActionRef.current = null
    }
  }, [])

  const handleCheckIn: Action = useCallback(
    (customer) => {
      onClose()
      lastActionRef.current = { fn: onCheckIn, params: [customer] }
    },
    [onCheckIn, onClose]
  )

  const handleCreateOrder: Action = useCallback(
    (customer) => {
      onClose()
      lastActionRef.current = { fn: onCreateOrder, params: [customer] }
    },
    [onCreateOrder, onClose]
  )

  const RenderMarkers = useMemo(() => {
    return routes.map((item) => {
      const coordinate = { latitude: Number(item.latitude), longitude: Number(item.longitude) }
      return (
        <Marker
          key={item.id}
          style={BaseStyles.flexCenter}
          tracksViewChanges={tracksChanges}
          coordinate={coordinate}
          onPress={() => {
            setCustomer(item)
            panToLocation(coordinate)
            onOpen()
          }}
        >
          <View style={styles.avatar}>
            <Avatar size={24} source={toImageUrl(item.img_url)} label={item.name} />
          </View>
          <Image source={require('./marker-icon.png')} style={styles.markerIcon} resizeMode="contain" />
        </Marker>
      )
    })
  }, [routes, tracksChanges, panToLocation, onOpen])

  const RenderMenuOptions = useMemo(() => {
    return CustomerCheckinMenuOptions.map(({ icon: Icon, label, value }, index) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        style={styles.actionBtn}
        onPress={() => {
          onClose()
          lastActionRef.current = { fn: onMenuItemPress, params: [value, customer] }
        }}
      >
        <Icon size={16} fill="#505F79" />
        <Text style={styles.actionBtnText}>{label}</Text>
      </TouchableOpacity>
    ))
  }, [customer, onClose, onMenuItemPress])

  return (
    <View style={styles.container}>
      <RMapView
        ref={mapRef}
        provider="google"
        style={styles.mapView}
        showsBuildings={false}
        showsTraffic={false}
        showsUserLocation
        showsCompass={false}
        showsScale={false}
        showsMyLocationButton
        showsIndoors={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
        onMapReady={onMapReady}
        onPanDrag={dismissKeyboard}
        onTouchStart={dismissKeyboard}
        onUserLocationChange={onUserLocationChange}
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={{
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          latitude: Number(customer?.latitude) || initialLocation.latitude || LATITUDE,
          longitude: Number(customer?.longitude) || initialLocation.longitude || LONGITUDE,
        }}
      >
        {RenderMarkers}
      </RMapView>

      {isLoading ? (
        <View style={styles.backdrop}>
          <ActivityIndicator size={36} color={Colors.white} style={BaseStyles.flex1} />
        </View>
      ) : null}

      <BottomSheetModal ref={ref} enableDynamicSizing containerStyle={styles.shadow} onDismiss={onDismissBottomSheet}>
        {customer ? (
          <>
            <CustomerItem data={customer} onCheckIn={handleCheckIn} onCreateOrder={handleCreateOrder} />
            <View style={styles.separator}>
              <View style={styles.separatorInner} />
            </View>
            <ScrollView
              horizontal
              fadingEdgeLength={20}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.actionBtnList}
            >
              {RenderMenuOptions}
            </ScrollView>
          </>
        ) : null}
      </BottomSheetModal>
    </View>
  )
}
