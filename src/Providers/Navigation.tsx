import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./Authentication";

import Loading from "../Components/Base/Loading";
import Login from "../Screens/Auth/Login";
import HomeScreen from "../Screens/HomeScreen";
import SubmitScreen from "../Screens/SubmitScreen";
import GraphScreen from "../Screens/GraphScreen";
import ScoresScreen from "../Screens/ScoresScreen";
import CalendarScreen from "../Screens/CalendarScreen";

const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      {/* <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} /> */}
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Submit" component={SubmitScreen} />
      <MainStack.Screen name="Graph" component={GraphScreen} />
      <MainStack.Screen name="Scores" component={ScoresScreen} />
      <MainStack.Screen name="Calendar" component={CalendarScreen} />
    </MainStack.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
