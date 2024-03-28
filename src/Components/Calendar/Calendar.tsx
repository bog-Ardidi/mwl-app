import Screen from "../Base/Screen";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
} from "react-native-calendars";
import { useDidMount } from "../../Utils/useIsMount";
import { fontSize } from "../../Config/typography";
import BubbleChart from "../Chart/BubbleChart";
import { dateDiffInDays, getDatesInRange } from "../../Utils/dateHelpers";
import { calculateRangeObject } from "../../Utils/dateHelpers";
import { getWorkloadForMonth } from "../../Utils/workloadHelper";
import { useNavigation } from "@react-navigation/native";
import colors from "../../Config/colors";
import NoDataComponent from "./NoDataComponent";

const Calendar = ({ compare }: any) => {
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());
  const navigation = useNavigation();
  const [startingDay, setStartingDay] = useState<Date | null>(null);
  const [endingDay, setEndingDay] = useState<Date | null>(null);
  const [range, setRange] = useState<Date[] | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setInitialDate(new Date().toString());
      resetCalendar();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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
        var d1 = new Date(startingDay);
        var d2 = new Date(day.dateString);

        if (d1 > d2) {
          var temp = d1;
          d1 = d2;
          d2 = temp;

          if (dateDiffInDays(d1, d2) >= 5) {
            alert("Selection allows a maximum of 5 days!");
            return;
          }

          setStartingDay(CalendarUtils.getCalendarDateString(d1));
          setEndingDay(CalendarUtils.getCalendarDateString(d2));
          return;
        }

        if (dateDiffInDays(d1, d2) >= 5) {
          alert("Selection allows a maximum of 5 days!");
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
        <View style={[styles.multiSelectionContainer, styles.shadow]}>
          {compare && (
            <Text style={styles.multiSelectionText}>
              Multi-day selection on!
            </Text>
          )}
        </View>

        <View style={styles.calendarContainer}>
          <ExpandableCalendar
            enableSwipeMonths
            current={initialDate}
            onDayPress={onDayPress}
            onMonthChange={onMonthChange}
            markedDates={marked}
            animateScroll
            closeOnDayPress={false}
            markingType={"period"}
            firstDay={1}
            initialPosition={ExpandableCalendar.positions.OPEN}
            theme={{
              monthTextColor: colors.tealGreen,
              arrowColor: colors.bubbleGreen,
              textMonthFontWeight: "bold",
              todayTextColor: colors.bubbleGreen,
              textDayHeaderFontWeight: "bold",
              textDayFontWeight: "500",
              dayTextColor: colors.tealGreen,
              selectedDayTextColor: colors.black,
            }}
          />
        </View>

        {selected || range ? (
          <>
            <BubbleChart
              selectedDate={selected}
              range={range}
              data={data}
              compare={compare}
            />
          </>
        ) : (
          <NoDataComponent />
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
  selectedText: {
    textAlign: "center",
    fontSize: fontSize.xl,
    marginTop: 10,
  },
  idleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  multiSelectionText: {
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
  },
  multiSelectionContainer: {
    height: 20,
  },
  calendarContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.mint_darker,
  },
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Calendar;
