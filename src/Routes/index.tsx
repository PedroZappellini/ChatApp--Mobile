import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../Screens/SignIn";
import Chat from "../Screens/Chat";
import ChooseImage from "../Screens/ChooseImage";

const Routes: React.FC = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      initialRouteName="ChooseImage"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="ChooseImage" component={ChooseImage} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Chat" component={Chat} />
    </Navigator>
  );
};

export default Routes;
