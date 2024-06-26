/**
 *  Takes care of the error message displayed by the validation
 *  changing it in real time.
 */

import React from "react";
import { StyleSheet, Text } from "react-native";

interface ErrorMessageProps {
  error: string;
  visible: boolean;
}

function ErrorMessage({ error, visible }: ErrorMessageProps) {
  if (!error || !visible) return null;

  return <Text style={styles.error}> {error} </Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginLeft: 10,
  },
});

export default ErrorMessage;
