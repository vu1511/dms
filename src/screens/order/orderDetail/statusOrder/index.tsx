import { Colors, Typography } from '@/theme'
import { StyleSheet, Text, View } from 'react-native'

export const StatusOrder = ({
  state,
  state_paid,
  state_delivery,
}: {
  state: string
  state_paid: string
  state_delivery: string
}) => {
  const renderLeft = () => {
    const active = state === 'draft'

    return (
      <View style={[styles.cItem]}>
        <View style={[styles.cCircle, active && styles.cActiveCircle]}>
          {active ? <View style={styles.active} /> : null}
        </View>
        <Text style={styles.tLabel}>Đã tiếp nhận</Text>
      </View>
    )
  }

  const renderCenter = () => {
    const color = state !== 'draft' ? '#16A1FD' : '#f0f0f0'

    return (
      <View style={[styles.cItem, { alignItems: 'center' }]}>
        <View style={[styles.cCircle, { backgroundColor: color }]} />
        <Text style={styles.tLabel}>Đang xử lý</Text>
      </View>
    )
  }

  const renderRight = () => {
    const active = (state_paid === 'fully_paid' && state_delivery === 'fully_delivered') || state === 'cancel'

    return (
      <View style={[styles.cItem]}>
        <View style={[styles.cCircle, !active && { backgroundColor: '#f0f0f0' }, active && styles.cActiveCircle]}>
          {active ? <View style={styles.active} /> : null}
        </View>
        <Text style={styles.tLabel}>Hoàn thành</Text>
      </View>
    )
  }

  const renderLine = () => {
    let color_1 = '#16A1FD'
    let color_2 = '#f0f0f0'
    if (state === 'draft') {
      color_1 = '#f0f0f0'
    }
    if ((state_paid === 'fully_paid' && state_delivery === 'fully_delivered') || state === 'cancel') {
      color_2 = '#16A1FD'
    }

    return (
      <View style={styles.cLine}>
        <View style={[styles.line_1, { backgroundColor: color_1 }]} />
        <View style={[styles.line_2, { backgroundColor: color_2 }]} />
      </View>
    )
  }

  return (
    <View style={styles.content}>
      {renderLine()}

      <View style={styles.left}>{renderLeft()}</View>

      <View style={styles.center}>{renderCenter()}</View>

      <View style={styles.right}>{renderRight()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cItem: {
    width: 80,
    alignItems: 'center',
  },
  cCircle: {
    width: 15,
    height: 15,
    backgroundColor: '#16A1FD',
    borderRadius: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cActiveCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  active: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  tLabel: {
    ...Typography.body12Normal,
    color: Colors.gray70,
    textAlign: 'center',
    marginTop: 8,
  },
  cLine: {
    position: 'absolute',
    left: 40,
    right: 40,
    top: 9,
    flexDirection: 'row',
  },
  line_1: {
    height: 2,
    flex: 1,
  },
  line_2: {
    height: 2,
    flex: 1,
  },
})
