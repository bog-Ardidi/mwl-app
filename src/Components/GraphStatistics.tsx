import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fontSize } from "../Config/typography";
import { Divider } from "./Base/Divider";
import colors from "../Config/colors";
import { roundToDecimal } from "../Utils/workloadHelper";

const GraphStatistics = ({ data }: any) => {
  const totalTasks = data?.length;
  const avgDuration =
    data.reduce((total, next) => total + Number(next.data.duration), 0) /
    totalTasks;

  const avgRating =
    data.reduce((total, next) => total + Number(next.data.rating), 0) /
    totalTasks;

  return (
    <View style={styles.container}>
      <Divider text="Details" style={styles.divider} color={colors.gray500} />
      <ScrollView contentContainerStyle={styles.statisticsContainer}>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>Total tasks submitted:</Text>
          <Text style={styles.statisticValue}>{totalTasks}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>Average Task Duration:</Text>
          <Text style={styles.statisticValue}>
            {roundToDecimal(avgDuration, 1)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>Average MWL rating:</Text>
          <Text style={styles.statisticValue}>
            {roundToDecimal(avgRating, 1)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.statisticLabel}>MWL Balance:</Text>
          <Text style={styles.statisticValue}>N/A</Text>
        </View>
      </ScrollView>
      <Divider style={styles.divider} color={colors.gray500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  statisticsContainer: {
    padding: 10,
    justifyContent: "center",
    //backgroundColor: "white",
  },
  statisticLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.tealGreen,
  },
  statisticValue: {
    fontSize: fontSize.xl,
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
});

export default GraphStatistics;
