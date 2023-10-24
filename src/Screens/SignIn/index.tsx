import React, { useRef } from "react";
import { View, Text, SafeAreaView } from "react-native";

import styles from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { useAuth } from "../../contexts/auth";

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const inputRef = useRef({ firstName: "", lastName: "" });
  const { handleAuth } = useAuth();

  const handleSignIn = () => {
    handleAuth(
      `${inputRef.current.firstName + inputRef.current.lastName}`,
      uuid.v4().toString()
    );
    navigation.navigate("Chat");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Informe o seu nome completo</Text>
          <Text style={styles.description}>
            Seu nome completo é importante para que outros usuários possam saber
            quem é você
          </Text>
        </View>
        <View style={styles.formSeparator}>
          <Input
            marginBottom={40}
            placeholder="Nome"
            onChange={(text) => {
              inputRef.current.firstName = text;
              console.log(inputRef.current.firstName);
            }}
          />
          <Input
            marginBottom={40}
            placeholder="Sobrenome"
            onChange={(text) => {
              inputRef.current.lastName = text;
              console.log(inputRef.current.lastName);
            }}
          />
          <Button
            titleColor="white"
            style={{
              marginTop: 40,
              backgroundColor: "#4A86F7",
              width: "100%",
              height: 50,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Entrar"
            onPress={handleSignIn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
