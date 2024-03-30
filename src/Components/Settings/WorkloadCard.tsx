import { View, StyleSheet, Text, Alert } from "react-native";
import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";
import Icon from "../Base/Icon";
import { DeleteWorkload } from "../../Controllers/Workload/DeleteController";
import { MWLdata } from "../../Types/mwl";
import { dateOptionsLong, getTimeExt } from "../../Utils/dateHelpers";

interface WorkloadCardProps {
  data: MWLdata;
  showDelete?: boolean;
  removeItem: (e: any) => void;
}

/**
 * Deletes the selected task from Firebase and removes it from the react state list.
 */
const DeleteItem = (docId: string, removeItem: (e: string) => void) => {
  Alert.alert(
    "Delete document",
    "Are you sure you want to delete this document?",
    [
      {
        text: "Yes",
        onPress: () => {
          DeleteWorkload(docId);
          removeItem(docId);
        },
      },
      {
        text: "No",
      },
    ]
  );
};

/**
 * UI for a single task displaed in the FeedbackList component.
 *
 * @param data - Data to be displayed in the card
 * @param showDelete - Shows and hides the delete button
 * @param removeItem - Function that updates the list when an item is deleted
 */
const WorkloadCard = ({
  data,
  showDelete = false,
  removeItem,
}: WorkloadCardProps) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View>
        <Text style={styles.cardTitle}>
          {data.data.name ?? "No name provided"}
        </Text>
        <Text style={styles.cardText}>
          {data.data.timestamp
            ? new Date(data.data.timestamp).toLocaleDateString(
                "en-gb",
                dateOptionsLong
              )
            : "No date provided"}
        </Text>
        <Text style={styles.cardText}>
          Mental Workload Rating: {data.data.rating ?? "No rating provided"}
        </Text>
        <Text style={styles.cardText}>
          Duration:{" "}
          {getTimeExt(Number(data.data.duration)) ?? "No rating provided"}
        </Text>
      </View>
      {showDelete && (
        <View style={styles.deleteButton}>
          <Icon
            name="trash-can-outline"
            backgroundColor={colors.transparent}
            iconColor={colors.primaryRed}
            size={50}
            onClick={() => {
              DeleteItem(data.docId, removeItem);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grayBorder,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
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
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default WorkloadCard;
