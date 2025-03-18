import { memo } from 'react'
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller'
import {
  SCROLLABLE_TYPE,
  createBottomSheetScrollableComponent,
  type BottomSheetScrollViewMethods,
} from '@gorhom/bottom-sheet'
import Reanimated from 'react-native-reanimated'
import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types'

const AnimatedScrollView = Reanimated.createAnimatedComponent<KeyboardAwareScrollViewProps>(KeyboardAwareScrollView)
const BottomSheetScrollViewComponent = createBottomSheetScrollableComponent<
  BottomSheetScrollViewMethods,
  BottomSheetScrollViewProps
>(SCROLLABLE_TYPE.SCROLLVIEW, AnimatedScrollView)
const _BottomSheetKeyboardAwareScrollView = memo(BottomSheetScrollViewComponent)

_BottomSheetKeyboardAwareScrollView.displayName = 'BottomSheetKeyboardAwareScrollView'

const BottomSheetKeyboardAwareScrollView = _BottomSheetKeyboardAwareScrollView as (
  props: BottomSheetScrollViewProps & KeyboardAwareScrollViewProps
) => ReturnType<typeof _BottomSheetKeyboardAwareScrollView>

export default BottomSheetKeyboardAwareScrollView
