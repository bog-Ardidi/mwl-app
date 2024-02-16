import React, { useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";

import { FirebaseSignIn } from "../../Controllers/AuthenticationController";
import Screen from "../../Components/Base/Screen";
import IconTextInput from "../../Components/Base/IconTextInput";
import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";
import Button from "../../Components/Base/Button";
import { hex2rgba } from "../../Utils/hex2rgba";
import { Divider } from "../../Components/Base/Divider";

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
        <Text style={styles.titleText}>Mental Workload Tracker</Text>
        <IconTextInput
          icon="account"
          placeholder="Enter your email"
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
          style={styles.button}
          onPress={() => {
            login();
          }}
        />

        <Divider text="More options" />

        <Text style={styles.optionsText}>Register</Text>
        <Text style={styles.optionsText}>Forgotten password</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: hex2rgba(colors.palette5, 0.1),
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    flex: 2,
  },
  loginContainer: {
    backgroundColor: colors.white,
    flex: 3,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  titleText: {
    textAlign: "center",
    fontSize: fontSize["h3"],
    fontWeight: "500",
    marginVertical: 40,
  },
  optionsText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    marginTop: 40,
  },
});
