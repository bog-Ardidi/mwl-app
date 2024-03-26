// @ts-nocheck
import { VictoryChart, VictoryScatter, VictoryAxis } from "victory-native";
import Loading from "./Base/Loading";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal";
import GraphStatistics from "./GraphStatistics";
import { getWorkloadForDay } from "../Utils/workloadHelper";
import { checkSameDay } from "../Utils/dateHelpers";
import { CalendarUtils } from "react-native-calendars";
import { Text, View, StyleSheet } from "react-native";
import { useDidMount } from "../Utils/useIsMount";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";
import NoDataComponent from "./NoDataComponent";

function circle(x1, y1, x2, y2, r1, r2) {
  var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

  if (d <= r1 - r2) {
    console.log("Circle B is inside A");
  } else if (d <= r2 - r1) {
    console.log("Circle A is inside B");
  } else if (d < r1 + r2) {
    console.log("Circle intersect to each other");
  } else if (d === r1 + r2) {
    console.log("Circle touch to each other");
  } else {
    console.log("Circle not touch to each other");
  }
}

function limitNumberWithinRange(num) {
  const MIN = 10;
  const MAX = 30;
  const parsed = parseInt(num);
  return Math.min(Math.max(parsed, MIN), MAX);
}

const bubbleColors = [
  colors.bubbleGreen,
  colors.yellow,
  colors.lightBlue,
  colors.lightPurple,
  colors.hotPink,
];

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const BubbleChart = ({ selectedDate, range, data, compare }: any) => {
  const [allFeedback, setAllFeedback] = useState([]);
  const [graphData, setGraphData] = useState<null | any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleVisible = () => setOpenModal(!openModal);
  const [modalData, setModalData] = useState([]);
  const didMount = useDidMount();
  const [bubbles, setBubbles] = useState<any>([
    {
      [CalendarUtils.getCalendarDateString(selectedDate ?? new Date())]:
        bubbleColors[0],
    },
  ]);

  useEffect(() => {
    if (selectedDate) {
      getWorkloadForDay(selectedDate, setAllFeedback);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (didMount) {
      setGraphData(
        allFeedback?.map((e: any) => ({
          x: Number(e.data.duration),
          y: Number(e.data.rating),
          size: limitNumberWithinRange(
            Number(e.data.duration) * Number(e.data.rating)
          ),
          id: e.docId,
          date: CalendarUtils.getCalendarDateString(e.data.timestamp),
        }))
      );
    }
  }, [allFeedback]);

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

  useEffect(() => {
    console.log(graphData);

    if (graphData?.length > 1) {
      const x1 = graphData[0]["x"];
      const y1 = graphData[0]["y"];
      const x2 = graphData[1]["x"];
      const y2 = graphData[1]["y"];
      const r1 = graphData[0]["size"] / 10;
      const r2 = graphData[1]["size"] / 10;

      circle(x1, y1, x2, y2, r1, r2);
    }
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
