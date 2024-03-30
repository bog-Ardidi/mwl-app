import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  StyleProp,
  ViewProps,
  TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../Config/colors";

interface IconProps {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  width?: string;
  style?: StyleProp<ViewProps>;
}

export type IconTextInputProps = IconProps & TextInputProps;

/**
 * Base Text Input with and icon on the left.
 * @param icon - Name of icon (from MaterialCommunityIcons)
 * @param width - Width
 * @param style - Any additional style
 * @param otherProps - Any additional TextInput props
 */
function IconTextInput({
  icon,
  width = "100%",
  style,
  ...otherProps
}: IconTextInputProps) {
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
