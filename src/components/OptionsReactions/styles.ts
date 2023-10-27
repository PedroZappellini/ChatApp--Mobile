import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },
  optionSeparator: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    height: 50,
    borderBottomColor: "#A9A9A9",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C5C5C",
  },
});

export default styles;
