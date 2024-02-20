import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getAllWorkloadForUser } from "../Controllers/Workload/ReadController";
import FeedbackList from "../Components/FeedbackList";

const ScoresScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllWorkloadForUser();
      setData(
        res?.docs?.map((e: any) => ({
          docId: e.id,
          data: e.data(),
        }))
      );
    }
    fetchData();
  }, []);

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <FeedbackList data={data} />
    </Screen>
  );
};

export default ScoresScreen;
