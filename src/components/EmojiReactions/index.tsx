import React, { useEffect } from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const EmojiReactions: React.FC = () => {
  const translateX = useSharedValue(100);
  const scaleX = useSharedValue(0);

  useEffect(() => {
    scaleX.value = withTiming(1);
    translateX.value = withTiming(0);
  }, []);

  const rEmojiReactionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { scaleX: scaleX.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, rEmojiReactionStyle]}>
      <Text></Text>
    </Animated.View>
  );
};

export default EmojiReactions;
