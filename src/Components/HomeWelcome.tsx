import { auth } from "../Config/firebase";
import { Text, View, StyleSheet, Alert } from "react-native";
import Icon from "../Components/Base/Icon";
import { fontSize } from "../Config/typography";
import colors from "../Config/colors";
import { FirebaseSignOut } from "../Controllers/AuthenticationController";

const logOut = () => {
  Alert.alert("Logout", "Are you sure you want to Log Out?", [
    {
      text: "Yes",
      onPress: () => {
        FirebaseSignOut();
      },
    },
    {
      text: "No",
    },
  ]);
};

const HomeWelcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome back,</Text>
        <Text>{auth.currentUser?.email?.split("@")[0]} !</Text>
      </View>

      <View style={styles.iconContainer}>
        <Icon
          name={"cog-outline"}
          size={50}
          onClick={() => console.log("Go to settings")}
        />
        <Icon name={"logout"} size={50} onClick={logOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 0,
    paddingTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
  textContainer: {
    padding: 10,
  },
  text: {
    fontSize: fontSize.xl,
    color: colors.black,
  },
});

export default HomeWelcome;
