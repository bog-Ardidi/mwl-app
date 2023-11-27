import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";

import { FirebaseSignIn } from "../../Controllers/AuthenticationController";
import Screen from "../../Components/Screen";
import IconTextInput from "../../Components/IconTextInput";
import colors from "../../Utils/colors";
import Button from "../../Components/Button";

export default function ({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    //setLoading(true);
    FirebaseSignIn({ email, password });
  }

  return (
    <Screen style={styles.screenContainer}>
      <Image
        resizeMode="contain"
        source={require("../../../assets/login.png")}
        style={styles.logo}
      />
      <View style={styles.loginContainer}>
        <IconTextInput
          icon="account"
          placeholder="Enter your password"
          value={email}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          onChangeText={(text: string) => setEmail(text)}
        />
        <IconTextInput
          icon="lock"
          placeholder="Enter your password"
          value={password}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
        />

        <Button
          title="Login"
          onPress={() => {
            login();
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white100,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  loginContainer: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});
