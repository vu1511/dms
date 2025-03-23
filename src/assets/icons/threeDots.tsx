import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const ThreeDotsIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        fill={fill}
        d="M7 11.666a2.34 2.34 0 00-2.333 2.333A2.34 2.34 0 007 16.333a2.34 2.34 0 002.333-2.334A2.34 2.34 0 007 11.666zm14 0a2.34 2.34 0 00-2.334 2.333A2.34 2.34 0 0021 16.333a2.34 2.34 0 002.333-2.334A2.34 2.34 0 0021 11.666zm-7 0a2.34 2.34 0 00-2.334 2.333A2.34 2.34 0 0014 16.333a2.34 2.34 0 002.333-2.334A2.34 2.34 0 0014 11.666z"
      />
    </Svg>
  )
}
