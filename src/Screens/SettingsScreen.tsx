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
      <CalendarProvider
        date={new Date().toString()}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton
        // disabledOpacity={0.6}
        //theme={todayBtnTheme.current}
        // todayBottomMargin={16}
      >
        <ExpandableCalendar
          //   theme={{
          //     calendarBackground: "transparent",
          //   }}
          //testID={testIDs.expandableCalendar.CONTAINER}
          firstDay={1}
          //markedDates={marked.current}
          // animateScroll
          // closeOnDayPress={false}
        />
        <ScrollView>
          <GraphScreen data={[]} />
        </ScrollView>
      </CalendarProvider>
    </Screen>
  );
};

export default SettingsScreen;
