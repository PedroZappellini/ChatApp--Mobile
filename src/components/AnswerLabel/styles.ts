import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#F5F5F5",
    borderLeftWidth: 4,
    borderLeftColor: "#4A86F7",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    width: "90%",
  },
  closeButtonContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4A86F7",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
