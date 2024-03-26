import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../Config/colors";

interface HeaderProps {
  color: string;
  height: number;
}

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

const StatusBar = ({ color }: any) => {
  return <View style={[styles.statusBar, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
  },
  statusBar: {
    backgroundColor: "purple",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 60,
  },
});

export { Header, StatusBar };
