import { System } from '@/core'
import { Navigation } from '@/types'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Alert } from 'react-native'

export type UsePreventGoBackProps = {
  title?: string
  desc?: string
  hasUnsavedChanges?: boolean
  onConfirm?: () => void
}

export const usePreventGoBack = (props?: UsePreventGoBackProps) => {
  const navigation = useNavigation<Navigation>()

  const {
    title = 'Bạn có muốn thoát?',
    desc = 'Nếu rời khỏi, dữ liệu của bạn sẽ không được lưu',
    hasUnsavedChanges = true,
    onConfirm,
  } = props || {}

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) return

        e.preventDefault()
        System.showPopup({
          message: title,
          description: desc,
          cancelBtnText: 'Ở lại',
          confirmBtnText: 'Rời khỏi',
          onConfirm: () => navigation.dispatch(e.data.action),
        })
        Alert.alert(title, desc, [
          { text: 'Ở lại', onPress: onConfirm, style: 'cancel' },
          { text: 'Rời khỏi', onPress: () => navigation.dispatch(e.data.action) },
        ])
      }),
    [navigation, hasUnsavedChanges]
  )
}
