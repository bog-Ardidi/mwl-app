import React from "react";
import { FirebaseSignOut } from "../Controllers/AuthenticationController";
import Screen from "../Components/Screen";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Screen>
      <Button
        title="Submit workload rating"
        onPress={() => navigation.navigate("Submit")}
      />
      <Button
        title="Go to graph page"
        onPress={() => navigation.navigate("Graph")}
      />
      <Button
        title="Log Out"
        onPress={() => FirebaseSignOut()}
        style={{ backgroundColor: "red" }}
      />
    </Screen>
  );
};

export default HomeScreen;
