import { View, Text, StyleSheet } from "react-native";
import colors from "../../Config/colors";

interface DividerProps {
  text?: string;
  style?: any;
  color?: string;
}

export const Divider = ({
  text,
  style,
  color = colors.gray200,
}: DividerProps) => (
  <View style={[styles.container, style]}>
    <View style={[styles.border, { backgroundColor: color }]} />
    {text && (
      <View>
        <Text style={[styles.text, { color: color }]}>{text}</Text>
      </View>
    )}
    <View style={[styles.border, { backgroundColor: color }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  border: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray200,
  },
  text: {
    marginHorizontal: 10,
    textAlign: "center",
    color: colors.gray500,
  },
});
