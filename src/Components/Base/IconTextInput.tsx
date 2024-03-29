/**
 *  Custom TextInput that let's you choose an icon.
 *  The icon is placed on the left end of the Text input field.
 *  If icon is not passed a normal TextInput will be loaded.
 *  Icons are taken from expo/vector-icons and are called by their names.
 */

import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../Config/colors";

function IconTextInput({ icon, width = "100%", style, ...otherProps }: any) {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.dark}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.medium}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    borderWidth: 0.5,
    borderColor: colors.grayBorder,
  },
  icon: {
    alignSelf: "center",
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
});

export default IconTextInput;
