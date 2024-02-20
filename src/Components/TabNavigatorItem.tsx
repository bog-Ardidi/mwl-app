import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../Config/colors";

interface TabItemProps {
  title: string;
  icon: any;
  selected: boolean;
}

const TabItem = ({ title, icon, selected }: TabItemProps) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={selected ? "red" : colors.black100}
        style={styles.icon}
      />
      <Text style={{ color: selected ? "red" : colors.black100 }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    top: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default TabItem;
