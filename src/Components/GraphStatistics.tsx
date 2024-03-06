import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fontSize } from "../Config/typography";

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
      <Text style={styles.title}>Graph statistics</Text>
      <ScrollView contentContainerStyle={styles.statisticsContainer}>
        <Text style={styles.statisticsText}>
          Total tasks submitted: {totalTasks}
        </Text>
        <Text style={styles.statisticsText}>
          Average Task Duration: {avgDuration}
        </Text>
        <Text style={styles.statisticsText}>
          Average MWL rating: {avgRating}
        </Text>
        <Text style={styles.statisticsText}>MWL Balance: </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: fontSize.h3,
    fontWeight: "500",
  },
  statisticsContainer: {
    padding: 10,
  },
  statisticsText: {
    fontSize: fontSize.lg,
    marginTop: 10,
    fontWeight: "500",
  },
});

export default GraphStatistics;
