import { InfoIcon } from '@/assets'
import { Popover } from '@/components'
import { BaseStyles, Colors } from '@/theme'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { SvgXml } from 'react-native-svg'
import { Dot } from '../dot'
import { styles } from './style'

type HeaderProps = {
  onSwitchMode(): void
  isListMode: boolean
  style?: StyleProp<ViewStyle>
  animatedValue: SharedValue<number>
}

export const Header = ({ style, animatedValue, isListMode, onSwitchMode }: HeaderProps) => {
  const modeAnimatedStyle = useAnimatedStyle(() => {
    const width = 38
    return {
      width,
      left: interpolate(animatedValue.value, [0, 1], [2, width + 2], Extrapolation.CLAMP),
      ...styles.switchBtnLine,
    }
  }, [])

  return (
    <View style={[styles.container, style]}>
      <Popover
        offset={4}
        trigger={
          <TouchableOpacity activeOpacity={0.5} style={styles.guideBtn}>
            <InfoIcon size={18} fill={Colors.gray80} />
            <Text style={styles.guideBtnText}>Chú thích</Text>
          </TouchableOpacity>
        }
      >
        <View style={styles.guidePopover}>
          <View style={styles.guideLineItem}>
            <Dot size={12} isCheckin />
            <Text style={styles.guideLineItemText}>Đã ghé thăm</Text>
          </View>
          <View style={styles.guideLineItem}>
            <Dot size={12} isCheckin={false} />
            <Text style={styles.guideLineItemText}>Chưa ghé thăm</Text>
          </View>
        </View>
      </Popover>
      <View style={[BaseStyles.flexRowItemsCenter, BaseStyles.cGap8]}>
        <Text style={styles.switchModeLabel}>Xem theo</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={onSwitchMode} style={styles.switchModeBtn}>
          <Animated.View style={modeAnimatedStyle} />
          <SvgXml
            height={20}
            width={20}
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8H17M7 12H17M7 16H17" stroke="${isListMode ? Colors.gray90 : Colors.gray60}" stroke-width="1.5" stroke-linecap="round"/></svg>`}
          />
          <SvgXml
            height={20}
            width={20}
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4.02478C6.13272 4.23379 3.85997 5.78189 2.72215 6.64222C2.25538 6.99516 2 7.55187 2 8.13706V17.8065C2 18.6599 3.0279 19.1548 3.73627 18.6788C4.94575 17.866 6.58869 16.9431 8 16.7851M8 4.02478C11.3183 3.65335 12.6817 7.5863 16 7.21487M8 4.02478V16.7851M16 7.21487C17.4113 7.0569 19.0542 6.13397 20.2637 5.32119C20.9721 4.84517 22 5.34007 22 6.19353V15.8629C22 16.4481 21.7446 17.0048 21.2778 17.3578C20.14 18.2181 17.8673 19.7662 16 19.9752M16 7.21487V19.9752M8 16.7851C11.3183 16.4137 12.6817 20.3466 16 19.9752" stroke="${!isListMode ? Colors.gray90 : Colors.gray60}" stroke-width="1.5"/></svg>`}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
