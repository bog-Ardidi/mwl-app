import { useNavigation } from "@react-navigation/native";
import Screen from "../Components/Base/Screen";
import { View, StyleSheet, Text, Alert, Dimensions } from "react-native";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import Button from "../Components/Base/Button";
import routes from "../Config/routes";
import { fontSize } from "../Config/typography";
import { FirebaseSignOut } from "../Controllers/AuthenticationController";
import SettingsListItem from "../Components/SettingsListItem";

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
      <View style={styles.headerContainer}></View>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={50}
          iconColor={colors.white}
          backgroundColor="transparent"
          onClick={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.formContainer}>
        <SettingsListItem
          name="View all feedback"
          iconName={"format-list-bulleted-type"}
          onPress={() => navigation.navigate(routes.SCORES_SCREEN)}
        />
        <SettingsListItem
          name="Change password"
          iconName={"account-key-outline"}
          onPress={() => console.log(":)")}
        />
        <SettingsListItem name="Log out" iconName={"logout"} onPress={logOut} />
      </View>
    </Screen>
  );
};

const headerWidth = Dimensions.get("window").width * 1;
const headerHeight = Dimensions.get("window").height * 0.25;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    height: headerHeight,
    width: headerWidth,
    backgroundColor: colors.palette5,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: fontSize.h3,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  formContainer: {
    backgroundColor: colors.white,
    margin: 20,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
  },
});

export default SettingsScreen;
