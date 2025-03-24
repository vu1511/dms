import { fireEvent, render, screen, waitFor } from '@testing-library/react-native'
import { useState } from 'react'
import Switch, { SwitchProps } from './index'

jest.useFakeTimers()

const mockOnchange = jest.fn((val) => val)

describe('Switch', () => {
  const ACTIVE_COLOR = 'rgba(22, 161, 253, 1)'
  const INACTIVE_COLOR = 'rgba(0, 0, 0, 1)'
  const SWITCH_WIDTH = 52
  const THUMB_SIZE = 26

  const toggleSwitch = () => fireEvent(screen.getByTestId('switch-btn'), 'press')

  const delay = (ms = 1000) => waitFor(() => jest.advanceTimersByTime(ms))

  const expectSwitchVisible = () => {
    expect(screen.getByTestId('switch-thumb')).toHaveAnimatedStyle({ transform: [{ translateX: 22 }] })
    expect(screen.getByTestId('switch-area')).toHaveAnimatedStyle({ backgroundColor: ACTIVE_COLOR })
  }

  const expectSwitchInVisible = () => {
    expect(screen.getByTestId('switch-thumb')).toHaveAnimatedStyle({ transform: [{ translateX: 0 }] })
    expect(screen.getByTestId('switch-area')).toHaveAnimatedStyle({ backgroundColor: INACTIVE_COLOR })
  }

  describe('Controlled component', () => {
    const Render = ({ value = false, ...props }: Partial<SwitchProps>) => {
      const [visible, setVisible] = useState(value)
      return (
        <Switch
          value={visible}
          onChange={(value) => {
            setVisible(value)
            mockOnchange(value)
          }}
          switchWidth={SWITCH_WIDTH}
          thumbSize={THUMB_SIZE}
          activeColor={ACTIVE_COLOR}
          inActiveColor={INACTIVE_COLOR}
          {...props}
        />
      )
    }

    it('toggle controlled switch', async () => {
      render(<Render />)

      expectSwitchInVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectSwitchVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectSwitchInVisible()
    })

    it('toggle controlled switch with value = true', async () => {
      render(<Render value />)

      expectSwitchVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectSwitchInVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectSwitchVisible()
    })

    it('disabled case', async () => {
      render(<Render disabled />)
      toggleSwitch()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expect(screen.getByTestId('switch-btn')).toHaveAnimatedStyle({ opacity: 0.5 })
      expectSwitchInVisible()
    })

    it('readOnly case', async () => {
      render(<Render readOnly />)
      toggleSwitch()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expectSwitchInVisible()
    })
  })

  describe('Uncontrolled component', () => {
    const Render = (props: Partial<SwitchProps>) => {
      return (
        <Switch
          switchWidth={SWITCH_WIDTH}
          thumbSize={THUMB_SIZE}
          activeColor={ACTIVE_COLOR}
          inActiveColor={INACTIVE_COLOR}
          onChange={mockOnchange}
          {...props}
        />
      )
    }

    it('toggle uncontrolled switch', async () => {
      render(<Render />)

      expectSwitchInVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectSwitchVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectSwitchInVisible()
    })

    it('toggle uncontrolled switch with defaultValue is true', async () => {
      render(<Render defaultValue />)

      expectSwitchVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalled()
      expect(mockOnchange).toHaveBeenCalledWith(false)
      expectSwitchInVisible()

      toggleSwitch()
      await delay()
      expect(mockOnchange).toHaveBeenCalledTimes(2)
      expect(mockOnchange).toHaveBeenCalledWith(true)
      expectSwitchVisible()
    })

    it('disabled case', async () => {
      render(<Render disabled />)
      toggleSwitch()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expect(screen.getByTestId('switch-btn')).toHaveAnimatedStyle({ opacity: 0.5 })
      expectSwitchInVisible()
    })

    it('readOnly case', async () => {
      render(<Render readOnly />)
      toggleSwitch()
      await delay()
      expect(mockOnchange).not.toHaveBeenCalled()
      expectSwitchInVisible()
    })
  })
})
