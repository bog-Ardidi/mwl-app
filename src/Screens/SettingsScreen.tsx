import { useNavigation } from "@react-navigation/native";
import Screen from "../Components/Base/Screen";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import {
  CalendarProvider,
  WeekCalendar,
  ExpandableCalendar,
} from "react-native-calendars";
import GraphScreen from "./GraphScreen";
import Button from "../Components/Base/Button";
import routes from "../Config/routes";

const SettingsScreen = ({ weekView = false }) => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <Button
        title="View all feedback"
        onPress={() => navigation.navigate(routes.SCORES_SCREEN)}
      />
    </Screen>
  );
};

export default SettingsScreen;
