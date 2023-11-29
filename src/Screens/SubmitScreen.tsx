import Screen from "../Components/Screen";
import Icon from "../Components/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";
import { SubmitWorkload } from "../Controllers/WorkloadController";

const SubmitScreen = () => {
  const navigation = useNavigation();

  const submitData = () => {
    const data = {
      rating: 5,
      duration: "1.36",
    };
    SubmitWorkload(data);
    console.log("submitted");
  };

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <Button title="submit" onPress={() => submitData()} />
    </Screen>
  );
};

export default SubmitScreen;
