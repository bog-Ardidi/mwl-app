import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { firebaseGetMWLAll } from "../Controllers/Workload/ReadController";
import FeedbackList from "../Components/FeedbackList";
import { getAllWorkloadForUser } from "../Utils/workloadHelper";

const ScoresScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getAllWorkloadForUser(setData);
  }, []);

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <FeedbackList data={data} showDelete />
    </Screen>
  );
};

export default ScoresScreen;
