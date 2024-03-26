import Screen from "./Base/Screen";
import { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import { fontSize } from "../Config/typography";
import BubbleChart from "./BubbleChart";
import { dateDiffInDays, getDatesInRange } from "../Utils/dateHelpers";
import { calculateRangeObject } from "../Utils/dateHelpers";
import { getWorkloadForMonth } from "../Utils/workloadHelper";
import { useNavigation } from "@react-navigation/native";
import colors from "../Config/colors";

const Calendar = ({ compare, setCompare }: any) => {
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());
  const navigation = useNavigation();

  const handleCompare = () => setCompare(!compare);

  const [startingDay, setStartingDay] = useState<Date | null>(null);
  const [endingDay, setEndingDay] = useState<Date | null>(null);
  const [range, setRange] = useState<Date[] | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setInitialDate(new Date().toString());
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
        const d1 = new Date(startingDay);
        const d2 = new Date(day.dateString);

        if (d1 > d2) {
          alert("End date must not be before start date!");
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
            //borderRadius: 30,
            elevation: 5,
            //margin: 5,
            //borderWidth: 1,
            //borderColor: "rgba(100, 100, 100, 0.2)",
            borderColor: colors.mint,
          }}
        >
          <View style={styles.multiSelectionContainer}>
            {compare && (
              <Text style={styles.multiSelectionText}>
                Multi-day selection on!
              </Text>
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
            firstDay={1}
            theme={{
              monthTextColor: colors.tealGreen,
              arrowColor: colors.bubbleGreen,
              textMonthFontWeight: "bold",
              todayTextColor: colors.darkerBlue,
              textDayHeaderFontWeight: "bold",
              textDayFontWeight: "500",
              dayTextColor: colors.tealGreen,
              stylesheet: {
                // calendar: {
                //   main: {
                //     container: {
                //       borderWidth: 1,
                //       borderColor: "green",
                //     },
                //   },
                // },
                // expandable: {
                //   main: {
                //     container: {
                //       borderWidth: 1,
                //     },
                //   },
                // },
              },
              // dayTextColor: "red",
              //textDayHeaderFontSize: fontSize.h1,
              //weekVerticalMargin: 10,
              //calendarBackground: "#222",
              //calendarBackground: colors.mint,
              //dayTextColor: "#fff",
              //textDisabledColor: "#444",
              //monthTextColor: "#888",
            }}
          />
        </View>

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
  multiSelectionText: {
    textAlign: "center",
    color: colors.tealGreen,
    fontWeight: "bold",
  },
  multiSelectionContainer: {
    height: 20,
  },
});

export default Calendar;
