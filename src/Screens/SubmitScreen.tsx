import Screen from "../Components/Screen";
import Icon from "../Components/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";

const SubmitScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
    </Screen>
  );
};

export default SubmitScreen;
