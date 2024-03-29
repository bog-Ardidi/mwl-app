// @ts-nocheck
import { VictoryChart, VictoryScatter, VictoryAxis } from "victory-native";
import Loading from "../Base/Loading";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal";
import GraphStatistics from "./GraphStatistics";
import { getWorkloadForDay } from "../../Utils/workloadHelper";
import { checkSameDay } from "../../Utils/dateHelpers";
import { CalendarUtils } from "react-native-calendars";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";
import NoDataComponent from "../Calendar/NoDataComponent";
import { checkForOverlap } from "../../Utils/repulsion";
import { limitNumberWithinRange } from "../../Utils/workloadHelper";
import bubbleColors from "../../Config/bubbleColors";
import { useDidMount } from "../../Utils/useIsMount";

interface BubbleChartProps {
  selectedDate: any;
  range: Date[] | null;
  data: any;
  compare: boolean;
}

// Format of the dates displayed in the component
const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

/**
 * Bubble chart that represents the tasks.
 * Allows for single day or multi-day selection.
 *
 * @param selectedDate - The date selected on the calendar
 * @param range - Range selected in the calendar (compare mode only)
 * @param data - Data to be displayed on the chart
 * @param compare - Boolean that tracks if the Calendar is in normal or
 * compare mode.
 */
const BubbleChart = ({
  selectedDate,
  range,
  data,
  compare,
}: BubbleChartProps) => {
  const [allFeedback, setAllFeedback] = useState([]);
  const [graphData, setGraphData] = useState<null | any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState([]);

  const didMount = useDidMount();
  const handleVisible = () => setOpenModal(!openModal);

  const [bubbles, setBubbles] = useState<any>([
    {
      [CalendarUtils.getCalendarDateString(selectedDate ?? new Date())]:
        bubbleColors[0],
    },
  ]);

  // On date change grab new data
  useEffect(() => {
    if (selectedDate) {
      getWorkloadForDay(selectedDate, setAllFeedback);
    }
  }, [selectedDate]);

  // On load calculate chart values from data
  useEffect(() => {
    if (didMount) {
      setGraphData(
        allFeedback?.map((e: any) => ({
          x: limitNumberWithinRange(Number(e.data.duration) / 60, 1, 24),
          y: Number(e.data.rating),
          size: limitNumberWithinRange(
            (Number(e.data.duration) / 60) * Number(e.data.rating) * 2
          ),
          id: e.docId,
          date: CalendarUtils.getCalendarDateString(e.data.timestamp),
        }))
      );
    }
  }, [allFeedback]);

  // Multi-day select calculations
  useEffect(() => {
    if (range) {
      let result = data.filter((o1) =>
        range.some((o2) => checkSameDay(o1.data.timestamp, o2))
      );

      const unique = [
        ...new Set(
          result.map((item) =>
            CalendarUtils.getCalendarDateString(item.data.timestamp)
          )
        ),
      ];

      setBubbles(
        unique.map((e: any, idx: number) => ({
          [e]: bubbleColors[idx],
        }))
      );

      setAllFeedback(result);
    }
  }, [range]);

  // Check for overlapping bubbles - repulsion
  useEffect(() => {
    checkForOverlap(graphData);
  }, [graphData]);

  if (!graphData) return <Loading />;

  return (
    <>
      {!(graphData?.length <= 0) ? (
        <>
          <View style={styles.chartContainer}>
            {!compare ? (
              <>
                <Text style={styles.selectedText}>Selected data for:</Text>
                <Text style={styles.selectedDate}>
                  {new Date(selectedDate).toLocaleDateString(
                    "en-gb",
                    dateOptions
                  ) ?? "-"}
                </Text>
              </>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.selectedText}>Start date:</Text>
                  <Text style={styles.selectedDate}>
                    {range
                      ? range[0]?.toLocaleDateString("en-gb", dateOptions)
                      : "-"}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.selectedText}>End date:</Text>
                  <Text style={styles.selectedDate}>
                    {range
                      ? range[range.length - 1]?.toLocaleDateString(
                          "en-gb",
                          dateOptions
                        )
                      : "-"}
                  </Text>
                </View>
              </View>
            )}

            <VictoryChart
              domain={{ x: [0, 24], y: [0, 5] }}
              animate={{
                duration: 4000,
                easing: "bounce",
              }}
            >
              <VictoryAxis label="Duration" />
              <VictoryAxis
                dependentAxis
                label="Rating"
                tickFormat={(rating) => String(Math.round(rating))}
              />
              {/* 
            // @ts-ignore */}
              <VictoryScatter
                data={graphData}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      const color = bubbles?.filter((obj) => {
                        return obj[datum.date] ?? null;
                      });
                      return color.length > 0
                        ? color[0][datum.date]
                        : bubbleColors[0];
                    },
                    //opacity: 0.9,
                  },
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onPressIn: () => {
                        return [
                          {
                            target: "data",
                            mutation: (dataProps) => {
                              const clickedId =
                                dataProps.data[dataProps.index].id;

                              const clickedData: any = allFeedback.find(
                                (e: any) => e.docId === clickedId
                              );

                              setModalData(clickedData);
                              handleVisible();
                              return {};
                            },
                          },
                        ];
                      },
                    },
                  },
                ]}
              />
            </VictoryChart>
            <FeedbackModal
              data={modalData}
              open={openModal}
              onClose={handleVisible}
            />

            <GraphStatistics data={allFeedback} />
          </View>
        </>
      ) : (
        <NoDataComponent date={selectedDate} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: colors.white,
    margin: 10,
    marginBottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  selectedText: {
    textAlign: "center",
    fontSize: fontSize.lg,
    margin: 5,
    marginBottom: 0,
    fontWeight: "500",
    color: colors.black100,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  selectedDate: {
    textAlign: "center",
    fontSize: fontSize.lg,
    color: colors.tealGreen,
    fontWeight: "bold",
  },
});

export default BubbleChart;
