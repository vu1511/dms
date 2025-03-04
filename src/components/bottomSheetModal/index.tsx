import { VisibleAction } from '@/types'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
  BottomSheetModal as RNBottomSheetModal,
  BottomSheetModalProps as RNBottomSheetModalProps,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { BackHandler, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './style'

export type BottomSheetModalProps = Omit<Partial<RNBottomSheetModalProps>, 'children'> & {
  onShow?: () => void
  showBottomSpacing?: boolean
  children:
    | React.ReactNode
    | (({ visible }: { visible: boolean }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>)
    | React.ReactNode[]
  dynamicSizingWithBottomSheetView?: boolean
}

const BottomSheetModal = forwardRef<VisibleAction, BottomSheetModalProps>(
  (
    {
      onShow,
      children,
      containerStyle,
      bottomInset = 0,
      enableDynamicSizing,
      snapPoints: externalSnapPoints,
      showBottomSpacing = true,
      dynamicSizingWithBottomSheetView = true,
      ...props
    },
    ref
  ) => {
    const { bottom } = useSafeAreaInsets()
    const bottomSheetRef = useRef<RNBottomSheetModal>(null)
    const animationConfigs = useBottomSheetTimingConfigs({ duration: 500 })
    const snapPoints = useMemo(
      () => (enableDynamicSizing ? undefined : externalSnapPoints || ['50%', '90%']),
      [externalSnapPoints, enableDynamicSizing]
    )

    const [index, setIndex] = useState<number>(-1) // -1, 0, 1 (-1 is invisible, otherwise visible)

    const close = useCallback(() => {
      bottomSheetRef.current?.close()
    }, [])

    const open = useCallback(() => {
      bottomSheetRef.current?.present()
    }, [])

    useImperativeHandle(ref, () => ({ close, open }), [ref])

    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          if (index > -1) {
            close()
            return true
          } else {
            return false
          }
        }
        BackHandler.addEventListener('hardwareBackPress', onBackPress)
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }, [bottomSheetRef, index])
    )

    const renderBackdrop = useCallback(
      ({ animatedIndex, style, ...props }: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...props}
            style={[style, styles.zIndex1000, { bottom: bottomInset }]}
            onPress={close}
            disappearsOnIndex={-1}
            pressBehavior="collapse"
            animatedIndex={animatedIndex}
          />
        )
      },
      [bottomInset]
    )

    const handleComponent = useCallback(
      () => (
        <View style={[styles.indicatorWrapper]}>
          <View style={styles.indicator} />
        </View>
      ),
      []
    )

    const handleChange = useCallback(
      (index: number) => {
        setIndex(index)
        if (index > -1) {
          onShow?.()
        }
      },
      [onShow]
    )

    const renderChildren = typeof children === 'function' ? children({ visible: index > -1 }) : children

    return (
      <RNBottomSheetModal
        index={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableOverDrag={false}
        enableDismissOnClose
        style={styles.container}
        bottomInset={bottomInset}
        keyboardBehavior="extend"
        keyboardBlurBehavior="none"
        animationConfigs={animationConfigs}
        enableDynamicSizing={enableDynamicSizing}
        handleComponent={handleComponent}
        backdropComponent={renderBackdrop}
        containerStyle={[containerStyle, styles.zIndex1001]}
        onChange={handleChange}
        {...props}
      >
        {enableDynamicSizing && dynamicSizingWithBottomSheetView ? (
          <BottomSheetView>
            {renderChildren}
            {showBottomSpacing ? <View style={{ height: bottom }} /> : null}
          </BottomSheetView>
        ) : (
          <>
            {renderChildren}
            {showBottomSpacing ? <View style={{ height: bottom }} /> : null}
          </>
        )}
      </RNBottomSheetModal>
    )
  }
)

export default BottomSheetModal
