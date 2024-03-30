import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { FirebaseSignIn } from "../../Controllers/AuthenticationController";
import { Divider } from "../../Components/Base/Divider";
import routes from "../../Config/routes";
import { useNavigation } from "@react-navigation/native";
import AuthScreenOverlay from "../../Components/AuthScreensOverlay";
import FormField from "../../Components/Validation/FormField";
import FormikForm from "../../Components/Validation/FormikForm";
import { validationSchemaLogin } from "../../Config/validationSchema";
import ValidatedButton from "../../Components/Validation/ValidatedButton";

export default function () {
  const navigation = useNavigation();

  return (
    <AuthScreenOverlay>
      <FormikForm
        initialValues={{ email: "", password: "" }}
        // send user credentials to database
        onSubmit={(values: any) => FirebaseSignIn(values)}
        validationSchema={validationSchemaLogin}
      >
        {/* E-mail form field */}
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          keyboardType="email-address"
          placeholder="Enter your email"
          textContentType="emailAddress"
          name="email"
        />

        {/* Password form field */}
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Enter your password"
          textContentType="password"
          secureTextEntry
          name="password"
        />

        <ValidatedButton title="Login" style={styles.button} />
      </FormikForm>

      <Divider text="More options" />

      <TouchableOpacity
        onPress={() => navigation.navigate(routes.REGISTER_SCREEN)}
      >
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
