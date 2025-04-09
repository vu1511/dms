import { Colors, Typography } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 12,
    borderBottomColor: Colors.gray20,
    borderBottomWidth: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    ...Typography.body14SemiBold,
    flex: 1,
    marginRight: 32,
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  sku: {
    ...Typography.body12Medium,
    color: Colors.gray70,
    marginBottom: 4,
  },
  price: {
    ...Typography.body14Medium,
  },
  content: {
    marginTop: 8,
    padding: 8,
    backgroundColor: Colors.background,
    borderRadius: 8,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
  itemText: {
    ...Typography.body12Normal,
    color: Colors.gray60,
    marginBottom: 4,
  },
  itemValueWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
  },
  itemValue: {
    ...Typography.body14Medium,
    fontSize: 13,
    lineHeight: 18,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 8,
    height: 28,
    paddingHorizontal: 8,
    borderWidth: 0,
  },
})
