import { Platform } from "react-native";
import colors from "./colors";
import { fontSize } from "./typography";

export default {
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS == "android" ? "Roboto" : "Avenir",
  },
  colors,
  fontSize,
};
