import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import FeedbackList from "../Components/Settings/FeedbackList";
import { getAllWorkloadForUser } from "../Utils/workloadHelper";
import { Text, StyleSheet, View } from "react-native";
import { fontSize } from "../Config/typography";

const ScoresScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getAllWorkloadForUser(setData);
  }, []);

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          iconColor={colors.black}
          backgroundColor="transparent"
          onClick={() => navigation.goBack()}
        />
        <Text style={styles.title}>All MWL ratings: </Text>
      </View>
      <FeedbackList data={data} showDelete />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    marginLeft: 15,
    color: colors.black,
    fontWeight: "500",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ScoresScreen;
