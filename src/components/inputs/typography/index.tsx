import { forwardRef, useMemo } from 'react'
import { Text, TextProps } from 'react-native'

export type TypographyProps = TextProps & {
  color?: string
  fontSize?: number
  lineHeight?: number
  fontWeight?: '400' | '500' | '600' | '700' | 400 | 500 | 600 | 700
}

const Typography = forwardRef<Text, TypographyProps>(
  ({ color, fontSize = 14, fontWeight = '400', lineHeight, style, ...props }, ref) => {
    const fontFamily = useMemo(() => {
      switch (fontWeight) {
        case '400':
        case 400:
          return 'Inter-Regular'
        case '500':
        case 500:
          return 'Inter-Medium'
        case '600':
        case 600:
          return 'Inter-SemiBold'
        case '700':
        case 700:
          return 'Inter-Bold'
      }
    }, [fontWeight])

    const styles = useMemo(() => {
      return [style, { fontFamily, color, fontSize, lineHeight: lineHeight ?? fontSize + 6 }]
    }, [fontFamily, color, fontSize, lineHeight, style])

    return <Text ref={ref} {...props} style={styles} />
  }
)

export default Typography
