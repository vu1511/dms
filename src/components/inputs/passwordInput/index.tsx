import { EyeCloseIcon, EyeOpenIcon } from '@/assets'
import { forwardRef, useState } from 'react'
import { Pressable, TextInput as RTextInput } from 'react-native'
import TextInput, { TextInputProps } from '../textInput'

export type PasswordInputProps = TextInputProps

const PasswordInput = forwardRef<RTextInput, PasswordInputProps>((attributes, ref) => {
  const [secureText, setSecureText] = useState<boolean>(true)

  return (
    <TextInput
      ref={ref}
      {...attributes}
      secureTextEntry={secureText}
      right={
        <Pressable hitSlop={8} onPress={() => setSecureText(!secureText)}>
          {!secureText ? <EyeOpenIcon /> : <EyeCloseIcon />}
        </Pressable>
      }
    />
  )
})

export default PasswordInput
