import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const HomeIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 18V15" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M10.07 2.82L3.14002 8.37C2.36002 8.99 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
