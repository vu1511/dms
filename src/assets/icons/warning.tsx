import { Colors } from '@/theme'
import { IconProps } from '@/types'
import { Path, Svg } from 'react-native-svg'

export const WarningIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
        fill={fill}
      />
    </Svg>
  )
}
