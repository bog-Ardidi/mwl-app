import { View, Text, StyleSheet } from "react-native";
import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SwiperScreen = ({ children }: any) => {
  return <View style={styles.pageContainer}>{children}</View>;
};

const RegularText = ({ children, style }: any) => {
  return (
    <Text style={[styles.regularText, styles.shadow, style]}>{children}</Text>
  );
};

const SwiperTitle = ({ children }: any) => {
  return <Text style={[styles.title, styles.shadow]}>{children}</Text>;
};

const SwiperIcon = ({ title, size = 100, color = colors.palette5 }: any) => {
  return (
    <MaterialCommunityIcons
      size={size / 2}
      style={[{ alignSelf: "center" }, styles.shadow]}
      color={color}
      name={title}
    />
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginBottom: 15,
  },
  title: {
    fontSize: fontSize.xl,
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  regularText: {
    fontSize: fontSize.lg,
    color: colors.tealGreen,
  },
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});

export { SwiperScreen, RegularText, SwiperTitle, SwiperIcon };
