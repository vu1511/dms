import { Colors } from '@/theme'
import { IconProps } from '@/types'
import { Path, Svg } from 'react-native-svg'

export const TickIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 6.99997L19.5899 5.58997L8.99991 16.17Z"
        fill={fill}
      />
    </Svg>
  )
}
