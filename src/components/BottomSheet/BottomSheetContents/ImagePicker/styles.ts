import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#5C5C5C",
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: "normal",
    marginBottom: 20,
  },
  pickerSeparator: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerContainer: {
    width: "49%",
    height: 180,
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerText: {
    color: "#5C5C5C",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
  },
});

export default styles;
