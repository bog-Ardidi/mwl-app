import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../../Config/colors";

/**
 * Base loading component.
 */
export default function () {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.purple} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
