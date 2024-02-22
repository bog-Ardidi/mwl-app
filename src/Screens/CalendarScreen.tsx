import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { Fragment, useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { useDidMount } from "../Utils/useIsMount";
import {
  getWorkloadForDay,
  getWorkloadForMonth,
} from "../Controllers/Workload/ReadController";
import { fontSize } from "../Config/typography";
import Button from "../Components/Base/Button";
import routes from "../Config/routes";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const didMount = useDidMount();
  const [data, setData] = useState<any>(null);
  const [marked, setMarked] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);
  const [initialDate, setInitialDate] = useState<string>(new Date().toString());

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
          <Text style={styles.text}>Selected data for: {selected}</Text>
          {Object.keys(marked).includes(selected) ? (
            <>
              <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsText}>Total MWL recorded: </Text>
                <Text style={styles.statisticsText}>
                  Average duration of MWL: -
                </Text>
                <Text style={styles.statisticsText}>Average MWL score: -</Text>
              </View>
              <Button title="Add MWL" onPress={() => console.log("Add MWL")} />
              <Button
                title="See Bubble Chart"
                onPress={() =>
                  navigation.navigate(routes.GRAPH_SCREEN, {
                    initialDate: selected,
                  })
                }
              />
            </>
          ) : (
            <Text style={{ color: "red", alignSelf: "center" }}>
              {" "}
              No data for selected date{" "}
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.text}> No date selected</Text>
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
    fontSize: fontSize.xl,
  },
  statisticsContainer: {
    margin: 20,
  },
  statisticsText: {
    fontSize: fontSize.lg,
    marginBottom: 10,
  },
});

export default CalendarScreen;
