import { System } from '@/core'
import { ToastOptions } from '@/types'
import { isUnknownDataTruethy } from '@/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'

type Fetcher<Params = any, Response = any> = (params: Params) => Promise<Response>

export type UseAsyncOptions<Response = any> = {
  onError?(data: any): void
  onSuccess?(data: Response): void
  showBackdrop?: boolean
  errorMsg?: string
  successMsg?: string
  showErrorMsg?: boolean
  toastOptions?: ToastOptions
}

export const useAsyncV2 = <Params = any, Response = any>(
  fetcher: Fetcher<Params, Response>,
  options?: UseAsyncOptions<Response>
) => {
  const {
    onError,
    onSuccess,
    errorMsg,
    successMsg,
    toastOptions,
    showErrorMsg = true,
    showBackdrop = true,
  } = options || {}

  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      System.closeBackdrop()
    }
  }, [])

  const trigger = useCallback(
    async (params: Params): Promise<{ isSuccess: boolean }> => {
      showBackdrop && System.showBackdrop()
      setLoading(true)

      try {
        const response: any = await fetcher(params)

        if (isUnknownDataTruethy(response?.result?.success || response?.result?.data || response?.success)) {
          onSuccess?.(response?.result?.data || response?.result || response?.data)
          !!successMsg && System.showToast({ type: 'success', message: successMsg, ...toastOptions })
          showBackdrop && System.closeBackdrop()
          return { isSuccess: true }
        } else {
          const errorMessage: string =
            errorMsg || response?.message || response?.result?.message || response?.error?.data?.debug

          onError?.(response)
          showBackdrop && System.closeBackdrop()

          if (errorMessage && errorMessage?.toLowerCase()?.includes('odoo')) {
            Alert.alert('Có lỗi xảy ra', errorMessage, [{ text: 'Quay lại' }])
          } else {
            showErrorMsg &&
              System.showToast({
                type: 'danger',
                message: errorMessage || 'Có lỗi xảy ra, vui lòng thử lại sau',
                ...toastOptions,
              })
          }

          return { isSuccess: false }
        }
      } catch (error) {
        showErrorMsg &&
          System.showToast({
            type: 'danger',
            message: errorMsg || 'Có lỗi xảy ra, vui lòng thử lại sau',
            ...toastOptions,
          })

        return { isSuccess: false }
      } finally {
        setLoading(false)
        showBackdrop && System.closeBackdrop()
      }
    },
    [errorMsg, fetcher, onError, onSuccess, showBackdrop, showErrorMsg, successMsg, toastOptions]
  )

  return useMemo(() => ({ isLoading, trigger }), [isLoading, trigger])
}
