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
import { Text, StyleSheet, View } from "react-native";
import { fontSize } from "../Config/typography";
import routes from "../Config/routes";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface SubmitScreenProps {
  currentDate: Date;
}

const SubmitScreen = ({ currentDate = new Date() }: SubmitScreenProps) => {
  const navigation = useNavigation();
  const [data, setData] = useState<workloadProps>({
    name: "",
    rating: 0,
    duration: "",
    date: currentDate,
  });

  // determines how far in the past a user can submit workload
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);

  const onChange = (event: DateTimePickerEvent, date = new Date()) => {
    const currentDate = date;
    setData((pre) => ({ ...pre, date: new Date(date) }));
    console.log(currentDate);
  };

  const submitData = () => {
    SubmitWorkload(data);

    navigation.navigate(routes.HOME_SCREEN);
  };

  return (
    <Screen>
      <Icon
        name="arrow-left"
        iconColor={colors.black}
        backgroundColor="transparent"
        onClick={() => navigation.goBack()}
      />
      <Text style={styles.text}>Task name:</Text>
      <IconTextInput
        placeholder="Name"
        style={styles.input}
        value={data?.name}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={(text: string) =>
          setData((pre) => ({ ...pre, name: text }))
        }
      />
      <Text style={styles.text}>Mental Workload Rating:</Text>
      <IconTextInput
        placeholder="Rating"
        style={styles.input}
        value={data?.rating}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={(text: number) =>
          setData((pre) => ({ ...pre, rating: text }))
        }
      />
      <Text style={styles.text}>Duration of the task:</Text>
      <IconTextInput
        placeholder="Duration"
        style={styles.input}
        value={data?.duration}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={(text: string) =>
          setData((pre) => ({ ...pre, duration: text }))
        }
      />

      <Text style={styles.text}>Date of the task:</Text>
      <View style={styles.pickerContainer}>
        <DateTimePicker
          value={data?.date}
          mode="date"
          onChange={(e, s) => onChange(e, s)}
          maximumDate={new Date()}
          minimumDate={minDate}
        />
      </View>

      <Button title="submit" onPress={() => submitData()} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingLeft: 10,
    fontSize: fontSize.lg,
    color: colors.black,
    marginTop: 10,
  },
  input: {
    marginTop: 5,
  },
  pickerContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
  },
});

export default SubmitScreen;
