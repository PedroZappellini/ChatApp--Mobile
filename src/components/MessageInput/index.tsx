import React, { useImperativeHandle, useRef } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

interface IMessageInput {
  onChange: (value: string) => void;
  onPress: () => void;
}

export interface IMessageInputRefProps {
  openKeyboard: () => void;
  clearText: () => void;
}

const MessageInput = React.forwardRef<IMessageInputRefProps, IMessageInput>(
  ({ onChange, onPress }, ref) => {
    const inputRef = useRef<TextInput>(null);

    const clearText = () => {
      inputRef.current?.clear();
    };

    const openKeyboard = () => {
      inputRef.current?.focus();
    };

    useImperativeHandle(ref, () => ({ openKeyboard, clearText }), [
      openKeyboard,
      clearText,
    ]);

    return (
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          onChangeText={onChange}
          style={styles.textInput}
          placeholder="Digite algo.."
        />
        <TouchableOpacity onPress={onPress} style={styles.sendButton}>
          <Ionicons name="ios-send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
);

export default MessageInput;
