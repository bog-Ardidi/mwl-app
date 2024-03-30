import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SwiperChildrenProps {
  children: React.ReactNode;
}

/**
 * Container in the swiper for the tutorial.
 */
const SwiperScreen = ({ children }: SwiperChildrenProps) => {
  return <View style={styles.pageContainer}>{children}</View>;
};

interface RegularTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

/**
 * Regular text in the swiper for the tutorial.
 */
const RegularText = ({ children, style }: RegularTextProps) => {
  return (
    <Text style={[styles.regularText, styles.shadow, style]}>{children}</Text>
  );
};

/**
 * The title for the SwiperScreen for the tutorial.
 */
const SwiperTitle = ({ children }: SwiperChildrenProps) => {
  return <Text style={[styles.title, styles.shadow]}>{children}</Text>;
};

interface SwiperIconProps {
  title: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  color?: string;
}

/**
 * Icons that are displayed as part of the tutorial in the SwiperScreen.
 */
const SwiperIcon = ({
  title,
  size = 100,
  color = colors.palette5,
}: SwiperIconProps) => {
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
