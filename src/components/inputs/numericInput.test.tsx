import { render, screen, userEvent } from '@testing-library/react-native'
import { useState } from 'react'
import NumericInput, { NumericInputProps } from './numericInput'

const user = userEvent.setup({
  delay: 50,
})

jest.useFakeTimers()

const mockOnchangeValue = jest.fn((val: number | null) => val)

const mockOnMaxValueReached = jest.fn((val: number) => val)

const mockOnMinValueReached = jest.fn((val: number) => val)

describe('numericInput', () => {
  const Render = ({ defaultValue = null, ...props }: Partial<NumericInputProps> & { defaultValue?: number | null }) => {
    const [value, setValue] = useState<number | null>(defaultValue)
    return (
      <NumericInput
        value={value}
        onMaxValueReached={mockOnMaxValueReached}
        onMinValueReached={mockOnMinValueReached}
        onChangeValue={(value) => {
          setValue(value)
          mockOnchangeValue(value)
        }}
        {...props}
      />
    )
  }

  describe('UI rendering with props', () => {
    it('should render with prefix and suffix', async () => {
      render(<Render suffix=" $" prefix="money: " />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '12345')
      expect(input.props.value).toBe('money: 12,345 $')
      expect(input.props.selection).toMatchObject({ start: 13 })
    })

    it('should render with separator and delimiter', async () => {
      render(<Render separator="," delimiter="." />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '1234.12')
      expect(input.props.value).toBe('1.234,12')
    })

    it('should render with sign', async () => {
      render(<Render showPositiveSign />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '-', { skipBlur: true })
      expect(input.props.value).toBe('-')

      await user.type(input, '123', { skipBlur: true })
      expect(input.props.value).toBe('-123')

      await user.paste(input, '')
      expect(input.props.value).toBe('')

      await user.type(input, '+', { skipBlur: true })
      expect(input.props.value).toBe('+')

      await user.type(input, '123', { skipBlur: true })
      expect(input.props.value).toBe('+123')

      await user.type(input, '-', { skipBlur: true })
      expect(input.props.value).toBe('-123')
    })

    it('should render with sign before prefix', async () => {
      render(<Render signPosition="beforePrefix" prefix="$" />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '-123', { skipBlur: true })
      expect(input.props.value).toBe('-$123')

      await user.clear(input)

      await user.type(input, '-0.123', { skipBlur: true })
      expect(input.props.value).toBe('-$0.123')
    })

    it('should render with sign after prefix', async () => {
      render(<Render signPosition="afterPrefix" prefix="$" />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '-123', { skipBlur: true })
      expect(input.props.value).toBe('$-123')
    })

    it('should render empty value', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '12')
      await user.type(input, '{Backspace}')
      await user.type(input, '{Backspace}')
      expect(input.props.value).toBe('')
    })

    it('should ignore non-numeric characters while typing', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, 'a ', { skipBlur: true })
      expect(input.props.value).toBe('')

      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('1')

      await user.type(input, '23*()&', { skipBlur: true })
      expect(input.props.value).toBe('123')
    })

    it('should render correct UI with props', async () => {
      render(<Render suffix=" $" prefix="money: " separator="," delimiter="." signPosition="beforePrefix" />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '-12345.12dU*(&(*')
      expect(input.props.value).toBe('-money: 12.345,12 $')
      expect(input.props.selection).toMatchObject({ start: 17 })
    })
  })

  describe('should render integer number', () => {
    it('should trigger onMinValueReached', async () => {
      render(<Render minValue={2} />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '3', { skipBlur: true })
      expect(input.props.value).toBe('3')
      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('')
      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('')
      expect(mockOnMinValueReached).toHaveBeenCalledWith(2)
    })

    it('should trigger onMaxValueReached', async () => {
      render(<Render maxValue={2} />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('1')

      await user.type(input, '3', { skipBlur: true })
      expect(input.props.value).toBe('1')
      expect(mockOnMaxValueReached).toHaveBeenCalledWith(2)
    })

    it('should prevent negative value', async () => {
      render(<Render minValue={0} />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '-')
      expect(input.props.value).toBe('')

      await user.type(input, '12')
      await user.type(input, '-')
      expect(input.props.value).toBe('12')
    })

    it('should trigger onChangeValue correctly', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '-', { skipBlur: true })
      expect(input.props.value).toBe('-')
      expect(mockOnchangeValue).toHaveBeenCalledWith(null)

      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('-1')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-1)

      await user.type(input, '2', { skipBlur: true })
      expect(input.props.value).toBe('-12')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-12)

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-1')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-1)

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-')
      expect(mockOnchangeValue).toHaveBeenCalledWith(null)

      expect(mockOnchangeValue).toHaveBeenCalledTimes(5)
    })
  })

  describe('should render decimal number', () => {
    it('should trigger onMinValueReached', async () => {
      render(<Render minValue={9} />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '8.25', { skipBlur: true })
      expect(input.props.value).toBe('')
      expect(mockOnMinValueReached).toHaveBeenCalledWith(9)

      await user.clear(input)
      await user.type(input, '9.12', { skipBlur: true })
      expect(input.props.value).toBe('9.12')
    })

    it('should trigger onMaxValueReached', async () => {
      render(<Render maxValue={10.25} />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '10.', { skipBlur: true })
      expect(input.props.value).toBe('10.')

      await user.type(input, '24', { skipBlur: true })
      expect(input.props.value).toBe('10.24')

      user.clear(input)

      await user.type(input, '10.', { skipBlur: true })
      expect(input.props.value).toBe('10.')

      await user.type(input, '26', { skipBlur: true })
      expect(input.props.value).toBe('10.2')
      expect(mockOnMaxValueReached).toHaveBeenCalledWith(10.25)

      await user.type(input, '5', { skipBlur: true })
      expect(input.props.value).toBe('10.25')
    })

    it('should support both . and , as separator', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '10', { skipBlur: true })
      await user.type(input, '.', { skipBlur: true })
      expect(input.props.value).toBe('10.')
      await user.type(input, '{Backspace}', { skipBlur: true })
      await user.type(input, ',', { skipBlur: true })
      expect(input.props.value).toBe('10.')
    })

    it('should have maximum decimal places by precision', async () => {
      render(<Render precision={5} />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '10', { skipBlur: true })
      await user.type(input, '.', { skipBlur: true })
      expect(input.props.value).toBe('10.')

      await user.type(input, '123456789', { skipBlur: true })
      expect(input.props.value).toBe('10.12345')

      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('10.12345')

      await user.type(input, '123', { skipBlur: true })
      expect(input.props.value).toBe('10.12345')
    })

    it('should ignore non-numeric characters while typing after separator', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '10', { skipBlur: true })
      await user.type(input, '.', { skipBlur: true })
      expect(input.props.value).toBe('10.')

      await user.type(input, 'abcd', { skipBlur: true })
      expect(input.props.value).toBe('10.')

      await user.type(input, '*(_&*#', { skipBlur: true })
      expect(input.props.value).toBe('10.')

      await user.type(input, '25', { skipBlur: true })
      expect(input.props.value).toBe('10.25')
    })

    it('should only have 1 separator', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '10.', { skipBlur: true })
      await user.type(input, '.', { skipBlur: true })
      expect(input.props.value).toBe('10.')

      await user.type(input, '25', { skipBlur: true })
      expect(input.props.value).toBe('10.25')

      await user.type(input, '.', { skipBlur: true })
      expect(input.props.value).toBe('10.25')

      await user.type(input, ',', { skipBlur: true })
      expect(input.props.value).toBe('10.25')
    })

    it('should render negative decimal', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '-', { skipBlur: true })
      expect(input.props.value).toBe('-')

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('-0')

      await user.type(input, '.', { skipBlur: true })
      expect(input.props.value).toBe('-0.')

      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('-0.1')

      await user.type(input, '2', { skipBlur: true })
      expect(input.props.value).toBe('-0.12')

      await user.type(input, '{Backspace}', { skipBlur: true })
      await user.type(input, '{Backspace}', { skipBlur: true })
      await user.type(input, '{Backspace}', { skipBlur: true })
      await user.type(input, '{Backspace}', { skipBlur: true })

      await user.type(input, '10000')
      expect(input.props.value).toBe('-10,000')

      await user.type(input, '.25')
      expect(input.props.value).toBe('-10,000.25')
    })

    it('allows trailing zero in decimals', async () => {
      render(<Render precision={5} />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '0.', { skipBlur: true })
      expect(input.props.value).toBe('0.')

      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('0.1')

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('0.10')

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('0.100')

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('0.1000')

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('0.10000')
    })

    it('should remove trailing zeros in decimals on blur', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '0.1', { skipBlur: true })
      expect(input.props.value).toBe('0.1')

      await user.type(input, '0000', { skipBlur: false })
      expect(input.props.value).toBe('0.1')
    })

    it('should trigger onChangeValue correctly', async () => {
      render(<Render precision={5} />)
      const input = screen.getByTestId('numeric-input')

      await user.type(input, '-', { skipBlur: true })
      expect(input.props.value).toBe('-')
      expect(mockOnchangeValue).toHaveBeenCalledWith(null)

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('-0')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0)

      await user.type(input, '.', { skipBlur: true })
      expect(input.props.value).toBe('-0.')

      await user.type(input, '1', { skipBlur: true })
      expect(input.props.value).toBe('-0.1')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0.1)

      await user.type(input, '2', { skipBlur: true })
      expect(input.props.value).toBe('-0.12')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0.12)

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('-0.120')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0.12)

      await user.type(input, '0', { skipBlur: true })
      expect(input.props.value).toBe('-0.1200')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0.12)

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-0.120')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0.12)

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-0.12')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0.12)

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-0.1')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0.1)

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-0.')

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-0')
      expect(mockOnchangeValue).toHaveBeenCalledWith(-0)

      await user.type(input, '{Backspace}', { skipBlur: true })
      expect(input.props.value).toBe('-')
      expect(mockOnchangeValue).toHaveBeenCalledWith(null)

      expect(mockOnchangeValue).toHaveBeenCalledTimes(11)
    })
  })

  describe('remove non-numeric characters on blur', () => {
    it('should remove separator', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '0.', { skipBlur: false })
      expect(input.props.value).toBe('0')
    })

    it('should remove character `-`', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '-', { skipBlur: false })
      expect(input.props.value).toBe('')
    })

    it('should remove character `+`', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '+', { skipBlur: false })
      expect(input.props.value).toBe('')
    })

    it('should remove trailing zeros in decimals', async () => {
      render(<Render />)
      const input = screen.getByTestId('numeric-input')
      await user.type(input, '0.1000', { skipBlur: false })
      expect(input.props.value).toBe('0.1')
    })
  })
})
