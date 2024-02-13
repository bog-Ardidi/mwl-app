import React from "react";
import { FirebaseSignOut } from "../Controllers/AuthenticationController";
import Screen from "../Components/Base/Screen";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Base/Button";
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
      <Button title="Scores" onPress={() => navigation.navigate("Scores")} />
      <Button
        title="Calendar"
        onPress={() => navigation.navigate("Calendar")}
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
