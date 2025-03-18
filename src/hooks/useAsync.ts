import { System } from '@/core'
import { useUserSlice } from '@/store'
import { AsyncHandler, HTTPConfig, HTTPResponse, HTTPResultResponse } from '@/types'
import { isUnknownDataTruethy } from '@/utils'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

interface Res {
  asyncHandler: <T>(params: AsyncHandler<T>) => Promise<void>
  isLoading: boolean
}

export const useAsync = (externalConfig?: HTTPConfig): Res => {
  const token = useUserSlice((state) => state.token)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      System.closeBackdrop()
    }
  }, [])

  const asyncHandler = async <T>(params: AsyncHandler<T>) => {
    const { fetcher, onSuccess, onError, config } = params
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
    } = { ...externalConfig, ...config }

    try {
      showBackdrop && System.showBackdrop()
      shouldSetLoadingState && setLoading(true)
      const res = await fetcher

      const message: string =
        errorMsg ||
        (res as any)?.message ||
        (res as HTTPResponse<T>)?.result?.message ||
        (res as any)?.error?.data?.debug

      if (
        isUnknownDataTruethy(
          (res as HTTPResponse<T>)?.result?.success || (res as HTTPResponse<T>)?.result?.data || (res as any)?.success
        )
      ) {
        await onSuccess?.(
          (res as HTTPResponse<T>)?.result?.data || (res as HTTPResultResponse<T>)?.result || (res as any)?.data
        )
        showSuccessMsg &&
          System.showToast({
            type: 'success',
            message: successMsg || 'Thành công',
            ...toastProps,
          })

        shouldSetLoadingState && setLoading(false)
        showBackdrop && System.closeBackdrop()
      } else {
        await onError?.(res)
        shouldSetLoadingState && setLoading(false)
        showBackdrop && System.closeBackdrop()

        if (message && message?.toLowerCase()?.includes('odoo')) {
          Alert.alert('Có lỗi xảy ra', message, [{ text: 'Quay lại' }])
        } else {
          showErrorMsg &&
            System.showToast({
              type: 'danger',
              message: message || 'Có lỗi xảy ra, vui lòng thử lại sau',
              ...toastProps,
            })
        }
      }
    } catch (error) {
      showErrorMsg &&
        System.showToast({
          type: 'danger',
          message: errorMsg || 'Có lỗi xảy ra, vui lòng thử lại sau',
          ...toastProps,
        })
      showBackdrop && System.closeBackdrop()
      shouldSetLoadingState && setLoading(false)
      onError?.(undefined)
    }
  }

  return { asyncHandler, isLoading }
}
