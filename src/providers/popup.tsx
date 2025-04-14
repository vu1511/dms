import { Popup as PopupComponent } from '@/components'
import { useCoreSlice } from '@/store'

const Popup = () => {
  const popup = useCoreSlice((state) => state.popup)
  const setPopup = useCoreSlice((state) => state.setPopup)

  const closePopup = () => {
    setPopup({ ...popup, visible: false })
  }

  const clearPopup = () => {
    setPopup({ visible: false })
  }

  return <PopupComponent {...popup} onClose={closePopup} onDismiss={clearPopup} />
}

export default Popup
