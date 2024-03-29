import Screen from "./Base/Screen";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import { fontSize } from "../Config/typography";
import BubbleChart from "./BubbleChart";
import { getDatesInRange } from "../Utils/dateHelpers";
import { calculateRangeObject } from "../Utils/dateHelpers";
import { JsonPrettify } from "../Utils/JsonPrettify";
import { getWorkloadForMonth } from "../Utils/workloadHelper";
import { CalendarUtils } from "react-native-calendars";

const Calendar = () => {
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());

  const [compare, setCompare] = useState<boolean>(false);
  const handleCompare = () => setCompare(!compare);

  const [startingDay, setStartingDay] = useState<Date | null>(null);
  const [endingDay, setEndingDay] = useState<Date | null>(null);
  const [range, setRange] = useState<Date[] | null>(null);

  const onDayPress = useCallback(
    (day: any) => {
      if (!compare) {
        setSelected(day.dateString);
        return;
      }

      if (startingDay && endingDay) {
        setStartingDay(null);
        setEndingDay(null);
        resetCalendar();
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

      setRange(dates);
    }
  }, [startingDay, endingDay]);

  // pulls data for MWL submitted over the current month
  useEffect(() => {
    getWorkloadForMonth(initialDate, setData);
  }, [initialDate]);

  // calculates which dates on the calendar need to be marked
  useEffect(() => {
    if (didMount) getFeedbackDates();
  }, [data]);

  const getFeedbackDates = async () => {
    const datesArray = data.map((e) => e.data.timestamp);
    setMarked(calculateRangeObject(datesArray));
  };

  // reset the compare selection when you get out of compare mode
  useEffect(() => {
    if (didMount && !compare) getFeedbackDates();

    resetCalendar();
  }, [compare]);

  const onMonthChange = useCallback((month: any) => {
    console.log(month);
    resetCalendar();
    setInitialDate(month?.dateString);
  }, []);

  const resetCalendar = () => {
    setSelected(null);
    setRange(null);
    setStartingDay(null);
    setEndingDay(null);
  };

  return (
    <Screen>
      <CalendarProvider date={initialDate}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <Text style={{ marginRight: 10 }}>Compare</Text>
          <Switch value={compare} onValueChange={handleCompare} />
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

        {selected || range ? (
          <>
            {!compare ? (
              <Text style={styles.text}>Selected data for: {selected}</Text>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text style={styles.text}>
                  Start date: {"\n"}
                  {startingDay?.toLocaleString()}
                </Text>
                <Text style={styles.text}>
                  End date: {"\n"}
                  {endingDay?.toLocaleString()}
                </Text>
              </View>
            )}
            <BubbleChart selectedDate={selected} range={range} data={data} />
          </>
        ) : (
          <View style={styles.idleContainer}>
            <Text style={styles.text}> Waiting for data selection!</Text>
          </View>
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
  idleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Calendar;
