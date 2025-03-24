import { System } from '@/core'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export type UsePreventGoBackProps = {
  title?: string
  desc?: string
  hasUnsavedChanges?: boolean
  onConfirm?: () => void
}

export const usePreventGoBack = (props?: UsePreventGoBackProps) => {
  const navigation = useNavigation()

  const {
    title = 'Bạn có muốn thoát?',
    desc = 'Nếu rời khỏi, dữ liệu của bạn sẽ không được lưu',
    hasUnsavedChanges = true,
    onConfirm,
  } = props || {}

  useEffect(() => {
    navigation.setOptions({ gestureEnabled: !hasUnsavedChanges })
  }, [hasUnsavedChanges, navigation])

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) return

        e.preventDefault()
        System.showPopup({
          message: title,
          description: desc,
          confirmBtnText: 'Ở lại',
          cancelBtnText: 'Rời khỏi',
          onConfirm: () => {
            onConfirm?.()
          },
          onCancel: () => navigation.dispatch(e.data.action),
        })
      }),
    [navigation, hasUnsavedChanges]
  )
}
