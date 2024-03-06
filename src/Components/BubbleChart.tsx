import { VictoryChart, VictoryScatter, VictoryAxis } from "victory-native";
import Loading from "./Base/Loading";
import FeedbackList from "./FeedbackList";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal";

const BubbleChart = ({ navigation, route, data }: any) => {
  const [graphData, setGraphData] = useState<any>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleVisible = () => setOpenModal(!openModal);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    setGraphData(
      data?.map((e: any) => ({
        x: Number(e.data.duration),
        y: Number(e.data.rating),
        size: 10,
        id: e.docId,
      }))
    );
  }, [data]);

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

                            const clickedData = data.find(
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
          <FeedbackList data={data} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default BubbleChart;
