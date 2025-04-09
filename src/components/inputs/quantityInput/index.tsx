import { BaseStyles, Typography } from '@/theme'
import { isNumber } from '@/utils'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { NumericInput, NumericInputProps } from '../numericInput'

export type QuantityInputProps = Omit<NumericInputProps, 'onChangeValue' | 'value'> & {
  step?: number
  value: number
  onChangeValue(value: number): void
  /*
    TODO:
    value is required and initial value is not nullable
*/
}

const QuantityInput = ({
  onChangeValue,
  value,
  minValue = 1,
  maxValue = 10000,
  step = 1,
  ...rest
}: QuantityInputProps) => {
  const disabledDecreaseBtn = isNumber(minValue) && isNumber(value) && value <= minValue
  const disabledIncreaseBtn = isNumber(maxValue) && isNumber(value) && value >= maxValue

  const increaseValue = () => {
    const nextValue = Math.round((value ?? 0 + step) * 100) / 100

    if (isNumber(maxValue)) {
      if (nextValue <= maxValue) {
        onChangeValue(nextValue)
      } else {
        onChangeValue(maxValue)
      }
    } else {
      onChangeValue(nextValue)
    }
  }

  const decreaseValue = () => {
    const nextValue = Math.round(((value ?? 0) - step) * 100) / 100

    if (isNumber(minValue)) {
      if (nextValue >= minValue) {
        onChangeValue(nextValue)
      } else {
        onChangeValue(minValue)
      }
    } else {
      onChangeValue(nextValue)
    }
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <TouchableOpacity
          disabled={disabledDecreaseBtn}
          hitSlop={{ left: 8, bottom: 8, top: 8 }}
          style={[styles.btn, disabledDecreaseBtn && styles.btnDisabled]}
          onPress={decreaseValue}
        >
          <Svg width={12} height={2} viewBox="0 0 15 2" fill="none">
            <Path
              d="M13.5 2H1.5C0.95 2 0.5 1.55 0.5 1C0.5 0.45 0.95 0 1.5 0H13.5C14.05 0 14.5 0.45 14.5 1C14.5 1.55 14.05 2 13.5 2Z"
              fill="#2962FF"
            />
          </Svg>
        </TouchableOpacity>
        <View style={styles.inputArea}>
          <NumericInput
            value={value}
            style={styles.input}
            minValue={minValue}
            maxValue={maxValue}
            onChangeValue={(value) => {
              if (value !== null) {
                onChangeValue(value)
              }
            }}
            onMinValueReached={onChangeValue}
            onMaxValueReached={onChangeValue}
            onBlur={() => {
              if (value === null) {
                onChangeValue(minValue)
              }
            }}
            {...rest}
          />
        </View>
        <TouchableOpacity
          disabled={disabledIncreaseBtn}
          hitSlop={{ right: 8, bottom: 8, top: 8 }}
          style={[styles.btn, disabledIncreaseBtn && styles.btnDisabled]}
          onPress={increaseValue}
        >
          <Svg width={12} height={11} viewBox="0 0 15 14" fill="none">
            <Path
              d="M13.5 8H8.5V13C8.5 13.55 8.05 14 7.5 14C6.95 14 6.5 13.55 6.5 13V8H1.5C0.95 8 0.5 7.55 0.5 7C0.5 6.45 0.95 6 1.5 6H6.5V1C6.5 0.45 6.95 0 7.5 0C8.05 0 8.5 0.45 8.5 1V6H13.5C14.05 6 14.5 6.45 14.5 7C14.5 7.55 14.05 8 13.5 8Z"
              fill="#2962FF"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default QuantityInput

const styles = StyleSheet.create({
  container: {},
  content: {
    ...BaseStyles.flexRowItemsCenter,
  },
  inputArea: {
    // paddingHorizontal: 8,
    // backgroundColor: 'red'
  },
  input: {
    ...Typography.body16Medium,
    lineHeight: undefined,
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    width: 40,
    paddingHorizontal: 4,
  },
  btn: {
    ...BaseStyles.flexCenter,
    backgroundColor: '#E5EFFF',
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
  btnDisabled: {
    opacity: 0.4,
  },
})
