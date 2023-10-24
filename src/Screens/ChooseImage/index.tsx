import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import DefaultImage from "../../../assets/defaultIcon.png";

import styles from "./styles";
import Button from "../../components/Button";
import BottomSheet, {
  IBottomSheetRefProps,
} from "../../components/BottomSheet";
import ImagePicker from "../../components/BottomSheet/BottomSheetContents/ImagePicker";
import { useNavigation } from "@react-navigation/native";

const ChooseImage: React.FC = () => {
  const bottomSheetRef = useRef<IBottomSheetRefProps>(null);
  const navigation = useNavigation();

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.scrollTo(-400);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha uma foto para o seu perfil</Text>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={DefaultImage}
        />
        <Text style={styles.description}>
          Está foto será utilizada em seu perfil, e durante a troca de mensagens
          para identificar cada usuário
        </Text>
        <Button
          onPress={openBottomSheet}
          title="Escolher"
          titleColor="white"
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#4A86F7",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginTop: 40,
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.goWithoutImageText}>
            Continuar sem escolher uma foto
          </Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        fullDestination={-400}
        children={<ImagePicker />}
      />
    </SafeAreaView>
  );
};

export default ChooseImage;
