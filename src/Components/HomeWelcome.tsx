import { auth } from "../Config/firebase";
import { Text, View, StyleSheet, Alert } from "react-native";
import Icon from "../Components/Base/Icon";
import { fontSize } from "../Config/typography";
import colors from "../Config/colors";
import { FirebaseSignOut } from "../Controllers/AuthenticationController";
import { useNavigation } from "@react-navigation/native";
import routes from "../Config/routes";

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
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome back,</Text>
        <Text>{auth.currentUser?.email?.split("@")[0]} !</Text>
      </View>

      <View style={styles.iconContainer}>
        <Icon
          name={"plus-circle-outline"}
          size={50}
          onClick={() => navigation.navigate(routes.SUBMIT_SCREEN)}
        />
        <Icon
          name={"cog-outline"}
          size={50}
          onClick={() => navigation.navigate(routes.SETTINGS_SCREEN)}
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
