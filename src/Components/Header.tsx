import React from "react";
import { TopNav, themeColor, useTheme, Avatar } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header: React.FC = () => {
  const { isDarkmode, setTheme } = useTheme();
  const navigation = useNavigation();

  return (
    <TopNav
      leftContent={
        <Ionicons
          name="chevron-back"
          size={20}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      }
      leftAction={() => navigation.goBack()}
      rightContent={
        <View style={styles.rightContainer}>
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
          <Image
            source={require("../../assets/adaptive-icon.png")}
            style={styles.image}
          />
        </View>
      }
      rightAction={() => {
        if (isDarkmode) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 35,
    marginLeft: 10,
  },
});

export default Header;
