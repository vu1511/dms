import { Container } from '@/components'
import { RouteProp, Routes } from '@/routes'
import { Colors } from '@/theme'
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

  return (
    <Container backgroundColor={Colors.white} title={defaultValues ? 'Cập nhật địa chỉ' : 'Tạo địa chỉ'}>
      <CreateAddressCom defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Container>
  )
}

export default CreateAddress
