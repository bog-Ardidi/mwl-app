import { useNavigation } from "@react-navigation/native";
import Screen from "../Components/Base/Screen";
import { ScrollView, StyleSheet, Text, Alert } from "react-native";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import Button from "../Components/Base/Button";
import routes from "../Config/routes";
import { fontSize } from "../Config/typography";
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

const SettingsScreen = ({ weekView = false }) => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <Text style={styles.text}>Settings</Text>
      <Button
        title="View all feedback"
        onPress={() => navigation.navigate(routes.SCORES_SCREEN)}
      />
      <Button title="Change Password" onPress={() => console.log(":)")} />
      <Icon name={"logout"} size={50} onClick={logOut} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.h2,
    fontWeight: "500",
    textAlign: "center",
    color: colors.black,
  },
});

export default SettingsScreen;
