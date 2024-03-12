import { VictoryChart, VictoryScatter, VictoryAxis } from "victory-native";
import Loading from "./Base/Loading";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal";
import GraphStatistics from "./GraphStatistics";
import { getWorkloadForDay } from "../Utils/workloadHelper";
import { checkSameDay } from "../Utils/dateHelpers";
import { JsonPrettify } from "../Utils/JsonPrettify";

const BubbleChart = ({ selectedDate, range, data }: any) => {
  const [allFeedback, setAllFeedback] = useState([]);
  const [graphData, setGraphData] = useState<any>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleVisible = () => setOpenModal(!openModal);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      getWorkloadForDay(selectedDate, setAllFeedback);
    }
  }, [selectedDate]);

  useEffect(() => {
    setGraphData(
      allFeedback?.map((e: any) => ({
        x: Number(e.data.duration),
        y: Number(e.data.rating),
        size: 10,
        id: e.docId,
      }))
    );
  }, [allFeedback]);

  useEffect(() => {
    if (range) {
      let result = data.filter((o1) =>
        range.some((o2) => checkSameDay(o1.data.timestamp, o2))
      );

      setAllFeedback(result);
    }
  }, [range]);

  useEffect(() => {
    console.log(graphData);
  }, [graphData]);

  return (
    <>
      {graphData ? (
        <>
          <VictoryChart
            domain={{ x: [0, 24], y: [0, 15] }}
            // containerComponent={
            //   <VictoryZoomContainer zoomDomain={{ x: [0, 20], y: [0, 20] }} />
            // }
          >
            <VictoryAxis label="Duration" />
            <VictoryAxis dependentAxis label="Rating" />
            <VictoryScatter
              data={graphData}
              style={{
                data: {
                  fill: "green",
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
        <Loading />
      )}
    </>
  );
};

export default BubbleChart;
