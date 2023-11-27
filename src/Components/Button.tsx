import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../Config/colors";

interface ButtonProps {
  title: string;
  onPress: any;
  style?: any;
}

function Button({ title, onPress, style }: ButtonProps) {
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
    alignSelf: "center",
    backgroundColor: colors.palette2,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  text: {
    color: colors.black100,
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default Button;
