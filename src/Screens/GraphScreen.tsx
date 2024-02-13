import { View, Text } from "react-native";
import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryScatter,
} from "victory-native";
import { useState, useEffect } from "react";
import { getWorkloadForToday } from "../Controllers/WorkloadController";

const data = [
  { x: 5, y: 28, size: 36 },
  { x: 28, y: 5, size: 25 },
  { x: 14, y: 15, size: 16 },
  { x: 23, y: 32, size: 15 },
  { x: 56, y: 48, size: 18 },
];

//date options
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const GraphScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getWorkloadForToday();
      setData(res?.docs?.map((e: any) => e.data()));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    setChartData(
      data.map((e: ChartEntry) => ({
        x: Number(e.duration),
        y: e.rating,
        size: e.rating * Number(e.duration),
      }))
    );
  }, [data]);

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="arrow-left"
            iconColor={colors.black}
            backgroundColor="transparent"
            onClick={() => console.log("change date")}
          />
          <Text>{new Date().toLocaleString("en-gb", options)}</Text>
          <Icon
            name="arrow-right"
            iconColor={colors.black}
            backgroundColor="transparent"
            onClick={() => console.log("change date")}
          />
        </View>
        {data && (
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
        )}
      </View>
    </Screen>
  );
};

export default GraphScreen;
