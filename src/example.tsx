import { useRef, useState } from 'react'
import { Keyboard, TextInput as RNTextInput, ScrollView, View } from 'react-native'
// import { TextInput as RTextInput } from 'react-native-paper'
import 'react-native-reanimated'
import { NumericInput } from '@/components'
// import { Button, DateInput, NumericInput, Popover, Switch, TextInput } from './components'
// import Checkbox from './components/checkbox'
// import { System } from './core'
// import { CalendarIcon } from './assets'
// import { Colors } from './theme'

export const Example = () => {
  const ref = useRef<RNTextInput>(null)
  const [visible, setVisible] = useState(true)

  const toggle = () => {
    setVisible((visible) => !visible)
  }

  const [text, setText] = useState('')
  const [value, setValue] = useState<number>(0)

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 16, rowGap: 12, paddingTop: 100 }}
    >
      {/* <Popover trigger={<Button title="open popover" />}>
        <View style={{ width: 200, height: 200 }}></View>
      </Popover>

      <Button
        title="open popup"
        onPress={() =>
          System.showPopup({
            message: 'Hi',
            onConfirm: () => {},
          })
        }
      />
      <Switch value={visible} onChange={setVisible} />
      <Checkbox size={30} type="radio" value={visible} onChange={setVisible} />
      <Checkbox size={30} type="checkbox" value={visible} onChange={setVisible} />
      <RTextInput
        mode="flat"
        value={text}
        label="Nhập tên khách hàng"
        placeholder="Nhập tên khách hàng"
        onPress={() => console.log('pressed')}
      />
      <TextInput
        ref={ref}
        // inputHeight={72}
        // multiline
        // left={<Checkbox value />}
        // right={<Checkbox value />}
        onPress={() => {
          console.log('pressed')
        }}
        label="Nhập tên khách hàng"
        placeholder="Nhập tên khách hàng"
        // placeholderTextColor={Colors.gray50}
        value={text}
        onChangeText={setText}
        required
      />
      <DateInput label="Nhập số điện thoại" placeholder="Nhập số điện thoại" /> */}
      <NumericInput value={value} onChangeValue={setValue} style={{ borderWidth: 1, padding: 8 }} suffix=" $" />
    </ScrollView>
  )
}
