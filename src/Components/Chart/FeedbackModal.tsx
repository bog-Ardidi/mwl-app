import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";
import Modal from "../Base/Modal";
import { View, StyleSheet, Text } from "react-native";
import { MWLdata } from "../../Types/mwl";
import { getTimeExt } from "../../Utils/dateHelpers";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  data: MWLdata;
}

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

/**
 *
 * @param open - Boolean tracking if the modal is open
 * @param onClose - Function to be invoked when the modal is closed
 * @param data - Data about the task that was clicked
 */
const FeedbackModal = ({ open, onClose, data }: FeedbackModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Task Breakdown">
      <View style={[styles.row, { flexDirection: "column" }]}>
        <Text style={styles.title}>
          {data?.data?.name ?? "No name provided"}
        </Text>
        <Text style={[styles.statisticValue, { color: colors.tealGreen }]}>
          {data?.data?.timestamp
            ? new Date(data.data.timestamp).toLocaleDateString(
                "en-gb",
                dateOptions
              )
            : "No date provided"}
        </Text>
      </View>
      <View style={styles.row}></View>
      <View style={styles.row}>
        <Text style={styles.statisticLabel}>Task Rating:</Text>
        <Text style={styles.statisticValue}>
          {data?.data?.rating ?? "No rating provided"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.statisticLabel}>Duration: </Text>
        <Text style={styles.statisticValue}>
          {data?.data?.duration
            ? getTimeExt(Number(data?.data?.duration))
            : "No rating provided"}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  statisticLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.tealGreen,
  },
  statisticValue: {
    fontSize: fontSize.lg,
    fontWeight: "500",
    color: colors.black,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: fontSize.h2,
    fontWeight: "500",
    color: colors.palette5,
    marginBottom: 10,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default FeedbackModal;
