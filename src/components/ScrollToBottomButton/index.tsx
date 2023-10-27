import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import styles from "./styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IScrollToBottomButton {
  onPress: () => void;
}

const ScrollToBottomButton: React.FC<IScrollToBottomButton> = ({ onPress }) => {
  const opacity = useSharedValue(0);

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  useEffect(() => {
    opacity.value = withTiming(1);

    return () => {
      opacity.value = withTiming(0);
    };
  }, []);

  const rScrollToBottomStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedTouchable
      onPress={onPress}
      style={[styles.container, rScrollToBottomStyle]}
    >
      <View style={styles.buttonContainer}>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#4A86F7" />
      </View>
    </AnimatedTouchable>
  );
};

export default ScrollToBottomButton;
