import { Popup as PopupComponent } from '@/components'
import { useCoreSlice } from '@/store'
import { Portal } from 'react-native-portalize'

const Popup = () => {
  const popup = useCoreSlice((state) => state.popup)
  const setPopup = useCoreSlice((state) => state.setPopup)

  const closePopup = () => {
    setPopup({ ...popup, visible: false })
  }

  const clearPopup = () => {
    setPopup({ visible: false })
  }

  return (
    <Portal>
      <PopupComponent {...popup} onClose={closePopup} onDismiss={clearPopup} />
    </Portal>
  )
}

export default Popup
