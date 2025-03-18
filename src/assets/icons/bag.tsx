import { Colors } from '@/theme'
import { IconProps } from '@/types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export class BagIcon extends React.Component<IconProps> {
  render() {
    const { size = 24, fill = Colors.gray50 } = this.props

    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
          stroke={fill}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.99995 22H14.9999C19.0199 22 19.7399 20.39 19.9499 18.43L20.6999 12.43C20.9699 9.99 20.2699 8 15.9999 8H7.99995C3.72995 8 3.02995 9.99 3.29995 12.43L4.04995 18.43C4.25995 20.39 4.97995 22 8.99995 22Z"
          stroke={fill}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M15.4955 12H15.5045" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8.49451 12H8.50349" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    )
  }
}
