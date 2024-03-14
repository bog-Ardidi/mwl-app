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
import DateTimePicker from "@react-native-community/datetimepicker";
import FormikForm from "../Components/Validation/FormikForm";
import { validationSchemaTaskSubmit } from "../Config/validationSchema";
import FormField from "../Components/Validation/FormField";
import ValidatedButton from "../Components/Validation/ValidatedButton";

interface SubmitScreenProps {
  currentDate: Date;
}

const SubmitScreen = ({ currentDate = new Date() }: SubmitScreenProps) => {
  const navigation = useNavigation();
  const [date, setDate] = useState<Date>();

  // determines how far in the past a user can submit workload
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);

  const submitData = (values: any) => {
    const data: workloadProps = {
      name: values.Name,
      rating: values.Rating,
      duration: values.Duration,
      date: date ?? new Date(),
    };

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
      <FormikForm
        initialValues={{ Name: "", Rating: 0, Duration: 0, Date: currentDate }}
        // send user credentials to database
        onSubmit={(values: workloadProps) => submitData(values)}
        validationSchema={validationSchemaTaskSubmit}
      >
        <Text style={styles.text}>Task name:</Text>
        <FormField
          placeholder="Name"
          style={styles.input}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          name="Name"
        />
        <Text style={styles.text}>Mental Workload Rating:</Text>
        <FormField
          placeholder="Rating"
          style={styles.input}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          name="Rating"
        />
        <Text style={styles.text}>Duration of the task:</Text>
        <FormField
          placeholder="Duration"
          style={styles.input}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          name="Duration"
        />

        <Text style={styles.text}>Date of the task:</Text>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={currentDate}
            mode="date"
            onChange={(e, s) => setDate(s ? new Date(s) : new Date())}
            maximumDate={new Date()}
            minimumDate={minDate}
          />
        </View>

        <ValidatedButton title="Submit" />
      </FormikForm>
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
