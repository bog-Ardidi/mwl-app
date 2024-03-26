import { auth } from "../Config/firebase";
import { Text, View, StyleSheet, Alert } from "react-native";
import Icon from "../Components/Base/Icon";
import { fontSize } from "../Config/typography";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import routes from "../Config/routes";
import { useState } from "react";
import TutorialModal from "./TutorialModal";

const HomeWelcome = ({ compare, setCompare }: any) => {
  const navigation = useNavigation();
  const [openTutorial, setOpenTutorial] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.shadow]}>Welcome back,</Text>
        <Text style={[styles.emailText, styles.shadow]}>
          {auth.currentUser?.email?.split("@")[0]} !
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <Icon
          name={"plus-circle-outline"}
          size={50}
          iconStyle={styles.shadow}
          iconColor={colors.white}
          onClick={() => navigation.navigate(routes.SUBMIT_SCREEN)}
        />
        <Icon
          name={"select-compare"}
          size={50}
          iconStyle={styles.shadow}
          iconColor={compare ? colors.purple : colors.white}
          onClick={() => setCompare(!compare)}
        />
        <Icon
          name={"information-outline"}
          size={50}
          iconStyle={styles.shadow}
          iconColor={colors.white}
          onClick={() => setOpenTutorial(true)}
        />
        <Icon
          name={"cog-outline"}
          size={50}
          iconStyle={styles.shadow}
          iconColor={colors.white}
          onClick={() => navigation.navigate(routes.SETTINGS_SCREEN)}
        />
      </View>
      <TutorialModal
        open={openTutorial}
        onClose={() => setOpenTutorial(!openTutorial)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
  },
  textContainer: {
    padding: 10,
    paddingBottom: 0,
  },
  text: {
    fontSize: fontSize.h3,
    color: colors.white,
    fontWeight: "500",
  },
  emailText: {
    color: colors.white,
    fontSize: fontSize.lg,
  },
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default HomeWelcome;
