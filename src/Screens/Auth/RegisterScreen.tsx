import AuthScreenOverlay from "../../Components/AuthScreensOverlay";
import IconTextInput from "../../Components/Base/IconTextInput";
import Button from "../../Components/Base/Button";
import { Divider } from "../../Components/Base/Divider";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FirebaseRegister } from "../../Controllers/AuthenticationController";

const Register = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigation = useNavigation();

  return (
    <AuthScreenOverlay>
      <Text style={styles.optionsText}>Register a new account</Text>

      <IconTextInput
        icon="account"
        placeholder="Enter your email"
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text: string) => setEmail(text)}
      />
      <IconTextInput
        icon="lock"
        placeholder="Enter your password"
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text: string) => setPassword(text)}
      />
      <Button
        title="Register"
        style={styles.button}
        onPress={() => {
          email && password
            ? FirebaseRegister({ email, password })
            : alert("Incorrect fields, please check your details");
        }}
      />

      <Divider text="More options" />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.optionsText}>Back to login</Text>
      </TouchableOpacity>
    </AuthScreenOverlay>
  );
};

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

export default Register;
