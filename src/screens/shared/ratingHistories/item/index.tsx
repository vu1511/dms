import { Image, StarRating, Tag } from '@/components'
import { useVisible } from '@/hooks'
import { Typography } from '@/theme'
import { RatingCommonData } from '@/types'
import { toImageUrl } from '@/utils'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { styles } from './styles'

type RatingItemProps = RatingCommonData & {
  onPress?: () => void
}

export const RatingItem = ({
  imageUrls,
  ratingContent,
  ratingDate,
  ratingStar,
  ratingTags,
  onPress,
}: RatingItemProps) => {
  const { visible, onOpen } = useVisible()
  const imgCount = imageUrls.length - 1

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.container}>
      <View style={styles.image}>
        <Image width={56} height={56} borderRadius={4} source={toImageUrl(imageUrls?.[0])} />
        {imgCount > 0 && (
          <View style={styles.imgCount}>
            <Text style={styles.imgCountLabel}>{Math.min(imgCount, 9)}+</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.topArea}>
          <StarRating size={14} gap={2} value={ratingStar} />
          {ratingDate ? <Text style={styles.date}>{ratingDate}</Text> : null}
        </View>
        {ratingContent && (
          <Text
            onPress={onOpen}
            disabled={visible}
            style={styles.ratingContent}
            numberOfLines={visible ? undefined : 2}
          >
            {ratingContent}
          </Text>
        )}
        {ratingTags?.length > 0 && (
          <ScrollView
            horizontal
            bounces={false}
            fadingEdgeLength={12}
            contentContainerStyle={styles.tags}
            showsHorizontalScrollIndicator={false}
          >
            {ratingTags.map((item) => (
              <Tag
                isActive
                key={item.tag_id}
                style={styles.tagItem}
                label={item.tag_content}
                labelStyle={Typography.body10Normal}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </TouchableOpacity>
  )
}
