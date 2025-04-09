import { produce } from 'immer'
import { unstable_serialize } from 'swr'

export type SwrData<T = any, U = {}> = (U & { data: T[] })[]

export const getSwrInfiniteKey = (params: Object) => {
  return `$inf$${unstable_serialize(params)}`
}

export const getSwrInfiniteIndex = <T>(
  swrData: SwrData<T> | undefined,
  compareCallbackfn: (data: T) => boolean
): { index: number; childIndex: number } | null => {
  if (!swrData?.[0]?.data?.length) return null

  for (let i = 0; i < swrData.length; i++) {
    for (let j = 0; j < swrData[i].data.length; j++) {
      if (compareCallbackfn(swrData[i].data[j])) {
        return { index: i, childIndex: j }
      }
    }
  }

  return null
}

export const updateSwrInfiniteItem = <T, U>(
  swrData: SwrData<T, U> | undefined,
  updateValue: Partial<T>,
  compareCallbackfn: (data: T) => boolean
): SwrData<T, U> | undefined => {
  if (!swrData) {
    return swrData
  }

  return produce(swrData, (draft) => {
    const indexData = getSwrInfiniteIndex(swrData, compareCallbackfn)
    if (!indexData) return

    const list = draft[indexData.index].data
    list[indexData.childIndex] = { ...list[indexData.childIndex], ...updateValue }
  })
}

export const deleteSwrInfiniteItem = <T, U>(
  swrData: SwrData<T, U> | undefined,
  compareCallbackfn: (data: T) => boolean
): SwrData<T, U> | undefined => {
  if (!swrData) {
    return swrData
  }

  return produce(swrData, (draft) => {
    const indexData = getSwrInfiniteIndex(swrData, compareCallbackfn)
    if (indexData) {
      draft[indexData.index].data.splice(indexData.childIndex, 1)
    }
  })
}
