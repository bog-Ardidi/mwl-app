import colors from "../../Config/colors";
import { Text, StyleSheet } from "react-native";
import { fontSize } from "../../Config/typography";
import { useEffect, useState } from "react";
import { MWL } from "../../Utils/workloadHelper";

const mwlMessages = [
  "The current selection does not contain sufficent data to calculate a mental workload score. Please try adding some more tasks!",
  "You have had a balanced amount of low, medium and high Mental workload today. Keep up with the good work!",
];

const mwlBadMessage = (values: number[]) => (
  <>
    You have had long periods of <Text style={styles.red}>{values[0]}</Text>{" "}
    mental workload today. You should perform some{" "}
    <Text style={styles.green}>{values[1]}</Text> and{" "}
    <Text style={styles.green}>{values[2]}</Text> mental workload tasks to
    balance it!
  </>
);

export const mwlLabels = ["Unsure", "Good", "Bad"];

export const mwlLabelStyle = [
  { color: colors.yellow },
  { color: colors.bubbleGreen },
  { color: colors.primaryRed },
];

const badMWL = ["low", "medium", "high"];
const getFirst = (data, first) =>
  data.sort(function (x, y) {
    return x == first ? -1 : y == first ? 1 : 0;
  });

const calculateOrder = (mwl: MWL) => {
  switch (mwl) {
    case MWL.BAD_LOW:
      return badMWL;

    case MWL.BAD_MID:
      return getFirst(badMWL, "medium");

    case MWL.BAD_HIGH:
      return getFirst(badMWL, "high");
  }
};

const MWLmessage = ({ mwl }: any) => {
  if (mwl < 3)
    return <Text style={styles.tooltipText}>{mwlMessages[mwl]}</Text>;

  const order = calculateOrder(mwl);

  return <Text style={styles.tooltipText}>{mwlBadMessage(order)}</Text>;
};

const styles = StyleSheet.create({
  tooltipText: {
    fontWeight: "500",
    fontSize: fontSize.md,
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
});

export default MWLmessage;
