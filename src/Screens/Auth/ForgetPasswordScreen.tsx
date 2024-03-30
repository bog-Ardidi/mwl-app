import { useState } from "react";
import AuthScreenOverlay from "../../Components/AuthScreensOverlay";
import IconTextInput from "../../Components/Base/IconTextInput";
import Button from "../../Components/Base/Button";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Divider } from "../../Components/Base/Divider";
import { useNavigation } from "@react-navigation/native";
import { FirebaseForgottenPassword } from "../../Controllers/AuthenticationController";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>();
  const navigation = useNavigation();

  return (
    <AuthScreenOverlay>
      <View style={styles.container}>
        <Text style={styles.optionsText}>Reset your password</Text>
        <IconTextInput
          icon="account"
          placeholder="Enter your email"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text: string) => setEmail(text)}
        />
        <Button
          title="Reset password"
          style={styles.button}
          onPress={() => {
            email
              ? FirebaseForgottenPassword(email)
              : alert("Please type in your email");
          }}
        />

        <Divider text="More options" />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.optionsText}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </AuthScreenOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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

export default ResetPassword;
