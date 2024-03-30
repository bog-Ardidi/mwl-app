import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../Config/colors";

interface HeaderProps {
  color: string;
  height: number;
}

/**
 * Base header component. A colored rectangle that sits at the top of the screen.
 * No functionality except aesthetics.
 *
 * @param color - Color
 * @param height - Height from top of the screen
 */
const Header = ({ color, height }: HeaderProps) => {
  const headerWidth = Dimensions.get("window").width * 1;
  const headerHeight = Dimensions.get("window").height * height;

  return (
    <View
      style={[
        styles.headerContainer,
        { height: headerHeight, width: headerWidth, backgroundColor: color },
      ]}
    />
  );
};

/**
 * Base status bar component. Represents the bar that has the hour,
 * battery and notifications on IOS and Android.
 *
 * @param color - color
 */
const StatusBar = ({ color }: any) => {
  return <View style={[styles.statusBar, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
  },
  statusBar: {
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 60,
  },
});

export { Header, StatusBar };
