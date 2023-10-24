import React, { useRef, useImperativeHandle } from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import { useAuth } from "../../contexts/auth";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IMessageLabel {
  message: string;
  senderId: string;
}

export interface IMessageLabelRefProps {}

const MessageLabel = React.forwardRef<IMessageLabelRefProps, IMessageLabel>(
  ({ message, senderId }, ref) => {
    const messageLabelRef = useRef();
    const { userName } = useAuth();
    const translateX = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    //   console.log(senderId, "SENDERID", userName.id, "USERNAMEID");

    const gesture = Gesture.Pan()
      .onStart((e) => {
        context.value.y = translateX.value;
      })
      .onUpdate((e) => {
        translateX.value = e.translationX + context.value.y;
      })
      .onEnd(() => {
        translateX.value = withTiming(0);
      })
      .withRef(messageLabelRef);

    useImperativeHandle(ref, () => ({}), []);

    const composed = Gesture.Simultaneous(gesture);

    const rMessageLabelStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.container,
            rMessageLabelStyle,
            {
              backgroundColor: senderId === userName.id ? "#f74ac6" : "white",
              alignSelf: senderId === userName.id ? "flex-end" : "flex-start",
            },
          ]}
        >
          <Text style={{ color: senderId === userName.id ? "white" : "black" }}>
            {message}
          </Text>
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default MessageLabel;
