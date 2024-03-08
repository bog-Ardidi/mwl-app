import Screen from "./Base/Screen";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import {
  getWorkloadForDay,
  getWorkloadForMonth,
} from "../Controllers/Workload/ReadController";
import { fontSize } from "../Config/typography";
import BubbleChart from "./BubbleChart";
import { checkSameDay, getDatesInRange } from "../Utils/dateHelpers";
import { calculateRangeObject } from "../Utils/dateHelpers";
import { JsonPrettify } from "../Utils/JsonPrettify";

const Calendar = () => {
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());
  const [graphData, setGraphData] = useState<any>(null);

  const [compare, setCompare] = useState<boolean>(false);
  const handleCompare = () => setCompare(!compare);

  const [startingDay, setStartingDay] = useState<Date | null>(null);
  const [endingDay, setEndingDay] = useState<Date | null>(null);

  const onDayPress = useCallback(
    (day: any) => {
      if (!compare) {
        setSelected(day.dateString);
        return;
      }

      if (startingDay && endingDay) {
        setStartingDay(null);
        setEndingDay(null);
        getFeedbackDates();
        return;
      }

      if (startingDay) {
        if (new Date(startingDay) > new Date(day.dateString)) {
          alert("End date must not be before start date!");
          return;
        }
        setEndingDay(day.dateString);
        return;
      }

      setStartingDay(day.dateString);
      //console.log(data);
    },
    [compare, startingDay, endingDay]
  );

  useEffect(() => {
    if (startingDay) markDate([startingDay]);
  }, [startingDay]);

  const markDate = (dates: any) => {
    const range = calculateRangeObject(dates, true);
    setMarked((prev) => ({
      ...prev,
      ...range,
    }));
  };

  useEffect(() => {
    if (startingDay && endingDay) {
      const dates = getDatesInRange(startingDay, endingDay);
      markDate(dates);

      let result = data.filter((o1) =>
        dates.some((o2) => checkSameDay(o1.data.timestamp.toDate(), o2))
      );

      console.log(data);
      console.log(dates);
      console.log(
        "result is:",
        result.map((e) => JsonPrettify(e))
      );
    }
  }, [startingDay, endingDay]);

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
    if (didMount) getFeedbackDates();
  }, [data]);

  const getFeedbackDates = async () => {
    const datesArray = data.map((e) => e.data.timestamp.toDate());
    setMarked(calculateRangeObject(datesArray));
  };

  // reset the compare selection when you get out of compare mode
  useEffect(() => {
    if (didMount && !compare) getFeedbackDates();
  }, [compare]);

  const onMonthChange = useCallback((month: any) => {
    console.log(month);
    setInitialDate(month?.dateString);
  }, []);

  return (
    <Screen>
      <CalendarProvider date={initialDate}>
        <View style={{ padding: 10 }}>
          <Text>Compare mode</Text>
          <Switch value={compare} onValueChange={handleCompare} />
          {compare && (
            <>
              <Text>Start date: {startingDay?.toLocaleString()}</Text>
              <Text>End date: {endingDay?.toLocaleString()}</Text>
            </>
          )}
        </View>
        <ExpandableCalendar
          enableSwipeMonths
          current={initialDate}
          onDayPress={onDayPress}
          onMonthChange={onMonthChange}
          markedDates={marked}
          animateScroll
          closeOnDayPress={false}
          markingType={"period"}
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
