import { Screen } from '@/common'
import { isUnknownDataTruethy } from '@/helpers'
import { useCommonSlice, useUserSlice } from '@/store'
import { AsyncHandler, HTTPConfig, HTTPResponse, HTTPResultResponse } from '@/types'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { navigationRef } from '../navigation'

interface Res {
  asyncHandler: <T>(params: AsyncHandler<T>) => Promise<void>
  isLoading: boolean
}

const useAsync = (externalConfig?: HTTPConfig): Res => {
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)
  const token = useUserSlice((state) => state.token)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setBackdropVisible(false)
    }
  }, [])

  const asyncHandler = async <T>(params: AsyncHandler<T>) => {
    const { fetcher, onSuccess, onError, config, onMissingToken } = params
    const method = config?.method || 'POST'
    const {
      errorMsg,
      successMsg = 'Thành công',
      showBackdrop = method === 'POST',
      showErrorMsg = method === 'POST',
      showSuccessMsg = method === 'POST',
      requiredToken = true,
      shouldSetLoadingState = true,
      shouldNavigateToLoginIfNoTokenFound,
      ...toastProps
    } = { ...externalConfig, ...config } || {}

    if (requiredToken && !token) {
      onMissingToken
        ? onMissingToken()
        : shouldNavigateToLoginIfNoTokenFound
        ? navigationRef?.navigate?.(Screen.Login)
        : showMessage({
            message: 'Vui lòng đăng nhập để tiếp tục',
            type: 'warning',
          })
      return
    }

    try {
      showBackdrop && setBackdropVisible(true)
      shouldSetLoadingState && setLoading(true)
      const res = await fetcher

      const message: string =
        errorMsg ||
        (res as any)?.message ||
        (res as HTTPResponse<T>)?.result?.message ||
        (res as any)?.error?.data?.debug

      if (
        isUnknownDataTruethy(
          (res as HTTPResponse<T>)?.result?.success ||
            (res as HTTPResponse<T>)?.result?.data ||
            (res as any)?.success
        )
      ) {
        await onSuccess?.(
          (res as HTTPResponse<T>)?.result?.data ||
            (res as HTTPResultResponse<T>)?.result ||
            (res as any)?.data
        )
        showSuccessMsg &&
          showMessage({
            type: 'success',
            message: successMsg || 'Thành công',
            ...toastProps,
          })

        shouldSetLoadingState && setLoading(false)
        showBackdrop && setBackdropVisible(false)
      } else {
        await onError?.(res)
        shouldSetLoadingState && setLoading(false)
        showBackdrop && setBackdropVisible(false)

        if (message && message?.toLowerCase()?.includes('odoo')) {
          Alert.alert('Có lỗi xảy ra', message, [{ text: 'Quay lại' }])
        } else {
          showErrorMsg &&
            showMessage({
              type: 'danger',
              message: message || 'Có lỗi xảy ra, vui lòng thử lại sau',
              ...toastProps,
            })
        }
      }
    } catch (error) {
      showErrorMsg &&
        showMessage({
          type: 'danger',
          message: errorMsg || 'Có lỗi xảy ra, vui lòng thử lại sau',
          ...toastProps,
        })
      showBackdrop && setBackdropVisible(false)
      shouldSetLoadingState && setLoading(false)
      onError?.(undefined)
    }
  }

  return { asyncHandler, isLoading }
}

export { useAsync }

