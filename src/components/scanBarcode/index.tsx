import { ArrowLeftIcon, BarCodeIcon, Images, QrCodeIcon } from '@/assets'
import { ActivityIndicator, IconButton } from '@/components'
import { Colors } from '@/theme'
import { openAppSettings } from '@/utils'
import { useNavigation } from '@react-navigation/native'
import { BarcodeScanningResult, CameraView, FlashMode, useCameraPermissions } from 'expo-camera'
import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AppState, AppStateStatus, Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { Mask } from './mask'
import { styles } from './styles'

type MaskType = 'barcode' | 'qrcode'

export type ScanBarcodeRef = {
  setIsActive: (active: boolean) => void
}

export type ScanBarcodeProps = {
  header?: ReactNode
  footer?: ReactNode
  onBack?: () => void
  onChange: (code: string) => void | Promise<void>
}

const ScanBarcode = forwardRef<ScanBarcodeRef, ScanBarcodeProps>(({ onChange, onBack, header, footer }, ref) => {
  const navigation = useNavigation()
  const { bottom, top } = useSafeAreaInsets()

  const [isActive, setIsActive] = useState(true)
  const [maskType, setMaskType] = useState<MaskType>('qrcode')
  const [flashMode, setFlashMode] = useState<FlashMode>('off')
  const [permission, onRequestPermission] = useCameraPermissions()
  const [isRequestingPermission, setIsRequestingPermission] = useState(false)
  const isPermissionFetching = useRef(false)
  const hasGrantedRef = useRef(permission?.granted)

  useImperativeHandle(ref, () => ({ setIsActive: setIsActive }), [])

  const requestPermission = useCallback(async () => {
    setIsRequestingPermission(true)
    isPermissionFetching.current = true
    const response = await onRequestPermission()
    hasGrantedRef.current = response?.granted
    setIsRequestingPermission(false)
    isPermissionFetching.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handlerAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && !hasGrantedRef.current && !isPermissionFetching.current) {
        await requestPermission()
      }
    }

    const subscription = AppState.addEventListener('change', handlerAppStateChange)
    requestPermission()

    return () => {
      subscription.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBarCodeScanned = useCallback(
    ({ data }: BarcodeScanningResult) => {
      setIsActive(false)
      onChange?.(data)
    },
    [onChange]
  )

  const toggleFlashMode = useCallback(() => {
    setFlashMode((mode) => (mode === 'off' ? 'on' : 'off'))
  }, [])

  const toggleMaskType = useCallback(() => {
    setMaskType((maskType) => (maskType === 'barcode' ? 'qrcode' : 'barcode'))
  }, [])

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ height: top }} />
        <IconButton
          size={20}
          icon={ArrowLeftIcon}
          color={Colors.gray80}
          backgroundColor={Colors.white}
          onPress={onBack || goBack}
        />
        {header}
      </View>
      {isRequestingPermission || !permission ? (
        <ActivityIndicator style={styles.loading} />
      ) : !permission.granted ? (
        <View style={styles.permissionContainer}>
          <TouchableOpacity onPress={openAppSettings} style={styles.permissionArea}>
            <Image source={Images.search} resizeMode="contain" style={styles.permissionImage} />
            <Text style={styles.permissionLabelBold}>Chưa có quyền truy cập máy ảnh</Text>
            <Text style={styles.permissionLabel}>
              Vui lòng
              <Text style={styles.permissionLabelBoldActive}> bấm vào đây </Text>
              {`\nđể thiết lập cho ứng dụng.`}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <CameraView
            facing="back"
            flash={flashMode}
            style={styles.camera}
            onBarcodeScanned={!isActive ? undefined : handleBarCodeScanned}
          />
          <View style={styles.mask}>
            <Mask height={maskType === 'qrcode' ? 270 : 100} edgeColor={Colors.primary} />
          </View>
          <View style={styles.footer}>
            {footer}
            <View style={styles.footerBtn}>
              <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={toggleMaskType}>
                <View
                  style={[
                    styles.btnActive,
                    maskType === 'qrcode' && { left: 2 },
                    maskType === 'barcode' && { right: 2 },
                  ]}
                />
                <QrCodeIcon size={20} fill={maskType === 'barcode' ? Colors.black : Colors.white} />
                <BarCodeIcon size={24} fill={maskType === 'qrcode' ? Colors.black : Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={toggleFlashMode}>
                {flashMode === 'off' ? (
                  <SvgXml xml='<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1667 4.99967V19.9997C12.1667 20.9163 12.9167 21.6663 13.8334 21.6663H17.1667V33.583C17.1667 34.433 18.2834 34.733 18.7167 33.9997L27.3667 19.1663C28.0167 18.0497 27.2167 16.6663 25.9334 16.6663H22.1667L26.3167 5.58301C26.7334 4.49967 25.9334 3.33301 24.7667 3.33301H13.8334C12.9167 3.33301 12.1667 4.08301 12.1667 4.99967Z" fill="white"/></svg>' />
                ) : (
                  <SvgXml xml='<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.3666 19.1663C28.0166 18.0497 27.2166 16.6663 25.9332 16.6663H22.8166L26.6166 20.4663L27.3666 19.1663ZM27.6332 5.74967C28.1832 4.63301 27.3832 3.33301 26.1332 3.33301H13.8332C12.9166 3.33301 12.1666 4.08301 12.1666 4.99967V6.01634L22.3832 16.233L27.6332 5.74967ZM31.2332 29.7997L7.36655 5.93301C6.71655 5.28301 5.66655 5.28301 5.01655 5.93301C4.36655 6.58301 4.36655 7.63301 5.01655 8.28301L12.1666 15.4497V19.9997C12.1666 20.9163 12.9166 21.6663 13.8332 21.6663H17.1666V33.583C17.1666 34.433 18.2832 34.733 18.7166 33.9997L23.1332 26.4163L28.8666 32.1497C29.5166 32.7997 30.5666 32.7997 31.2166 32.1497C31.8832 31.4997 31.8832 30.4497 31.2332 29.7997Z" fill="white"/></svg>' />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ height: bottom + 8 }} />
          </View>
        </>
      )}
    </View>
  )
})

export default ScanBarcode
