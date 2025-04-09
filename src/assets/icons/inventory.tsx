import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const InventoryIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 12 12">
      <Path
        fill={fill}
        d="M6 4.45l4.45-2L6.2.55C6.05.5 5.9.5 5.8.55l-4.25 1.9 4.45 2zM6.5 5.3v6l4.2-1.85c.2-.1.3-.25.3-.45V3.3l-4.5 2zM5.5 5.3L1 3.3V9c0 .2.1.4.3.45l4.2 1.85v-6z"
      />
    </Svg>
  )
}
