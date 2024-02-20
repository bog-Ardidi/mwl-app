import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import WorkloadCard from "./WorkloadCard";
import Loading from "./Base/Loading";

const FeedbackList = ({ data }: any) => {
  const [feedback, setFeedback] = useState<any>([]);

  useEffect(() => {
    setFeedback(data);
  }, [data]);

  return (
    <ScrollView contentContainerStyle={style.container}>
      {feedback ? (
        feedback?.map((e, idx) => <WorkloadCard data={e} key={idx} />)
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default FeedbackList;
