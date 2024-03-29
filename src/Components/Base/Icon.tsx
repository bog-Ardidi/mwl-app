import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../Config/colors";

interface IconProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  iconStyle?: StyleProp<any>;
  onClick?: () => void;
}

/**
 * Base icon component.
 * @param name - Name of icon (from MaterialCommunityIcons)
 * @param size - Icon size
 * @param backgroundColor - Background color
 * @param iconColor - Icon color
 * @param iconStyle - Any additional style for the icon
 * @param onClick - On click event
 */
function Icon({
  name,
  size = 40,
  backgroundColor = colors.transparent,
  iconColor = colors.black,
  iconStyle,
  onClick,
}: IconProps) {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
          style={iconStyle}
        />
      </View>
    </TouchableOpacity>
  );
}

export default Icon;
