import { NumericInput, TextInput } from '@/components'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import 'react-native-reanimated'

export const Example = () => {
  const [keyword, setKeyword] = useState('')
  const [value, setValue] = useState<number | null>(null)

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 16, rowGap: 24, paddingTop: 100 }}
    >
      <NumericInput
        precision={5}
        onMinValueReached={(val) => console.log('callback onMinValueReached: ', val)}
        onMaxValueReached={(val) => console.log('callback onMaxValueReached: ', val)}
        renderTextInput={({ style, ...props }) => <TextInput label="Nhập số tiền" {...props} />}
        value={value}
        onChangeValue={(value) => {
          console.log('onChangeValue: ', value)
          setValue(value)
        }}
      />
      <CurrencyInput
        // prefix="$ "
        // suffix=" $"
        // minValue={1.99}
        precision={0}
        showPositiveSign
        renderTextInput={({ style, ...props }) => <TextInput label="Nhập số tiền" {...props} />}
        value={value}
        separator=","
        onChangeValue={(value) => {
          setValue(value)
          console.log('onChangeValue:', value)
        }}
      />
    </ScrollView>
  )
}
