import Screen from "../Components/Screen";
import Icon from "../Components/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { Fragment, useState, useMemo, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import { getWorkloadForToday } from "../Controllers/WorkloadController";

const INITIAL_DATE = new Date().toString();

const CalendarScreen = () => {
  const navigation = useNavigation();
  const didMount = useDidMount();

  const [selected, setSelected] = useState(INITIAL_DATE);

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
  }, []);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getWorkloadForToday(selected);
      setData(res?.docs?.map((e: any) => e.data()));
    }
    fetchData();
  }, [selected]);

  useEffect(() => {
    console.log("data is: ", data);

    if (data)
      data?.map((e) => console.log(new Date(e?.timestamp.toDate().toString())));
  }, [data]);

  const marked = useMemo(() => {
    return {
      [CalendarUtils.getCalendarDateString(new Date())]: {
        marked: true,
        selected: true,
      },
      [CalendarUtils.getCalendarDateString(new Date("February 2, 2024"))]: {
        marked: true,
        selected: true,
      },
    };
  }, [selected]);

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
