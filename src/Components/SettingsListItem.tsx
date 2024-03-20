import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "./Base/Icon";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";

function SettingsListItem({ name, iconName, onPress }) {
  return (
    <TouchableOpacity onPress={(e) => onPress(e)}>
      <View style={[styles.container]}>
        <Icon name={iconName} size={60} />

        <Text style={styles.name}>{name}</Text>

        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color={colors.medium}
          style={styles.rightArrow}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.gray100,
  },
  name: {
    fontWeight: "500",
    marginLeft: 10,
    color: colors.black,
    fontSize: fontSize.lg,
  },
  rightArrow: {
    position: "absolute",
    right: 10,
  },
});

export default SettingsListItem;
