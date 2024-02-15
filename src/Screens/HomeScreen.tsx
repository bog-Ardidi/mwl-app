import React from "react";
import Screen from "../Components/Base/Screen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../Config/firebase";
import { Text } from "react-native";
import Button from "../Components/Base/Button";
import routes from "../Config/routes";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Screen>
      {/* <Button
        title="Submit workload rating"
        onPress={() => navigation.navigate(routes.SUBMIT_SCREEN)}
      />
      <Button
        title="Go to graph page"
        onPress={() => navigation.navigate(routes.GRAPH_SCREEN)}
      />
      <Button
        title="Calendar"
        onPress={() => navigation.navigate(routes.CALENDAR_SCREEN)}
      />
      <Button
        title="Log Out"
        onPress={() => FirebaseSignOut()}
        style={{ backgroundColor: "red" }}
      /> */}
      <Text>Welcome back, {auth.currentUser?.email}</Text>
      <Button
        title="Scores"
        onPress={() => navigation.navigate(routes.SCORES_SCREEN)}
      />
    </Screen>
  );
};

export default HomeScreen;
