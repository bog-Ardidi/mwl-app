import { View, Text } from "react-native";
import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { VictoryChart, VictoryScatter } from "victory-native";
import { useState, useEffect } from "react";
import { getWorkloadForDay } from "../Controllers/Workload/ReadController";
import { useDidMount } from "../Utils/useIsMount";
import Loading from "../Components/Base/Loading";
import FeedbackList from "../Components/FeedbackList";

//date options
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const GraphScreen = ({ navigation, route, data }: any) => {
  return (
    <>
      {data ? (
        <>
          <VictoryChart
            domain={{ x: [0, 10], y: [0, 10] }}
            // containerComponent={
            //   <VictoryZoomContainer zoomDomain={{ x: [0, 20], y: [0, 20] }} />
            // }
          >
            <VictoryScatter
              bubbleProperty="amount"
              maxBubbleSize={25}
              minBubbleSize={5}
              data={[
                { x: 1, y: 2, amount: 10 },
                { x: 2, y: 3, amount: 25 },
                { x: 3, y: 5, amount: 30 },
                { x: 4, y: 4, amount: 40 },
                { x: 5, y: 7, amount: 45 },
              ]}
              style={{
                data: {
                  opacity: ({ datum }) => (datum.y % 5 === 0 ? 1 : 0.7),
                  fill: ({ datum }) => (datum.x % 5 === 0 ? "blue" : "green"),
                },
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          mutation: (props) => console.log(props),
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryChart>
          <FeedbackList data={data} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GraphScreen;
