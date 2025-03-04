import { PropsWithChildren } from 'react'
import Backdrop from './backdrop'
import Popup from './popup'
import Toast from './toast'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Popup />
      <Backdrop />
      <Toast />
    </>
  )
}
