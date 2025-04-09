import { useCallback, useMemo, useState } from 'react'

export type useSelectItemsProps<T = any> = {
  limit?: number
  compareId: keyof T | ((data: T) => boolean)
  defaultValues?: T[]
  onLimitReached?(): void
}

export const useSelectItems = <T = any>({
  limit,
  compareId,
  defaultValues = [],
  onLimitReached,
}: useSelectItemsProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(defaultValues)

  const toggleSelectItem = useCallback(
    (item: T) => {
      setSelectedItems((prevItems) => {
        const index = prevItems.findIndex((i) => {
          if (typeof compareId === 'function') {
            return compareId(item)
          }
          return i[compareId] === item[compareId]
        })
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
    },
    [compareId, limit, onLimitReached]
  )

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
    [clearAllItems, selectedItems.length]
  )

  return useMemo(
    () => ({
      selectedItems,
      clearAllItems,
      toggleAllItems,
      toggleSelectItem,
      setSelectedItems,
    }),
    [selectedItems, clearAllItems, toggleAllItems, toggleSelectItem, setSelectedItems]
  )
}
