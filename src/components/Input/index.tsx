import React, { useEffect, useRef } from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

interface IInput {
  placeholder: string;
  onChange: (value: string) => void;
  marginTop?: number;
  marginBottom?: number;
}

const Input: React.FC<IInput> = ({
  placeholder,
  onChange,
  marginTop,
  marginBottom,
}) => {
  return (
    <View style={{ marginTop, marginBottom }}>
      <TextInput
        onChangeText={onChange}
        placeholder={placeholder}
        style={styles.textInput}
      />
    </View>
  );
};

export default Input;
