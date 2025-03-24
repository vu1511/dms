import { useCallback, useState } from 'react'

export type useSelectItemsProps<T = any> = {
  limit?: number
  idKey: keyof T
  defaultValues?: T[]
  onLimitReached?(): void
}

export const useSelectItems = <T = any>({
  limit,
  idKey,
  defaultValues = [],
  onLimitReached,
}: useSelectItemsProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(defaultValues)

  const toggleSelectItem = useCallback((item: T) => {
    setSelectedItems((prevItems) => {
      const index = prevItems.findIndex((i) => i[idKey] === item[idKey])
      if (index !== -1) {
        return [...prevItems.slice(0, index), ...prevItems.slice(index + 1)]
      } else if (limit) {
        if (prevItems.length < limit) {
          return [...prevItems, item]
        } else {
          onLimitReached?.()
        }
      } else {
        return [...prevItems, item]
      }

      return prevItems
    })
  }, [])

  const clearAllItems = useCallback(() => {
    setSelectedItems([])
  }, [])

  const toggleAllItems = useCallback(
    (data: T[]) => {
      if (data?.length) {
        if (data.length === selectedItems.length) {
          clearAllItems()
        } else {
          setSelectedItems(data)
        }
      }
    },
    [selectedItems]
  )

  return {
    selectedItems,
    clearAllItems,
    toggleAllItems,
    toggleSelectItem,
    setSelectedItems,
  }
}
