import { BaseStyles, Colors, Typography } from '@/theme'
import { StyleSheet, Text, View } from 'react-native'

type StatisticalProps = {
  color: string
  icon?: React.ReactElement
  label: string | React.ReactElement
  value: string | number | React.ReactElement
}

export const Statistical = ({ label, value, color, icon }: StatisticalProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.border, { backgroundColor: color }]} />
      <View style={styles.titleArea}>
        {icon}
        {typeof label === 'string' ? (
          <Text numberOfLines={1} style={styles.label}>
            {label}
          </Text>
        ) : (
          label
        )}
      </View>
      {typeof value === 'string' ? (
        <Text numberOfLines={1} style={styles.value}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  border: {
    width: 4,
    top: 8,
    bottom: 8,
    position: 'absolute',
    left: 0,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderColor: Colors.gray30,
    borderWidth: 1,
    rowGap: 4,
  },
  titleArea: {
    flex: 1,
    ...BaseStyles.flexRowItemsCenter,
    columnGap: 4,
  },
  label: {
    ...Typography.body14Normal,
    color: Colors.gray70,
    flexShrink: 1,
  },
  value: {
    ...Typography.body16Medium,
    flexShrink: 1,
  },
})
