import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fontSize } from "../../Config/typography";
import { Divider } from "../Base/Divider";
import colors from "../../Config/colors";
import {
  MWL,
  calculateOverallMWL,
  roundToDecimal,
} from "../../Utils/workloadHelper";
import { useEffect, useState } from "react";
import Tooltip from "../Base/Tooltip";
import MWLmessage, { mwlLabelStyle, mwlLabels } from "./MWLmessage";
import { MWLdata } from "../../Types/mwl";

interface GraphStatisticsProps {
  data: MWLdata[];
}

/**
 * The graph statistics that appear below the chart when date selection has been made.
 * Calcultes the averages for all tasks that are in the selected dates.
 * Calculates the MWL balance for the time period and generates suggestions if the MWL is bad.
 *
 * @param data - The data to get the statistics from.
 */
const GraphStatistics = ({ data }: GraphStatisticsProps) => {
  const [toolTipVisible, setToolTipVisible] = useState<boolean>(false);
  const [overallMWL, setOverallMWL] = useState<MWL>(MWL.UNSURE);
  const totalTasks = data?.length;
  const avgDuration =
    data.reduce((total, next) => total + Number(next.data.duration), 0) /
    totalTasks;

  const avgRating =
    data.reduce((total, next) => total + Number(next.data.rating), 0) /
    totalTasks;

  // Calculate the MWL balance
  useEffect(() => {
    setOverallMWL(() => calculateOverallMWL(data) ?? MWL.UNSURE);
  }, [data]);

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
                overallMWL >= 3 ? mwlLabelStyle[2] : mwlLabelStyle[overallMWL],
              ]}
            >
              {overallMWL >= 3 ? mwlLabels[2] : mwlLabels[overallMWL]}
            </Text>
            <Tooltip open={toolTipVisible} setOpen={setToolTipVisible}>
              <View style={styles.tooltipContainer}>
                <MWLmessage mwl={overallMWL} />
              </View>
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
  tooltipContainer: {
    padding: 10,
  },
});

export default GraphStatistics;
