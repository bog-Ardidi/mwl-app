import { VictoryChart, VictoryScatter, VictoryAxis } from "victory-native";
import Loading from "./Base/Loading";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal";
import GraphStatistics from "./GraphStatistics";
import { getWorkloadForDay } from "../Utils/workloadHelper";
import { checkSameDay } from "../Utils/dateHelpers";
import { JsonPrettify } from "../Utils/JsonPrettify";
import { CalendarUtils } from "react-native-calendars";
import { Text } from "react-native";
import { useDidMount } from "../Utils/useIsMount";

function limitNumberWithinRange(num) {
  const MIN = 10;
  const MAX = 30;
  const parsed = parseInt(num);
  return Math.min(Math.max(parsed, MIN), MAX);
}

const bubbleColors = ["green", "blue", "yellow", "purple", "pink"];

const BubbleChart = ({ selectedDate, range, data }: any) => {
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

  if (!graphData) return <Loading />;

  return (
    <>
      {!(graphData?.length <= 0) ? (
        <>
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
                    return color.length > 0 ? color[0][datum.date] : "green";
                  },
                  opacity: 0.5,
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
        </>
      ) : (
        <Text style={{ color: "red", alignSelf: "center" }}>
          No data for selected date
        </Text>
      )}
    </>
  );
};

export default BubbleChart;
