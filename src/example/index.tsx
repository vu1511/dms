import { Button, NumericInput, QuantityInput, TextInput } from '@/components'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import RNQuantityInput from 'react-native-numeric-input'
import 'react-native-reanimated'

export const Example = () => {
  const [keyword, setKeyword] = useState('')
  const [value, setValue] = useState<number | null>(null)
  const [qty, setQty] = useState(0)

  console.log({ qty })
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 16, rowGap: 24, paddingTop: 100 }}
    >
      {/* <RNQuantityInput
        valueType="real"
        type="up-down"
        value={qty}
        onChange={(value) => {
          setQty(value)
          console.log('onChangeQty: ', value)
        }}
        validateOnBlur
        step={1.5}
        maxValue={10}
      /> */}

      <NumericInput
        value={value}
        onChangeValue={(value) => {
          setValue(value)
          console.log('onChangeValue: ', value)
        }}
        renderTextInput={({ style, ...props }) => <TextInput {...props} label="Nhập số" />}
      />
      <Button title="reset" onPress={() => setValue(Math.random() * 100)} />

      <QuantityInput
        value={qty}
        minValue={1}
        maxValue={10}
        precision={10}
        onChangeValue={(value) => {
          setQty(value)
          console.log('onChangeQty: ', value)
        }}
      />

      <RNQuantityInput
        rounded
        value={qty}
        type="up-down"
        minValue={1}
        maxValue={10}
        valueType="real"
        onChange={(value) => {
          setQty(value)
          console.log('onChangeQty: ', value)
        }}
      />
    </ScrollView>
  )
}
