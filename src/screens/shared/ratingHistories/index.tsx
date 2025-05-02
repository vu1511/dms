import { ArrowDownIcon } from '@/assets'
import { Container, CustomersLoading, List, ListItem, ListItemSeparator, Popover } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { AllRatingTypeOptions, RatingCommonData } from '@/types'
import { ListRenderItem } from '@shopify/flash-list'
import { useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useRatings } from './hook'
import { RatingItem } from './item'
import { styles } from './style'

export const RatingHistories = () => {
  const { data, listRef, isLoading, hasMore, ratingType, getMore, filter, refresh } = useRatings()

  const renderItem: ListRenderItem<RatingCommonData> = useCallback(({ item }) => {
    return <RatingItem {...item} />
  }, [])

  return (
    <Container title="Lịch sử đánh giá" headerShadowVisible={false}>
      <View style={styles.header}>
        <Text style={styles.filterLabel}>Lọc theo</Text>
        <Popover
          offset={4}
          popoverStyle={styles.popover}
          trigger={
            <TouchableOpacity activeOpacity={0.5} style={styles.filterBtn}>
              <Text numberOfLines={1} style={styles.filterValue}>
                {AllRatingTypeOptions.find((i) => i.value === ratingType)?.label ?? ''}
              </Text>
              <ArrowDownIcon size={18} fill={Colors.gray80} />
            </TouchableOpacity>
          }
        >
          {({ closePopover }) =>
            AllRatingTypeOptions.map((item) => (
              <ListItem
                key={item.value}
                title={item.label}
                active={ratingType === item.value}
                onPress={() => {
                  closePopover()
                  filter(item.value)
                }}
              />
            ))
          }
        </Popover>
      </View>
      <List
        data={data}
        ref={listRef}
        hasMore={hasMore}
        provider="FlashList"
        isLoading={isLoading}
        estimatedItemSize={80}
        onRefresh={refresh}
        onEndReached={getMore}
        renderItem={renderItem}
        ItemSeparatorComponent={ListItemSeparator}
        contentContainerStyle={BaseStyles.pt16}
        ListLoadingComponent={<CustomersLoading />}
        emptyTitle="Không có đánh giá nào"
      />
    </Container>
  )
}

export default RatingHistories
