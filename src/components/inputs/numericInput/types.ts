import { type TextInputProps } from 'react-native'

type SignPosition = 'beforePrefix' | 'afterPrefix'

export type NumericInputProps = Omit<TextInputProps, 'value' | 'defaultValue' | 'onChangeText' | 'onChange'> & {
  /**
   * Callback triggered when the minimum value is reached.
   * @param value - The current value when reaching the minimum.
   */
  onMinValueReached?(value: number): void

  /**
   * Callback triggered when the maximum value is reached.
   * @param value - The current value when reaching the maximum.
   */
  onMaxValueReached?(value: number): void

  /**
   * Callback triggered when the input value changes.
   * @param value - The updated numeric value. Can be `null` if input is cleared.
   * @required
   */
  onChangeValue(value: number | null): void

  /**
   * Custom render function for the text input component.
   * Allows customization of the input field.
   * @param props - The properties to be passed to the custom TextInput.
   */
  renderTextInput?: (props: TextInputProps) => JSX.Element

  /**
   * Character used as a thousands separator.
   * Example: `.` for "1.000" or `,` for "1,000".
   */
  delimiter?: string

  /**
   * Maximum allowed numeric value.
   * If the input exceeds this value, further typing is prevented.
   */
  maxValue?: number

  /**
   * Minimum allowed numeric value.
   * If the input goes below this value, further typing is prevented.
   */
  minValue?: number

  /**
   * Number of decimal places allowed in the input value.
   * - Default is `3` (allows up to three decimal places).
   * - Set to `0` to allow only integers (no decimals).
   * - Any additional decimal places beyond the defined precision will be truncated or rounded based on implementation.
   *
   * @example
   * <NumericInput value={123.45678} precision={2} /> // Displays "123.45"
   * <NumericInput value={99.999} precision={0} />    // Displays "99"
   */
  precision?: number

  /**
   * Character used as the decimal separator.
   * Example: `.` for "10.5" or `,` for "10,5".
   */
  separator?: string

  /**
   * A prefix to display before the numeric value.
   * Example: "$" for "$1000".
   */
  prefix?: string

  /**
   * A suffix to display after the numeric value.
   * Example: "kg" for "100kg".
   */
  suffix?: string

  /**
   * The controlled input value.
   * This value determines what is displayed in the input field.
   * @required
   */
  value: number | null

  /**
   * Whether to display a `+` sign for positive values.
   * Example: "+100" instead of "100".
   */
  showPositiveSign?: boolean

  /**
   * Determines where the positive/negative sign (`+`/`-`) should be placed.
   * - `"beforePrefix"`: Sign appears before the prefix. (e.g., "-$100")
   * - `"afterPrefix"`: Sign appears after the prefix. (e.g., "$-100")
   */
  signPosition?: SignPosition
}

export type FormatNumberOptions = {
  prefix?: string
  suffix?: string
  precision?: number
  separator?: string
  delimiter?: string
  ignoreNegative?: boolean
  currentDecimals?: string
  showPositiveSign?: boolean
  signPosition?: SignPosition
}

export type AddSignPrefixAndSuffixOptions = {
  sign?: '+' | '-' | ''
  prefix?: string
  suffix?: string
  signPosition: 'beforePrefix' | 'afterPrefix'
}
