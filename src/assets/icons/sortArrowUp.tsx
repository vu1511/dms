import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const SortArrowUpIcon = ({ fill = Colors.gray50, size = 24 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 18H21M12 12H18M12 6H15M3 8.375L4.50518 6.68167C5.30076 5.78664 6.69924 5.78664 7.49482 6.68167L9 8.375M6 6V18"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}
