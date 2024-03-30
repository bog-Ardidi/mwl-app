import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import WorkloadCard from "./WorkloadCard";
import Loading from "../Base/Loading";
import { fontSize } from "../../Config/typography";

/**
 *  Overview of all tasts that have been submitted for the logged account.
 *  Allows for deleting specific taskts.
 *
 * @param data - Data to be displayed in the list.
 * @param showDelete - Shows and hides the delete button on a single instance.
 */
const FeedbackList = ({ data, showDelete = false }: any) => {
  const [feedback, setFeedback] = useState<any>([]);

  useEffect(() => {
    setFeedback(data);
  }, [data]);

  const removeItem = (elem) => {
    setFeedback(feedback.filter((o) => o.docId !== elem));
  };

  if (!feedback?.length)
    return <Text style={styles.text}>No MWL Scores to show</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {feedback ? (
        feedback?.map((e, idx) => (
          <WorkloadCard
            data={e}
            key={idx}
            showDelete={showDelete}
            removeItem={removeItem}
          />
        ))
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  text: {
    textAlign: "center",
    fontSize: fontSize.lg,
  },
});

export default FeedbackList;
