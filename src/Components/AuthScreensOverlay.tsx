import { Image, View, Text, StyleSheet } from "react-native";
import Screen from "./Base/Screen";
import { hex2rgba } from "../Utils/hex2rgba";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";

interface Props {
  children: React.ReactNode;
}

const AuthScreenOverlay = ({ children }: Props) => {
  return (
    <Screen style={styles.screenContainer}>
      <Image
        resizeMode="contain"
        source={require("../../assets/login.png")}
        style={styles.logo}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.titleText}>Mental Workload Tracker</Text>
        {children}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: hex2rgba(colors.palette5, 0.1),
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
});

export default AuthScreenOverlay;
