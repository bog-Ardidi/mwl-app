import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../Utils/colors";

interface ButtonProps {
  title: string;
  onPress: any;
  style: any;
  color: string;
}

function Button({
  title,
  onPress,
  style,
  color = "midnightBlue",
}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 45,
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: colors.midnightBlue,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default Button;
