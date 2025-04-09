import { CloseIcon } from '@/assets'
import { Button, Container, IconButton, TextInput } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { CreateAddressForm, IdAndName } from '@/types'
import { useMemo, useState } from 'react'
import { Keyboard, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AddressPickupItem, AddressPickupType } from './addressPickupItem'

interface CreateAddressProps {
  defaultValues?: CreateAddressForm
  onSubmit?: (data: CreateAddressForm) => void
}

export const CreateAddress = ({ defaultValues, onSubmit }: CreateAddressProps) => {
  const { bottom } = useSafeAreaInsets()

  const [selectedField, setSelectedField] = useState<AddressPickupType | undefined>(
    defaultValues?.state_id ? undefined : 'state'
  )
  const [state, setState] = useState<IdAndName | undefined>(
    defaultValues?.state_id ? { id: defaultValues?.state_id, name: defaultValues.state_name } : undefined
  )
  const [district, setDistrict] = useState<IdAndName | undefined>(
    defaultValues?.district_id ? { id: defaultValues?.district_id, name: defaultValues.district_name } : undefined
  )
  const [ward, setWard] = useState<IdAndName | undefined>(
    defaultValues?.ward_id ? { id: defaultValues?.ward_id, name: defaultValues.ward_name } : undefined
  )
  const [street, setStreet] = useState<string>(defaultValues?.street || '')

  const showStreet = !!(state?.id && ward?.id && district?.id)
  const isValid = showStreet && !!street

  const RenderResult = ({ val, type }: { val: IdAndName; type: AddressPickupType }) => {
    const name = type === 'state' ? 'Tỉnh/Thành Phố' : type === 'district' ? 'Quận/Huyện' : 'Phường/Xã'

    const handleClear = () => {
      setWard(undefined)
      setStreet('')
      if (type === 'state') {
        setDistrict(undefined)
        setState(undefined)
        setSelectedField('state')
      } else if (type === 'district') {
        setSelectedField('district')
        setDistrict(undefined)
      } else {
        setSelectedField('ward')
      }
    }
    return (
      <TextInput
        readOnly
        label={name}
        editable={false}
        value={val?.name}
        pointerEvents="none"
        right={<IconButton color={Colors.gray80} size={18} icon={CloseIcon} onPress={handleClear} />}
      />
    )
  }

  const handleSubmit = () => {
    if (!state?.id || !district?.id || !ward?.id || !street) return

    Keyboard.dismiss()

    onSubmit?.({
      district_id: district.id,
      state_id: state.id,
      street,
      ward_id: ward.id,
      district_name: district.name,
      state_name: state.name,
      ward_name: ward.name,
    })
  }

  const Wrapper = useMemo(() => (showStreet ? KeyboardAwareScrollView : View), [showStreet])

  return (
    <Container
      backgroundColor={Colors.white}
      title={defaultValues ? 'Cập nhật địa chỉ' : 'Tạo địa chỉ'}
      right={<Button disabled={!isValid} type="text" title="Lưu" onPress={handleSubmit} />}
    >
      <Wrapper
        bounces={false}
        scrollEnabled={showStreet}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={BaseStyles.flex1}
        contentContainerStyle={BaseStyles.grow1}
        bottomOffset={64 + Math.max(bottom, 16) + 12}
      >
        <View style={[BaseStyles.rGap16, BaseStyles.p16, !state?.id && !ward?.id && !district?.id && BaseStyles.pb0]}>
          {state?.id ? <RenderResult type="state" val={state} /> : null}
          {district?.id ? <RenderResult type="district" val={district} /> : null}
          {ward?.id ? <RenderResult type="ward" val={ward} /> : null}
          {state?.id && ward?.id && district?.id ? (
            <TextInput
              autoFocus
              value={street}
              returnKeyType="done"
              label="Nhập địa chỉ cụ thể"
              onChangeText={setStreet}
              onSubmitEditing={handleSubmit}
            />
          ) : null}
        </View>

        {selectedField ? (
          <View style={[BaseStyles.px16, BaseStyles.flex1]}>
            {selectedField === 'state' ? (
              <AddressPickupItem
                id={state?.id}
                onChange={(val) => {
                  setState(val)
                  setSelectedField('district')
                  if (district?.id) {
                    setDistrict(undefined)
                  }
                  if (ward?.id) {
                    setWard(undefined)
                  }
                }}
                type="state"
              />
            ) : selectedField === 'district' ? (
              <AddressPickupItem
                id={district?.id}
                stateId={state?.id}
                onChange={(val) => {
                  setDistrict(val)
                  setSelectedField('ward')
                  if (ward?.id) {
                    setWard(undefined)
                  }
                }}
                type="district"
              />
            ) : (
              <AddressPickupItem
                id={ward?.id}
                districtId={district?.id}
                onChange={(val) => {
                  setWard(val)
                  setSelectedField(undefined)
                }}
                type="ward"
              />
            )}
          </View>
        ) : null}
      </Wrapper>
    </Container>
  )
}
