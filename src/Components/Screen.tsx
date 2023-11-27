/**
 *  A reusable screen component. It ensures that the view on the screen
 *  is correctly sized on both Android and IOS devices.
 */

import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, StyleProp } from "react-native";

interface ScreenProps {
  style: StyleProp<any>;
  children: any;
}

function Screen({ style, children }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },

  view: {
    flex: 1,
  },
});

export default Screen;
