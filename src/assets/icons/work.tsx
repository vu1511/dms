import { Colors } from '@/theme'
import { IconProps } from '@/types'
import Svg, { Path } from 'react-native-svg'

export const WorkIcon = ({ size = 24, fill = Colors.gray50 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 10V7.5C21 5.29086 19.2091 3.5 17 3.5H7C4.79086 3.5 3 5.29086 3 7.5V18C3 20.2091 4.79086 22 7 22H9M8 2V5M16 9H8M14 13H8M10 17H8M16 2V5M12 22L15.0608 21.1274C15.2249 21.0806 15.3743 20.9928 15.495 20.8721L20.5098 15.8573C21.1634 15.2037 21.1634 14.1439 20.5098 13.4902C19.8561 12.8366 18.7963 12.8366 18.1427 13.4902L13.1279 18.505C13.0072 18.6257 12.9194 18.7751 12.8726 18.9392L12 22Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}
