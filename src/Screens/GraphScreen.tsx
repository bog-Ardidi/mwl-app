import { View } from "react-native";
import Screen from "../Components/Screen";
import Icon from "../Components/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryScatter,
} from "victory-native";

const data = [
  { x: 5, y: 28, size: 36 },
  { x: 28, y: 5, size: 25 },
  { x: 14, y: 15, size: 16 },
  { x: 23, y: 32, size: 15 },
  { x: 56, y: 48, size: 18 },
];

const GraphScreen = () => {
  const navigation = useNavigation();

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
        <VictoryChart
          domain={{ y: [0, 100] }}
          containerComponent={
            <VictoryZoomContainer zoomDomain={{ x: [0, 35], y: [0, 100] }} />
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
    </Screen>
  );
};

export default GraphScreen;
