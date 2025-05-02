import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { G, Path } from 'react-native-svg'

export const CopyIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg stroke={fill} fill={fill} strokeWidth="0" viewBox="0 0 24 24" height={size} width={size}>
      <G clipPath="url(#clip0_17_1173)">
        <Path
          fill={fill}
          d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
        />
      </G>
    </Svg>
  )
}
