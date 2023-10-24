import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "./src/components/Header";
import socket from "./src/Hooks/useSocket";
import MessageInput from "./src/components/MessageInput";
import Routes from "./src/Routes";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App: React.FC = () => {
  const inputRef = useRef({ value: "" });
  const [state, setState] = useState<string[]>([]);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <StatusBar barStyle="dark-content" translucent />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;

export { socket };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  footerContainer: {
    right: 0,
    left: 0,
  },
  keyboard: {
    flex: 1,
  },
});
