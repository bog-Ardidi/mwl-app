import React from "react";
import { View, ActivityIndicator } from "react-native";
import colors from "../../Config/colors";

export default function ({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.midnightBlue} />
    </View>
  );
}
