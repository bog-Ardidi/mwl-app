import colors from "../../Config/colors";
import { Text, StyleSheet } from "react-native";
import { fontSize } from "../../Config/typography";
import { MWL } from "../../Utils/workloadHelper";

interface MWLmessageProps {
  mwl: MWL;
}

/**
 * MWL messages for Good and Unsure balance
 */
const mwlMessages = [
  "The current selection does not contain sufficent data to calculate a mental workload score. Please try adding some more tasks!",
  "You have had a balanced amount of low, medium and high Mental workload today. Keep up with the good work!",
];

/**
 * MWL messages for Bad balance
 */
const mwlBadMessage = (values: string[]) => (
  <>
    You have had long periods of <Text style={styles.red}>{values[0]}</Text>{" "}
    mental workload today. You should perform some{" "}
    <Text style={styles.green}>{values[1]}</Text> and{" "}
    <Text style={styles.green}>{values[2]}</Text> mental workload tasks to
    balance it!
  </>
);

export const mwlLabels = ["Unsure", "Good", "Bad"];
const badMWL = ["low", "medium", "high"];

export const mwlLabelStyle = [
  { color: colors.yellow },
  { color: colors.bubbleGreen },
  { color: colors.primaryRed },
];

/**
 * Returns an array of sorted MWL levels to help the calculateOrder function.
 *
 * @param data - All mwl options
 * @param first - The option that needs to be put first
 */
const getFirst = (data: string[], first: string) =>
  data.sort(function (x, y) {
    return x == first ? -1 : y == first ? 1 : 0;
  });

/**
 * Calculates the order of balances that need to be displayed in the suggestion
 * that is shown on the MWL balance tooltip. This is only invoked if the MWL balance
 * is bad and a suggestion needs to be generated.
 *
 * @param mwl - The MWL score
 */
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

const MWLmessage = ({ mwl }: MWLmessageProps) => {
  if (mwl < 3)
    return <Text style={styles.tooltipText}>{mwlMessages[mwl]}</Text>;

  const order = calculateOrder(mwl);

  return <Text style={styles.tooltipText}>{mwlBadMessage(order!)}</Text>;
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
