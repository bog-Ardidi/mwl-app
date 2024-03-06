import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { FirebaseSignIn } from "../../Controllers/AuthenticationController";
import IconTextInput from "../../Components/Base/IconTextInput";
import Button from "../../Components/Base/Button";
import { Divider } from "../../Components/Base/Divider";
import routes from "../../Config/routes";
import { useNavigation } from "@react-navigation/native";
import AuthScreenOverlay from "../../Components/AuthScreensOverlay";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function login() {
    //setLoading(true);
    FirebaseSignIn({ email, password });
  }

  return (
    <AuthScreenOverlay>
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

      <TouchableOpacity>
        <Text style={styles.optionsText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}
      >
        <Text style={styles.optionsText}>Forgotten password</Text>
      </TouchableOpacity>
    </AuthScreenOverlay>
  );
}

const styles = StyleSheet.create({
  optionsText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    marginTop: 40,
  },
});
