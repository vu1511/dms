import { IconProps } from '@/types'
import { Image } from 'react-native'
import { Images } from '..'

export const SearchEmpty = ({ size = 200 }: Pick<IconProps, 'size'>) => {
  return <Image resizeMode="contain" style={{ width: size, height: size }} source={Images.search} />
}
