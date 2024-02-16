import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./Authentication";
import AuthNavigator from "./Navigators/AuthNavigator";
import Loading from "../Components/Base/Loading";
import MainStackNavigator from "./Navigators/StackNavigator";

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <AuthNavigator />}
      {user == true && <MainStackNavigator />}
    </NavigationContainer>
  );
};
