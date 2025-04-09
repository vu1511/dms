import { BarCodeIcon, CloseIcon, SortArrowUpIcon } from '@/assets'
import {
  BottomAreaView,
  BottomSheetModal,
  Button,
  Container,
  Header,
  IconButton,
  List,
  ListItem,
  ListItemSeparator,
  ListRef,
  ProductItem,
  ProductsLoading,
  SearchInput,
  useQueryInfiniteListV2,
} from '@/components'
import { SwrKey } from '@/constants'
import { useSelectItems, useVisibleRef } from '@/hooks'
import { Navigation, RouteProp, Routes } from '@/routes'
import { productV2API } from '@/services'
import { useUserSlice } from '@/store'
import { Colors } from '@/theme'
import {
  EGetProductType,
  FilterProductReq,
  ProductFilterSortOptions,
  ProductTypeOptions,
  ProductUom,
  ProductVariant,
} from '@/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ListRenderItem } from '@shopify/flash-list'
import { produce } from 'immer'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'

const LIMIT = 20

type Unit = {
  productId: number
  unit: {
    id: number | null
    name: string | null
  }
}

const SelectProductVariant = () => {
  const navigation = useNavigation<Navigation>()
  const { params: routeParams } = useRoute<RouteProp<Routes.SelectProductVariant>>()
  const { unitSelectable, defaultValues, selectLimit, onChange, onChangeMany } = routeParams
  const partner_id = useUserSlice((state) => state.userInfo?.partner_id)

  const listRef = useRef<ListRef<ProductVariant, 'FlashList'>>(null)
  const [units, setUnits] = useState<Unit[]>(() => {
    if (!defaultValues?.length) {
      return []
    }

    return defaultValues.map((i) => ({ productId: i.id, unit: { id: i.unitId, name: i.unitName } }))
  })

  const { ref, onClose, onOpen } = useVisibleRef()

  const initialParams = useMemo<FilterProductReq>(
    () => ({ partner_id, limit: LIMIT, ...routeParams.initialParams }),
    [partner_id, routeParams.initialParams]
  )

  const { selectedItems, toggleSelectItem, setSelectedItems } = useSelectItems({
    limit: selectLimit,
    defaultValues,
    compareId: 'id',
  })

  const extraData = useMemo(() => ({ units, selectedItems }), [units, selectedItems])

  const { data, isLoading, hasMore, params, getMore, filter, refresh } = useQueryInfiniteListV2({
    initialParams,
    key: SwrKey.select_product_variants,
    fetcher: productV2API.getProductVariants,
  })

  const handleFilter = useCallback(
    (params: Partial<FilterProductReq>) => {
      filter(params)
      listRef.current?.scrollToOffset({ offset: 0, animated: false })
    },
    [filter]
  )

  const selectUnit = useCallback(
    (productId: number, unit: ProductUom) => {
      setUnits((prevData) =>
        produce(prevData, (draft) => {
          const nextUnit = { id: unit.uom_id, name: unit.uom_name }
          const index = prevData.findIndex((i) => i.productId === productId)
          if (index === -1) {
            draft.push({ productId, unit: nextUnit })
          } else {
            draft[index].unit = nextUnit
          }
        })
      )
      setSelectedItems((prevData) => {
        const index = prevData.findIndex((i) => i.id === productId)
        if (index === -1) {
          return prevData
        }

        return produce(prevData, (draft) => {
          draft[index].unitId = unit.uom_id
          draft[index].unitName = unit.uom_name
        })
      })
    },
    [setUnits, setSelectedItems]
  )

  const selectProduct = useCallback(
    (product: ProductVariant) => {
      const unit = units.find((i) => i.productId === product.id)
      const nextProduct: ProductVariant = unit
        ? { ...product, unitId: unit.unit?.id, unitName: unit.unit?.name }
        : product

      if (onChange) {
        onChange(nextProduct)
      }

      if (onChangeMany) {
        toggleSelectItem(nextProduct)
      }
    },
    [onChange, onChangeMany, toggleSelectItem, units]
  )

  const handleSubmit = useCallback(() => {
    onChangeMany?.(selectedItems)
  }, [onChangeMany, selectedItems])

  const renderItem: ListRenderItem<ProductVariant> = useCallback(
    ({ item }) => {
      const selectedUnit = units?.find((i) => i.productId === item.id)?.unit
      return (
        <ProductItem
          key={`product-item-${item.id}`}
          id={item.id}
          type={item.type}
          code={item.code}
          price={item.price}
          name={item.name}
          units={item.units}
          imageUrl={item.imageUrl}
          pricelist={item.pricelist}
          categoryName={item.categoryName}
          stockQuantity={item.stockQuantity}
          unitId={selectedUnit?.id ?? item.unitId}
          unitName={selectedUnit?.name ?? item.unitName}
          isActive={selectedItems?.some((i) => i.id === item.id)}
          onChangeUnit={unitSelectable ? selectUnit : undefined}
          onPress={() => selectProduct({ ...item, unitId: item.unitId, unitName: item.unitName })}
        />
      )
    },
    [selectUnit, selectProduct, units, selectedItems, unitSelectable]
  )

  return (
    <Container
      title="Chọn sản phẩm"
      HeaderComponent={
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <SearchInput
              delay={500}
              value={params?.keyword}
              style={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm"
              onChange={(keyword) => handleFilter({ keyword })}
              right={
                <IconButton
                  size={20}
                  icon={BarCodeIcon}
                  color={Colors.gray80}
                  onPress={() => {
                    navigation.navigate(Routes.ScanBarcode, {
                      onChange: (keyword) => {
                        navigation.pop()
                        handleFilter({ keyword })
                      },
                    })
                  }}
                />
              }
            />
            <TouchableOpacity activeOpacity={0.5} style={styles.btnSort} onPress={onOpen}>
              <SortArrowUpIcon size={18} fill={Colors.gray80} />
            </TouchableOpacity>
          </View>
          <View style={styles.tabs}>
            {ProductTypeOptions.map((item) => {
              const active = !params.product_type
                ? item.value === EGetProductType.All
                : params.product_type === item.value
              return (
                <TouchableOpacity
                  key={item.value}
                  disabled={active}
                  activeOpacity={0.5}
                  style={styles.tabItem}
                  onPress={() =>
                    !active &&
                    handleFilter({ product_type: item.value === EGetProductType.All ? undefined : item.value })
                  }
                >
                  <Text style={active ? styles.tabItemTextActive : styles.tabItemText}>{item.label}</Text>
                  {active && <View style={styles.tabItemLine} />}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      }
    >
      <List
        data={data}
        ref={listRef}
        hasMore={hasMore}
        extraData={extraData}
        provider="FlashList"
        estimatedItemSize={84}
        isLoading={isLoading}
        onRefresh={refresh}
        renderItem={renderItem}
        onEndReached={getMore}
        ListLoadingComponent={<ProductsLoading />}
        ItemSeparatorComponent={ListItemSeparator}
        contentContainerStyle={styles.contentContainer}
        emptyTitle={params.keyword ? 'Không tìm thấy sản phẩm nào' : 'Không có sản phẩm nào'}
      />
      {onChangeMany && selectedItems.length > 0 && (
        <BottomAreaView>
          <Button title={`Chọn ${selectedItems.length} sản phẩm`} onPress={handleSubmit} />
        </BottomAreaView>
      )}

      <BottomSheetModal ref={ref} enableDynamicSizing>
        <Header
          title="Sắp xếp theo"
          right={<IconButton size={18} icon={CloseIcon} color={Colors.gray80} onPress={onClose} />}
        />
        {ProductFilterSortOptions.map((item, index) => {
          const isActive = params.sort_by ? params.sort_by === item.value : item.value === null
          return (
            <ListItem
              key={index}
              title={item.label}
              active={isActive}
              onPress={() => {
                if (!isActive) {
                  requestAnimationFrame(() => {
                    handleFilter({ sort_by: !item.value ? undefined : item.value })
                  })
                }
                onClose()
              }}
            />
          )
        })}
      </BottomSheetModal>
    </Container>
  )
}

export default SelectProductVariant
