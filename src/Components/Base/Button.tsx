import React from "react";
import { StyleSheet, TouchableOpacity, Text, StyleProp } from "react-native";
import colors from "../../Config/colors";

interface ButtonProps {
  title: string;
  onPress: (e?: any) => void;
  style?: StyleProp<any>;
}

/**
 * Base button component.
 * @param title - Text that is displayed on the button
 * @param onPress - Function that is invoked when button is pressed
 * @param style - Any additional style
 */
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
