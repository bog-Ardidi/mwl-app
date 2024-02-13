import Screen from "../Components/Screen";
import Icon from "../Components/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { Fragment, useState, useMemo, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import { getWorkloadForMonth } from "../Controllers/WorkloadController";

const INITIAL_DATE = new Date().toString();

const CalendarScreen = () => {
  const navigation = useNavigation();
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);

  const onDayPress = useCallback((day: any) => {
    console.log("pressed");
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await getWorkloadForMonth(INITIAL_DATE);
      setData(res?.docs?.map((e: any) => e.data()));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (didMount)
      setMarked(
        Object.fromEntries(
          data.map((e) => [
            [CalendarUtils.getCalendarDateString(e.timestamp.toDate())],
            {
              selected: true,
            },
          ])
        )
      );
  }, [data]);

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />

      <Fragment>
        <Calendar
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={onDayPress}
          onMonthChange={(e: any) => console.log(e.dateString)}
          markedDates={marked}
        />
      </Fragment>
    </Screen>
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "lightgrey",
    fontSize: 16,
  },
});

export default CalendarScreen;
