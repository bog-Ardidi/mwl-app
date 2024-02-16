import React from "react";
import Screen from "../Components/Base/Screen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../Config/firebase";
import { Text } from "react-native";
import Button from "../Components/Base/Button";
import routes from "../Config/routes";
import Loading from "../Components/Base/Loading";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Screen>
      <Text>Welcome back, {auth.currentUser?.email}</Text>
      <Button
        title="Scores"
        onPress={() => navigation.navigate(routes.SCORES_SCREEN)}
      />
    </Screen>
  );
};

export default HomeScreen;
