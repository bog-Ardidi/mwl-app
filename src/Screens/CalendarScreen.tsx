import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { Fragment, useState, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import {
  getWorkloadForDay,
  getWorkloadForMonth,
} from "../Controllers/Workload/ReadController";
import { fontSize } from "../Config/typography";

import GraphScreen from "./GraphScreen";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());
  const [graphData, setGraphData] = useState<any>(null);

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
  }, []);

  // pulls data for MWL submitted over the current month
  useEffect(() => {
    async function fetchData() {
      const res = await getWorkloadForMonth(initialDate);
      setData(
        res?.docs?.map((e: any) => ({
          docId: e.id,
          data: e.data(),
        }))
      );
    }
    fetchData();
  }, [initialDate]);

  useEffect(() => {
    if (didMount) {
      async function fetchData() {
        const res = await getWorkloadForDay(selected);
        setGraphData(
          res?.docs?.map((e: any) => ({
            docId: e.id,
            data: e.data(),
          }))
        );
      }
      fetchData();
    }
  }, [selected]);

  // calculates which dates on the calendar need to be marked
  useEffect(() => {
    if (didMount)
      setMarked(
        Object.fromEntries(
          data.map((e) => [
            [CalendarUtils.getCalendarDateString(e.data.timestamp.toDate())],
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
      <ScrollView>
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
            <Text style={styles.text}>Selected data for: {selected}</Text>
            {Object.keys(marked).includes(selected) ? (
              <GraphScreen data={graphData} />
            ) : (
              <Text style={{ color: "red", alignSelf: "center" }}>
                No data for selected date
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.text}> No date selected</Text>
        )}
      </ScrollView>
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
    fontSize: fontSize.xl,
  },
});

export default CalendarScreen;
