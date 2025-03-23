import { Colors } from '@/theme'
import { IconProps } from '@/types'
import { Path, Svg } from 'react-native-svg'

export const CategoryIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6C3 3.79086 4.79086 2 7 2H17C19.2091 2 21 3.79086 21 6V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V6Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path d="M17 7L7 7" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 12L7 12" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 17L7 17" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}
