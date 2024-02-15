import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { Fragment, useState, useCallback, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import {
  getWorkloadForDay,
  getWorkloadForMonth,
} from "../Controllers/WorkloadController";
import FeedbackList from "../Components/FeedbackList";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
  }, []);

  // updates the feedback list on date click
  useEffect(() => {
    console.log(selected);
    if (didMount) {
      async function fetchData() {
        const res = await getWorkloadForDay(selected);
        setSelectedData(res?.docs?.map((e: any) => e.data()));
      }
      fetchData();
    }
  }, [selected]);

  // pulls data for MWL submitted over the current month
  useEffect(() => {
    async function fetchData() {
      const res = await getWorkloadForMonth(initialDate);
      setData(res?.docs?.map((e: any) => e.data()));
    }
    fetchData();
  }, [initialDate]);

  // calculates which dates on the calendar need to be marked
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

  const onMonthChange = useCallback((month: any) => {
    console.log(month);
    setInitialDate(month?.dateString);
  }, []);

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
          current={initialDate}
          style={styles.calendar}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
          markedDates={marked}
        />
      </Fragment>
      {selected ? (
        <>
          <Text>Showing data for: {selected}</Text>
          <FeedbackList data={selectedData} />
        </>
      ) : (
        <Text> No data selected</Text>
      )}
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
