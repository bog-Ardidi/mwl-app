import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Base/Button";
import {
  SubmitWorkload,
  workloadProps,
} from "../Controllers/Workload/WriteController";
import IconTextInput from "../Components/Base/IconTextInput";
import { useState } from "react";

const SubmitScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<workloadProps>({
    name: "",
    rating: 0,
    duration: "",
  });

  const submitData = () => {
    SubmitWorkload(data);
  };

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <IconTextInput
        placeholder="Name"
        value={data?.name}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={(text: string) =>
          setData((pre) => ({ ...pre, name: text }))
        }
      />
      <IconTextInput
        placeholder="Rating"
        value={data?.rating}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={(text: number) =>
          setData((pre) => ({ ...pre, rating: text }))
        }
      />
      <IconTextInput
        placeholder="Duration"
        value={data?.duration}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={(text: string) =>
          setData((pre) => ({ ...pre, duration: text }))
        }
      />
      <Button title="submit" onPress={() => submitData()} />
    </Screen>
  );
};

export default SubmitScreen;
