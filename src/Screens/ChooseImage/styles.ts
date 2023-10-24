import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#5C5C5C",
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    height: "48%",
    borderRadius: 200,
    backgroundColor: "#D3D3D3",
    alignSelf: "center",
    marginTop: 20,
  },
  image: {
    width: "80%",
    height: "50%",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: "normal",
    marginBottom: 40,
  },
  goWithoutImageText: {
    marginTop: 20,
    fontSize: 16,
    color: "#4A86F7",
    fontWeight: "600",
    alignSelf: "center",
  },
});

export default styles;
