import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryScatter,
} from "victory-native";
// @ts-ignore
import { range, random } from "lodash";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

function getScatterData() {
  return range(50).map((index: number) => {
    return {
      x: random(1, 50),
      y: random(10, 90),
      size: random(8) + 3,
    };
  });
}

export default function ({ navigation }: any) {
  const { isDarkmode, setTheme } = useTheme();
  const [data, setData] = useState();

  useEffect(() => {
    setData(getScatterData);
  }, []);

  return (
    <Layout>
      <TopNav
        middleContent="Second Screen"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart> */}
        <VictoryChart
          domain={{ y: [0, 100] }}
          containerComponent={
            <VictoryZoomContainer zoomDomain={{ x: [5, 35], y: [0, 100] }} />
          }
        >
          <VictoryScatter
            data={data}
            style={{
              data: {
                opacity: ({ datum }) => (datum.y % 5 === 0 ? 1 : 0.7),
                fill: ({ datum }) => (datum.y % 5 === 0 ? "tomato" : "black"),
              },
            }}
          />
        </VictoryChart>
      </View>
    </Layout>
  );
}
