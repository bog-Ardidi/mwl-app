import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IconProps {
  name: any;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  onClick?: () => void;
}

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
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
        />
      </View>
    </TouchableOpacity>
  );
}

export default Icon;
