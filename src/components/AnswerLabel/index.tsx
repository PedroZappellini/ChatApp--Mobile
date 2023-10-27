import React from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import styles from "./styles";

interface IAnswerLabel {
  name: string;
  message: string;
  onClosePress: () => void;
}

const AnswerLabel: React.FC<IAnswerLabel> = ({
  name,
  message,
  onClosePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text>{name}</Text>
          <Text numberOfLines={1} lineBreakMode="tail">
            {message}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onClosePress}
          style={styles.closeButtonContainer}
        >
          <AntDesign name="close" size={20} color={"#4A86F7"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnswerLabel;
