import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Foundation, Feather } from "@expo/vector-icons";

import * as Picker from "expo-image-picker";

import styles from "./styles";

const ImagePicker: React.FC = () => {
  const [image, setImage] = useState({});

  const pickFromLibrary = async () => {
    let result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    let permission = await Picker.getCameraPermissionsAsync();
    if (permission.granted) {
      let result = await Picker.launchCameraAsync();
      console.log(result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } else {
      await Picker.getCameraPermissionsAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma das opções abaixo</Text>
      <Text style={styles.description}>
        Utilize uma foto de sua biblioteca ou tire uma agora mesmo
      </Text>
      <View style={styles.pickerSeparator}>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={pickFromCamera}
        >
          <Feather name="camera" size={40} color="#5C5C5C" />

          <Text style={styles.pickerText}>Tirar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={pickFromLibrary}
        >
          <Foundation name="photo" size={40} color="#5C5C5C" />

          <Text style={styles.pickerText}>Galeria de fotos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePicker;
