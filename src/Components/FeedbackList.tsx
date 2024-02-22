import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import WorkloadCard from "./WorkloadCard";
import Loading from "./Base/Loading";
import { fontSize } from "../Config/typography";
import colors from "../Config/colors";
import { useDidMount } from "../Utils/useIsMount";

const FeedbackList = ({ data }: any) => {
  const isMount = useDidMount();
  const [feedback, setFeedback] = useState<any>([]);

  useEffect(() => {
    setFeedback(data);
  }, [data]);

  if (!feedback?.length)
    return <Text>No MWL Scores to show for the selected date</Text>;

  return (
    <>
      <Text style={styles.title}>MWL ratings: </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {feedback ? (
          feedback?.map((e, idx) => <WorkloadCard data={e} key={idx} />)
        ) : (
          <Loading />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: fontSize.xl,
    marginLeft: 15,
    color: colors.black,
    fontWeight: "500",
  },
});

export default FeedbackList;
