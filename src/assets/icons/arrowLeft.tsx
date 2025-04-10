import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const ArrowLeftIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg stroke={fill} fill={fill} strokeWidth="0" viewBox="0 0 512 512" height={size} width={size}>
      <Path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
    </Svg>
  )
}
