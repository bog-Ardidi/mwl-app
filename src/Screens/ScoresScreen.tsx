import Screen from "../Components/Screen";
import Icon from "../Components/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getWorkloadForToday } from "../Controllers/WorkloadController";
import { Text, View, StyleSheet } from "react-native";

const ScoresScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getWorkloadForToday();
      setData(res?.docs?.map((e: any) => e.data()));
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
      {data !== null ? (
        data.map((e, idx) => (
          <View style={styles.scores} key={idx}>
            <Text>Task name: {e.name ?? "No name provided"}</Text>
            <Text>Rating: {e.rating ?? "No rating provided"}</Text>
            <Text>Duration: {e.duration ?? "No rating provided"}</Text>
            <Text>Date: {e.timestamp.seconds ?? "No date provided"}</Text>
          </View>
        ))
      ) : (
        <Text>Loading</Text>
      )}
    </Screen>
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

export default ScoresScreen;
