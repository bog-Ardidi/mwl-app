import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fontSize } from "../Config/typography";
import { Divider } from "./Base/Divider";
import colors from "../Config/colors";
import { calculateOverallMWL, roundToDecimal } from "../Utils/workloadHelper";
import { useState } from "react";
import Tooltip from "./Tooltip";

const GraphStatistics = ({ data }: any) => {
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [goodMWL, setGoodMWL] = useState<boolean>(false);
  const totalTasks = data?.length;
  const avgDuration =
    data.reduce((total, next) => total + Number(next.data.duration), 0) /
    totalTasks;

  const avgRating =
    data.reduce((total, next) => total + Number(next.data.rating), 0) /
    totalTasks;

  calculateOverallMWL(data);

  return (
    <View style={styles.container}>
      <Divider style={styles.divider} color={colors.gray500} />
      <ScrollView contentContainerStyle={styles.statisticsContainer}>
        <Text style={[styles.title, styles.shadow]}>Details</Text>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>Total tasks submitted:</Text>
          <Text style={styles.statisticValue}>{totalTasks}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>Average Task Duration:</Text>
          <Text style={styles.statisticValue}>
            {avgDuration < 60
              ? `${roundToDecimal(avgDuration, 1)} min `
              : ` ${roundToDecimal(avgDuration / 60, 1)} hrs`}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>Average MWL rating:</Text>
          <Text style={styles.statisticValue}>
            {roundToDecimal(avgRating, 1)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>Overall MWL Balance:</Text>
          <View style={styles.balanceContainer}>
            <Text
              style={[
                styles.statisticValue,
                styles.balanceValue,
                styles.shadow,
                goodMWL ? styles.balanceValueGood : styles.balanceValueBad,
              ]}
            >
              {goodMWL ? "Good" : "Bad"}
            </Text>
            <Tooltip open={toolTipVisible} setOpen={setToolTipVisible}>
              <Text>
                {goodMWL
                  ? "You have had a balanced amount of low, medium and high Mental workload today!"
                  : "Example: You have had long periods of high mental workload today!"}
              </Text>
            </Tooltip>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 0,
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: fontSize.xl,
    marginBottom: 15,
    fontWeight: "500",
    color: colors.black100,
  },
  statisticsContainer: {
    justifyContent: "center",
  },
  statisticLabel: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.tealGreen,
  },
  statisticValue: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.black,
  },
  divider: {
    margin: 0,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    marginBottom: 15,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: -5,
  },
  balanceValue: {
    marginRight: 5,
    fontWeight: "500",
  },
  balanceValueBad: {
    color: colors.primaryRed,
  },
  balanceValueGood: {
    color: colors.bubbleGreen,
  },
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default GraphStatistics;
