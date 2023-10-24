import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
  lineContainer: {
    height: 30,
    width: "100%",
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default styles;
