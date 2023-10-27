import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const optionTypes = [
  {
    type: "copy",
    label: "Copy",
    icon: <FontAwesome5 name="copy" size={24} color="#5C5C5C" />,
  },
  {
    type: "answer",
    label: "Reply",
    icon: <Entypo name="reply" size={24} color="#5C5C5C" />,
  },
  {
    type: "forward",
    label: "Forward",
    icon: <Entypo name="forward" size={24} color="#5C5C5C" />,
  },
  {
    type: "data",
    label: "Data",
    icon: (
      <Ionicons name="information-circle-outline" size={24} color="#5C5C5C" />
    ),
  },
];

interface IOptionsReactions {
  onAnswerPress: () => void;
}

const OptionsReactions: React.FC<IOptionsReactions> = ({ onAnswerPress }) => {
  const translateX = useSharedValue(150);
  const translateY = useSharedValue(-100);
  const scaleY = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    scaleY.value = withTiming(1);
  }, []);

  const rOptionsReactionsSyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scaleY: scaleY.value },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, rOptionsReactionsSyle]}>
      {optionTypes.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            if (item.type === "answer") {
              onAnswerPress();
            }
          }}
          style={[
            styles.optionSeparator,
            { borderBottomWidth: index !== optionTypes.length - 1 ? 1 : 0 },
          ]}
        >
          <Text style={styles.optionTitle}>{item.label}</Text>
          <View>{item.icon}</View>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default OptionsReactions;
