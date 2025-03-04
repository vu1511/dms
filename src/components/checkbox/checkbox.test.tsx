import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import { useState } from 'react'
import Checkbox, { CheckboxProps } from './index'

jest.useFakeTimers()

const mockOnchange = jest.fn((val) => val)

describe('checkbox', () => {
  const SIZE = 20
  const ACTIVE_COLOR = 'rgba(22, 161, 253, 1)'
  const INACTIVE_COLOR = 'rgba(0, 0, 0, 1)'

  const toggleCheckbox = () => fireEvent(screen.getByTestId('checkbox-btn'), 'press')

  const delay = (ms = 1000) => waitFor(() => jest.advanceTimersByTime(ms))

  const expectCheckboxVisible = () => {
    expect(screen.getByTestId('checkbox-icon-wrapper')).toHaveAnimatedStyle({ transform: [{ scale: 1 }], opacity: 1 })
    expect(screen.getByTestId('checkbox-area')).toHaveAnimatedStyle({
      borderColor: ACTIVE_COLOR,
      backgroundColor: ACTIVE_COLOR,
    })
  }

  const expectCheckboxInVisible = () => {
    expect(screen.getByTestId('checkbox-icon-wrapper')).toHaveAnimatedStyle({ transform: [{ scale: 0 }], opacity: 0 })
    expect(screen.getByTestId('checkbox-area')).toHaveAnimatedStyle({
      borderColor: INACTIVE_COLOR,
    })
  }

  describe('Controlled component', () => {
    const Render = ({ value = false, ...props }: Partial<CheckboxProps>) => {
      const [visible, setVisible] = useState(value)
      return (
        <Checkbox
          size={SIZE}
          value={visible}
          onChange={(value) => {
            setVisible(value)
            mockOnchange(value)
          }}
          activeColor={ACTIVE_COLOR}
          inActiveColor={INACTIVE_COLOR}
          {...props}
        />
      )
    }

    it('should toggle controlled checkbox', async () => {
      render(<Render />)

      expectCheckboxInVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectCheckboxVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectCheckboxInVisible()
    })

    it('should toggle controlled checkbox with value as true', async () => {
      render(<Render value={true} />)

      expectCheckboxVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectCheckboxInVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectCheckboxVisible()
    })

    it('should not change when disabled', async () => {
      render(<Render disabled />)
      toggleCheckbox()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expect(screen.getByTestId('checkbox-btn')).toHaveAnimatedStyle({ opacity: 0.5 })
      expectCheckboxInVisible()
    })

    it('should not change when readOnly', async () => {
      render(<Render readOnly />)
      toggleCheckbox()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expectCheckboxInVisible()
    })
  })

  describe('Uncontrolled component', () => {
    const Render = (props: Partial<CheckboxProps>) => {
      return (
        <Checkbox
          size={SIZE}
          activeColor={ACTIVE_COLOR}
          inActiveColor={INACTIVE_COLOR}
          onChange={mockOnchange}
          {...props}
        />
      )
    }

    it('should toggle uncontrolled checkbox', async () => {
      render(<Render />)

      expectCheckboxInVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectCheckboxVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectCheckboxInVisible()
    })

    it('should toggle checkbox state with defaultValue as true', async () => {
      render(<Render defaultValue={true} />)

      expectCheckboxVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectCheckboxInVisible()

      toggleCheckbox()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectCheckboxVisible()
    })

    it('should not change when disabled', async () => {
      render(<Render disabled />)
      toggleCheckbox()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expect(screen.getByTestId('checkbox-btn')).toHaveAnimatedStyle({ opacity: 0.5 })
      expectCheckboxInVisible()
    })

    it('should not change when readOnly', async () => {
      render(<Render readOnly />)
      toggleCheckbox()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expectCheckboxInVisible()
    })
  })

  describe('Render by type', () => {
    it('should render as checkbox', async () => {
      render(<Checkbox size={SIZE} type="checkbox" />)
      expect(screen.getByTestId('checkbox-icon')).toBeOnTheScreen()
    })

    it('should render as radio', async () => {
      render(<Checkbox size={SIZE} type="radio" />)
      expect(screen.getByTestId('checkbox-area')).toHaveStyle({ borderRadius: SIZE / 2 })
      expect(screen.getByTestId('checkbox-radio-icon')).toBeOnTheScreen()
    })
  })
})
