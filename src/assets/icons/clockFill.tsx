import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const ClockFillIcon = ({ fill = Colors.gray50, size = 24 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7502 31.1666C25.5742 31.1666 31.9168 24.824 31.9168 17C31.9168 9.17595 25.5742 2.83331 17.7502 2.83331C9.92613 2.83331 3.5835 9.17595 3.5835 17C3.5835 24.824 9.92613 31.1666 17.7502 31.1666ZM18.8127 9.91665C18.8127 9.32984 18.337 8.85415 17.7502 8.85415C17.1634 8.85415 16.6877 9.32984 16.6877 9.91665V17C16.6877 17.4573 16.9803 17.8633 17.4142 18.008L21.6642 19.4246C22.2209 19.6102 22.8226 19.3093 23.0081 18.7526C23.1937 18.1959 22.8928 17.5942 22.3362 17.4087L18.8127 16.2342V9.91665Z"
        fill={fill}
      />
    </Svg>
  )
}
