import { Backdrop as BackdropComponent } from '@/components'
import { useCoreSlice } from '@/store'

const Backdrop = () => {
  const backdropVisible = useCoreSlice((state) => state.backdropVisible)

  return <BackdropComponent isVisible={backdropVisible} />
}

export default Backdrop
