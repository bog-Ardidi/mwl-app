import { Image, View, Text, StyleSheet } from "react-native";
import Screen from "./Base/Screen";
import { hex2rgba } from "../Utils/hex2rgba";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";
import { StatusBar } from "./Base/Header";

interface Props {
  children: React.ReactNode;
}

// Background color for the auth pages
const bgColor = hex2rgba(colors.palette5, 0.1);

/**
 * Overlay screen for the Login, Register and Forgotten Password pages.
 */
const AuthScreenOverlay = ({ children }: Props) => {
  return (
    <>
      <StatusBar color={bgColor} />
      <Screen>
        <View style={styles.screenContainer}>
          <Image
            resizeMode="contain"
            source={require("../../assets/login.png")}
            style={styles.logo}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.titleText}>Mental Workload Tracker</Text>
            {children}
          </View>
        </View>
      </Screen>
      <View style={styles.bottomNavBar}></View>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: bgColor,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    flex: 2,
  },
  loginContainer: {
    backgroundColor: colors.white,
    flex: 3,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  titleText: {
    textAlign: "center",
    fontSize: fontSize["h3"],
    fontWeight: "500",
    marginVertical: 40,
  },
  bottomNavBar: {
    backgroundColor: colors.white,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 35,
  },
});

export default AuthScreenOverlay;
