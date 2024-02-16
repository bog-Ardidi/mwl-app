import { Alert } from "react-native";
import { FirebaseSignOut } from "../Controllers/AuthenticationController";

const logOut = () => {
  Alert.alert("Logout", "Are you sure you want to Log Out?", [
    {
      text: "No",
    },
    {
      text: "Yes",
      onPress: () => {
        FirebaseSignOut();
      },
    },
  ]);
};

const LogoutComponent = () => {
  logOut();

  return null;
};

export default LogoutComponent;
