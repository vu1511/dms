import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const LocationFillIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C15.375 22 21 15.7981 21 10.8889C21 5.97969 16.9706 2 12 2C7.02944 2 3 5.97969 3 10.8889C3 15.7981 8.625 22 12 22ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
        fill={fill}
      />
    </Svg>
  )
}
