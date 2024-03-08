import Screen from "./Base/Screen";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CalendarUtils,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import {
  getWorkloadForDay,
  getWorkloadForMonth,
} from "../Controllers/Workload/ReadController";
import { fontSize } from "../Config/typography";
import BubbleChart from "./BubbleChart";

const Calendar = () => {
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());
  const [graphData, setGraphData] = useState<any>(null);

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);

    setMarked((prev) => ({
      ...prev,
      "2024-03-09": { selected: true, selectedColor: "red", startingDay: true },
      "2024-03-12": { selected: true, selectedColor: "red", endingDay: true },
    }));
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
          data.map((e: any) => [
            [CalendarUtils.getCalendarDateString(e.data.timestamp.toDate())],
            {
              customStyles: {
                container: {
                  backgroundColor: "pink",
                },
              },
            },
          ])
        )
      );
  }, [data]);

  useEffect(() => {
    console.log(marked);
  }, [marked]);

  const onMonthChange = useCallback((month: any) => {
    console.log(month);
    setInitialDate(month?.dateString);
  }, []);

  return (
    <Screen>
      <CalendarProvider date={initialDate}>
        <ExpandableCalendar
          enableSwipeMonths
          current={initialDate}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
          markedDates={marked}
          animateScroll
          closeOnDayPress={true}
          markingType={"custom"}
          // style={{
          //   borderRadius: 5,
          //   elevation: 5,
          //   margin: 5,
          //   borderWidth: 4,
          //   borderColor: "rgba(100, 100, 100, 0.2)",
          // }}
          // theme={{
          //   calendarBackground: "#222",
          //   dayTextColor: "#fff",
          //   textDisabledColor: "#444",
          //   monthTextColor: "#888",
          // }}
        />

        {selected ? (
          <>
            <Text style={styles.text}>Selected data for: {selected}</Text>
            {Object.keys(marked).includes(selected) ? (
              <BubbleChart data={graphData} />
            ) : (
              <Text style={{ color: "red", alignSelf: "center" }}>
                No data for selected date
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.text}> No date selected</Text>
        )}
      </CalendarProvider>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 30,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    fontSize: fontSize.xl,
    marginTop: 10,
  },
});

export default Calendar;
