import { View, StyleSheet, Text } from "react-native";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";
import Icon from "./Base/Icon";

interface WorkloadCard {
  data: {
    name: string;
    rating: string;
    duration: string;
    timestamp: any;
  };
}

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const WorkloadCard = ({ data }: WorkloadCard) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.cardTitle}>{data.name ?? "No name provided"}</Text>
        <Text style={styles.cardText}>
          {data.timestamp.seconds
            ? new Date(data.timestamp.toDate()).toLocaleDateString(
                "en-gb",
                dateOptions
              )
            : "No date provided"}
        </Text>
        <Text style={styles.cardText}>
          Mental Workload Rating: {data.rating ?? "No rating provided"}
        </Text>
        <Text style={styles.cardText}>
          Duration: {data.duration ?? "No rating provided"}
        </Text>
      </View>
      <View style={styles.deleteButton}>
        {/* <Icon
          name="trash-can-outline"
          backgroundColor={colors.transparent}
          iconColor={colors.primaryRed}
          size={50}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grayBorder,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: fontSize.xl,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 10,
  },
  cardText: {
    fontSize: fontSize.lg,
    color: colors.dark100,
    margin: 2,
    marginLeft: 3,
  },
  deleteButton: {
    justifyContent: "center",
  },
});

export default WorkloadCard;
