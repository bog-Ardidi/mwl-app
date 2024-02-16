import { View, Text, StyleSheet } from "react-native";
import colors from "../../Config/colors";

interface DividerProps {
  text: string;
}

export const Divider = ({ text }: DividerProps) => (
  <View style={styles.container}>
    <View style={styles.border} />
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
    <View style={styles.border} />
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
