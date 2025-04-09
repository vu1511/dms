import { ScanBarcode as ScanBarcodeComponent } from '@/components'
import { RouteProp, Routes } from '@/routes'
import { useRoute } from '@react-navigation/native'

const ScanBarcode = () => {
  const { params } = useRoute<RouteProp<Routes.ScanBarcode>>()

  return <ScanBarcodeComponent {...params} />
}

export default ScanBarcode
