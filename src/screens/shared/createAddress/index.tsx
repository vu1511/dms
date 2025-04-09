import { RouteProp, Routes } from '@/routes'
import { CreateAddressForm } from '@/types'
import { useRoute } from '@react-navigation/native'
import { CreateAddress as CreateAddressCom } from './form'

const CreateAddress = () => {
  const {
    params: { onSubmit, defaultValues },
  } = useRoute<RouteProp<Routes.CreateAddress>>()

  const handleSubmit = (data: CreateAddressForm) => {
    onSubmit?.(data)
  }

  return <CreateAddressCom defaultValues={defaultValues} onSubmit={handleSubmit} />
}

export default CreateAddress
