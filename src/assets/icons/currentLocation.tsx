import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Circle, Path } from 'react-native-svg'

export const CurrentLocationIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg stroke="currentColor" fill={fill} strokeWidth="0" viewBox="0 0 24 24" width={size} height={size}>
      <Circle cx="12" cy="12" r="4" />
      <Path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
    </Svg>
  )
}
