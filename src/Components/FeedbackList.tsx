import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../Config/colors";
import { useEffect, useState } from "react";

const FeedbackList = ({ data }: any) => {
  const [feedback, setFeedback] = useState<any>([]);

  useEffect(() => {
    setFeedback(data);
  }, [data]);

  return (
    <ScrollView>
      {feedback ? (
        feedback?.map((e, idx) => (
          <View style={styles.scores} key={idx}>
            <Text>Task name: {e.name ?? "No name provided"}</Text>
            <Text>Rating: {e.rating ?? "No rating provided"}</Text>
            <Text>Duration: {e.duration ?? "No rating provided"}</Text>
            <Text>
              {" "}
              Date:{" "}
              {e.timestamp.seconds
                ? e.timestamp.toDate().toString()
                : "No date provided"}
            </Text>
          </View>
        ))
      ) : (
        <Text>Loading</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scores: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    margin: 10,
  },
});

export default FeedbackList;
