import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    backgroundColor: "#D3D3D3",
    width: "70%",
    height: 40,
    borderRadius: 12,
    padding: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A86F7",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
