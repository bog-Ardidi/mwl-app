import { View, StyleSheet, Text, Alert } from "react-native";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";
import Icon from "./Base/Icon";
import { DeleteWorkload } from "../Controllers/Workload/DeleteController";

interface WorkloadCardProps {
  data: {
    docId: string;
    data: {
      name: string;
      rating: string;
      duration: string;
      timestamp: any;
    };
  };
  showDelete?: boolean;
}

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const DeleteItem = (docId: string) => {
  Alert.alert(
    "Delete document",
    "Are you sure you want to delete this document?",
    [
      {
        text: "Yes",
        onPress: () => {
          DeleteWorkload(docId);
        },
      },
      {
        text: "No",
      },
    ]
  );
};

const WorkloadCard = ({ data, showDelete = false }: WorkloadCardProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.cardTitle}>
          {data.data.name ?? "No name provided"}
        </Text>
        <Text style={styles.cardText}>
          {data.data.timestamp.seconds
            ? new Date(data.data.timestamp.toDate()).toLocaleDateString(
                "en-gb",
                dateOptions
              )
            : "No date provided"}
        </Text>
        <Text style={styles.cardText}>
          Mental Workload Rating: {data.data.rating ?? "No rating provided"}
        </Text>
        <Text style={styles.cardText}>
          Duration: {data.data.duration ?? "No rating provided"}
        </Text>
      </View>
      {showDelete && (
        <View style={styles.deleteButton}>
          <Icon
            name="trash-can-outline"
            backgroundColor={colors.transparent}
            iconColor={colors.primaryRed}
            size={50}
            onClick={() => DeleteItem(data.docId)}
          />
        </View>
      )}
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
