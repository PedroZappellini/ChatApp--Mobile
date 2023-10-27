import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import socket from "./src/Hooks/useSocket";
import Routes from "./src/Routes";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App: React.FC = () => {
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
