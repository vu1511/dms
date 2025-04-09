import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native'

interface MaskProps {
  width?: number
  height?: number
  edgeWidth?: number
  edgeHeight?: number
  edgeColor?: string
  edgeBorderWidth?: number
  backgroundColor?: string
  outerMaskOpacity?: number
  showAnimatedLine?: boolean
  animatedLineColor?: string
  animatedLineHeight?: number
  animatedLineWidth?: string | number
  lineAnimationDuration?: number
  animatedLineOrientation?: 'horizontal' | 'vertical'
  useNativeDriver?: boolean
  edgeRadius?: number
  onLayoutMeasured?: (event: LayoutChangeEvent) => void
}

export const Mask = memo(
  ({
    width = 264,
    height = 264,
    edgeWidth = 80,
    edgeHeight = 80,
    edgeColor = '#FFF',
    edgeBorderWidth = 2,
    backgroundColor = 'rgb(0, 0, 0)',
    outerMaskOpacity = 0.6,
    showAnimatedLine = true,
    animatedLineColor = '#FFF',
    animatedLineHeight = 2,
    animatedLineWidth = '80%',
    lineAnimationDuration = 5000,
    animatedLineOrientation = 'horizontal',
    useNativeDriver = true,
    onLayoutMeasured,
    edgeRadius,
  }: MaskProps) => {
    const [edgeRadiusOffset, setEdgeRadiusOffset] = useState<number>(0)
    const [top, setTop] = useState<Animated.Value>(new Animated.Value(0))
    const [left, setLeft] = useState<Animated.Value>(new Animated.Value(0))
    const [finderLayout, setFinderLayout] = useState<{ width: number; height: number } | null>(null)
    const [lineTravelWindowDistance, setLineTravelWindowDistance] = useState<number>(0)
    const animation = useRef<Animated.CompositeAnimation | null>(null)
    const intervalId = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      setEdgeRadiusOffset(edgeRadius ? -Math.abs(edgeRadius / 3) : 0)
    }, [edgeRadius])

    const _animateLoop = useCallback(() => {
      const isHorizontal = animatedLineOrientation !== 'vertical'
      const propertyToChange = isHorizontal ? 'top' : 'left'
      const startValue = -lineTravelWindowDistance
      const endValue = lineTravelWindowDistance

      animation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(propertyToChange === 'top' ? top : left, {
            toValue: endValue,
            duration: lineAnimationDuration,
            useNativeDriver,
          }),
          Animated.timing(propertyToChange === 'top' ? top : left, {
            toValue: startValue,
            duration: lineAnimationDuration,
            useNativeDriver,
          }),
        ])
      )

      animation.current.start()
    }, [animatedLineOrientation, lineTravelWindowDistance, lineAnimationDuration, useNativeDriver, top, left])

    const _startLineAnimation = useCallback(() => {
      intervalId.current = setInterval(() => {
        if (finderLayout && finderLayout.height > 0) {
          _animateLoop()
          if (intervalId.current) clearInterval(intervalId.current)
        }
      }, 500)
    }, [finderLayout, _animateLoop])

    useEffect(() => {
      _startLineAnimation()
      return () => {
        if (animation.current) {
          animation.current.stop()
        }
      }
    }, [_startLineAnimation])

    const _applyMaskFrameStyle = (): ViewStyle => {
      return { backgroundColor, opacity: outerMaskOpacity, flex: 1 }
    }

    const _renderEdge = (edgePosition: string) => {
      const defaultStyle: ViewStyle = {
        width: edgeWidth,
        height: edgeHeight,
        borderColor: edgeColor,
      }

      const edgeBorderStyle: { [key: string]: ViewStyle } = {
        topRight: {
          borderRightWidth: edgeBorderWidth,
          borderTopWidth: edgeBorderWidth,
          borderTopRightRadius: edgeRadius,
          top: edgeRadiusOffset,
          right: edgeRadiusOffset,
        },
        topLeft: {
          borderLeftWidth: edgeBorderWidth,
          borderTopWidth: edgeBorderWidth,
          borderTopLeftRadius: edgeRadius,
          top: edgeRadiusOffset,
          left: edgeRadiusOffset,
        },
        bottomRight: {
          borderRightWidth: edgeBorderWidth,
          borderBottomWidth: edgeBorderWidth,
          borderBottomRightRadius: edgeRadius,
          bottom: edgeRadiusOffset,
          right: edgeRadiusOffset,
        },
        bottomLeft: {
          borderLeftWidth: edgeBorderWidth,
          borderBottomWidth: edgeBorderWidth,
          borderBottomLeftRadius: edgeRadius,
          bottom: edgeRadiusOffset,
          left: edgeRadiusOffset,
        },
      }

      return <View style={[defaultStyle, styles[`${edgePosition}Edge`], edgeBorderStyle[edgePosition]]} />
    }

    const _calculateLineTravelWindowDistance = ({
      layout,
      isHorizontalOrientation,
    }: {
      layout: { width: number; height: number }
      isHorizontalOrientation: boolean
    }) => {
      return ((isHorizontalOrientation ? layout.height : layout.width) - 10) / 2
    }

    const _onFinderLayoutMeasured = (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent
      const isHorizontal = animatedLineOrientation !== 'vertical'
      const travelDistance = _calculateLineTravelWindowDistance({
        layout,
        isHorizontalOrientation: isHorizontal,
      })

      setTop(new Animated.Value(-travelDistance))
      setLeft(new Animated.Value(-travelDistance))
      setLineTravelWindowDistance(travelDistance)
      setFinderLayout(layout)

      if (onLayoutMeasured) {
        onLayoutMeasured(event)
      }
    }

    const animatedLineStyle: ViewStyle = {
      backgroundColor: animatedLineColor,
      height: animatedLineHeight,
      maxHeight: height,
      width: animatedLineWidth as number,
      maxWidth: width,
      margin: edgeBorderWidth,
    }

    if (finderLayout) {
      if (animatedLineOrientation !== 'vertical') {
        animatedLineStyle.transform = [
          {
            translateY: top,
          },
        ]
      } else {
        animatedLineStyle.transform = [
          {
            translateX: left,
          },
        ]
      }
    }

    return (
      <View style={[styles.container]}>
        <View style={[styles.finder, { width, height }]} onLayout={_onFinderLayoutMeasured}>
          {_renderEdge('topLeft')}
          {_renderEdge('topRight')}
          {_renderEdge('bottomLeft')}
          {_renderEdge('bottomRight')}
          {showAnimatedLine && <Animated.View style={[styles.animatedLine, animatedLineStyle]} />}
        </View>
        <View style={styles.maskOuter}>
          <View style={[styles.maskRow, _applyMaskFrameStyle()]} />
          <View style={[{ height }, styles.maskCenter]}>
            <View style={[_applyMaskFrameStyle()]} />
            <View style={[styles.maskInner, { width, height }]} />
            <View style={[_applyMaskFrameStyle()]} />
          </View>
          <View style={[styles.maskRow, _applyMaskFrameStyle()]} />
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    backgroundColor: 'transparent',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {
    display: 'flex',
    flexDirection: 'row',
  },
  animatedLine: {
    position: 'absolute',
    elevation: 4,
    zIndex: 0,
  },
})
