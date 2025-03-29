import { CameraIcon, CloseIcon } from '@/assets'
import { BottomAreaView, Button, Container, IconButton, Switch } from '@/components'
import { useAsyncV2, useCameraPermission, useCurrentLocation } from '@/hooks'
import { RouteProp, Routes } from '@/routes'
import { userAPI } from '@/services'
import { BaseStyles, Colors } from '@/theme'
import { AttendanceCheckinV2Req } from '@/types'
import { toBase64Image } from '@/utils'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Image, Platform, Pressable, Text, View } from 'react-native'
import { openCamera } from 'react-native-image-crop-picker'
import { styles } from './style'

type TypeStore = 'close' | 'open'

const CheckinCustomer = () => {
  const {
    params: { customerId, routeId, onSuccess },
  } = useRoute<RouteProp<Routes.CheckinCustomer>>()

  const { trigger } = useAsyncV2(userAPI.attendanceCheckinV2, {
    successMsg: 'Check In khách hàng thành công',
    onSuccess,
  })

  const [photo, setPhoto] = useState<string | null>(null)
  const [typeStore, setTypeStore] = useState<TypeStore>('open')
  const [isTakingPhoto, setIsTakingPhoto] = useState<boolean>(false)

  const { getCurrentLocation, coordinate, isLoading: isLoadingLocation } = useCurrentLocation()
  const { requestPermission } = useCameraPermission()

  const toggleTypeStore = () => {
    setTypeStore((type) => (type === 'close' ? 'open' : 'close'))
  }

  const selectImage = async () => {
    if (!(await requestPermission())) return

    try {
      setIsTakingPhoto(true)
      const response = await openCamera({
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
        mediaType: 'photo',
      })
      const image = response?.data
      if (image) {
        setPhoto(image)
      }
    } catch (error) {
    } finally {
      setIsTakingPhoto(false)
    }
  }

  const onSubmitHandler = async () => {
    const location = coordinate || (await getCurrentLocation())
    if (!location || !photo) return

    const params: AttendanceCheckinV2Req = {
      image: photo,
      hierarchy_id: routeId,
      customer_id: customerId,
      longitude: location.longitude,
      latitude: location.latitude,
      location_name: 'Hồ Chí Minh',
      os_name: Platform.OS,
    }

    if (typeStore === 'close') {
      params.store_status = 'close'
    }

    trigger(params)
  }

  return (
    <Container title="Check In">
      <View style={styles.container}>
        <View style={styles.typeStore}>
          <Text style={styles.title}>Trạng thái cửa hàng</Text>
          <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
            <Text style={styles.line}>{typeStore === 'close' ? 'Đóng cửa' : 'Mở cửa'}</Text>
            <Switch onChange={toggleTypeStore} value={typeStore === 'open'} />
          </View>
        </View>
        <Pressable disabled={isTakingPhoto} style={styles.imageContainer} onPress={selectImage}>
          <View style={styles.imagePlaceholder}>
            {!photo ? (
              <>
                <View style={styles.imagePlaceholderLine} />
                <CameraIcon size={40} fill={Colors.primary} />
                <Text style={styles.imagePlaceholderText}>
                  {isTakingPhoto ? 'Đang tải...' : 'Thêm hình chụp cửa hàng'}
                </Text>
              </>
            ) : (
              <>
                <Image resizeMode="cover" style={styles.image} source={{ uri: toBase64Image(photo) }} />
                <View style={styles.deleteBtnArea}>
                  <IconButton
                    size={18}
                    icon={CloseIcon}
                    color={Colors.white}
                    style={styles.deleteBtn}
                    onPress={() => setPhoto(null)}
                  />
                </View>
              </>
            )}
          </View>
        </Pressable>
      </View>

      <BottomAreaView>
        <Button
          disabled={!photo}
          loading={isLoadingLocation}
          title={isLoadingLocation ? 'Đang lấy vị trí' : 'Xác nhận'}
          onPress={onSubmitHandler}
        />
      </BottomAreaView>
    </Container>
  )
}

export default CheckinCustomer
