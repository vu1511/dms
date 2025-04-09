import { useVisible } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { forwardRef, ReactNode, useCallback, useImperativeHandle, useRef } from 'react'
import { useWindowDimensions, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type MovableScreenProps = {
  movableScreen: ReactNode
  movableScreenTitle?: string
  showMovableTabbar?: boolean
  title?: string
  duration?: number
  children: ReactNode
  onClose?: () => void
}

export type MovableScreenRef = {
  toggle: () => void
}

const MovableScreen = forwardRef<MovableScreenRef, MovableScreenProps>(
  (
    {
      children,
      showMovableTabbar = true,
      movableScreen,
      title = '',
      movableScreenTitle = '',
      duration = 250,
      onClose: onDismiss,
    },
    ref
  ) => {
    const { width } = useWindowDimensions()

    const { onClose, onOpen, visible } = useVisible()

    const visibleRef = useRef<boolean>(visible)
    const slideValue = useSharedValue(0)

    const toggleScreen = useCallback(() => {
      if (!visibleRef.current) {
        onOpen?.()
        visibleRef.current = true
        slideValue.value = withTiming(1, { duration })
      } else {
        slideValue.value = withTiming(0, { duration }, () => {
          visibleRef.current = false
          onClose?.()
        })
      }
    }, [duration, onClose, onOpen, slideValue])

    useImperativeHandle(ref, () => ({ toggle: toggleScreen }), [toggleScreen])

    const animatedSlideStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: slideValue.value * -width }],
    }))

    const animatedOpacityStyle = useAnimatedStyle(() => ({
      opacity: 1 - slideValue.value,
    }))

    return (
      <View style={{ flex: 1 }}>
        {visible ? (
          <Animated.View
            style={[
              BaseStyles.absoluteInset,
              { flex: 1, zIndex: 10, backgroundColor: Colors.white },
              animatedSlideStyle,
            ]}
          >
            {/* {showMovableTabbar ? (
              <Header onLeftPress={toggleScreen} title={movableScreenTitle} onRightPress={onDismiss} />
            ) : null} */}
            {movableScreen}
          </Animated.View>
        ) : null}

        <Animated.View style={[{ flex: 1 }, animatedOpacityStyle]}>
          {/* {title ? <Header title={title} right={<IconButton icon={CloseI}/>} onRightPress={onDismiss} /> : null} */}
          {children}
        </Animated.View>
      </View>
    )
  }
)

export default MovableScreen
