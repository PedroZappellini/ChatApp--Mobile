import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import styles from "./styles";

interface IButton extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  titleColor: string;
}

const Button: React.FC<IButton> = ({ title, onPress, titleColor, ...rest }) => {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text style={{ color: titleColor, fontSize: 20 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
