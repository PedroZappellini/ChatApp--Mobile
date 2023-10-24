import React, { useCallback, useEffect, useImperativeHandle } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import styles from "./styles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface IBottomSheet {
  children: React.ReactNode;
  fullDestination: number;
}

export interface IBottomSheetRefProps {
  scrollTo: (destination: number) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const BottomSheet = React.forwardRef<IBottomSheetRefProps, IBottomSheet>(
  ({ children, fullDestination }, ref) => {
    const MAX_TRANSLATE_Y = fullDestination;
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value.y = translateY.value;
      })
      .onUpdate((event) => {
        if (event.translationY > -SCREEN_HEIGHT / 2) {
          translateY.value = event.translationY + context.value.y;
        }
      })
      .onEnd(() => {
        if (translateY.value > fullDestination) {
          scrollTo(0);
        } else if (translateY.value < fullDestination) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          rBottomSheetStyle,
          { height: SCREEN_HEIGHT, top: SCREEN_HEIGHT },
        ]}
      >
        <GestureDetector gesture={gesture}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </GestureDetector>
        <View style={styles.contentContainer}>{children}</View>
      </Animated.View>
    );
  }
);
export default BottomSheet;
