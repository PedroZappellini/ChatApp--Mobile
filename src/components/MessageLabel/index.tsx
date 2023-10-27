import React, { useRef, useImperativeHandle, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import { useAuth } from "../../contexts/auth";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import EmojiReactions from "../EmojiReactions";
import OptionsReactions from "../OptionsReactions";

interface IMessageLabel {
  message: string;
  sendedBy: string;
  onAnswerPress: () => void;
}

export interface IMessageLabelRefProps {}

const MessageLabel = React.forwardRef<IMessageLabelRefProps, IMessageLabel>(
  ({ message, sendedBy, onAnswerPress }, ref) => {
    const { userName } = useAuth();
    const translateX = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const [reactions, setReactions] = useState(false);

    const gesture = Gesture.Pan()
      .onStart((e) => {
        context.value.y = translateX.value;
      })
      .onUpdate((e) => {
        translateX.value = e.translationX + context.value.y;
      })
      .onEnd(() => {
        translateX.value = withTiming(0);
      });

    const rMessageLabelStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    return (
      <>
        {reactions && <EmojiReactions />}
        <GestureDetector gesture={gesture}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onLongPress={() => setReactions(true)}
            onPress={() => setReactions(false)}
          >
            <Animated.View
              style={[
                styles.content,
                rMessageLabelStyle,
                {
                  backgroundColor:
                    sendedBy === userName.id ? "#4A86F7" : "white",
                  alignSelf:
                    sendedBy === userName.id ? "flex-end" : "flex-start",
                },
              ]}
            >
              <Text
                style={{
                  color: sendedBy === userName.id ? "white" : "black",
                  fontSize: 16,
                }}
              >
                {message}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </GestureDetector>
        {reactions && <OptionsReactions onAnswerPress={onAnswerPress} />}
      </>
    );
  }
);

export default MessageLabel;
