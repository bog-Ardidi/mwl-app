import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  View,
  StyleProp,
  ViewProps,
} from "react-native";

interface ScreenProps {
  style?: StyleProp<ViewProps>;
  children: React.ReactNode;
}

/**
 * Base screen component. It ensures that the view on the screen
 * is correctly sized on both Android and IOS devices.
 *
 * @param style - Any additional style
 * @param children - Childern to render in the component
 */
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
