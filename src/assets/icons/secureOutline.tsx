import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const SecureOutlineIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.99996 11.9999L10.7528 13.4022C11.1707 13.7365 11.7777 13.6826 12.1301 13.2798L15 9.99993M5.37758 4.94321L10.3754 2.72195C11.4097 2.26228 12.5903 2.26228 13.6245 2.72195L18.6025 4.9344C20.0582 5.58138 21.0137 7.03549 20.9117 8.62522C20.5205 14.723 18.7772 17.4796 14.0646 20.6776C12.8209 21.5215 11.1804 21.5195 9.93576 20.6769C5.23764 17.4962 3.42959 14.7781 3.06996 8.60384C2.97797 7.02455 3.93196 5.5857 5.37758 4.94321Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
