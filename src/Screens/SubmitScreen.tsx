import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import {
  SubmitWorkload,
  workloadProps,
} from "../Controllers/Workload/WriteController";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { fontSize } from "../Config/typography";
import routes from "../Config/routes";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormikForm from "../Components/Validation/FormikForm";
import { validationSchemaTaskSubmit } from "../Config/validationSchema";
import FormField from "../Components/Validation/FormField";
import ValidatedButton from "../Components/Validation/ValidatedButton";
import { resetDateTime } from "../Utils/dateHelpers";
import { Picker } from "@react-native-picker/picker";
import Modal from "../Components/Base/Modal";

interface SubmitScreenProps {
  currentDate: Date;
}

const ratingOptions = [
  { key: 1, label: "1 - Low" },
  { key: 2, label: "2 - Modest" },
  { key: 3, label: "3 - Medium" },
  { key: 4, label: "4 - Substantial" },
  { key: 5, label: "5 - High" },
];

const SubmitScreen = ({ currentDate = new Date() }: SubmitScreenProps) => {
  const navigation = useNavigation();
  const [date, setDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<Date>(resetDateTime(new Date()));
  const [rating, setRating] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  // determines how far in the past a user can submit workload
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);

  useEffect(() => {
    const minutes = duration.getMinutes() + duration.getHours() * 60;
    console.log("minutes picked", minutes);
  }, [duration]);

  useEffect(() => {
    console.log("rating is:", rating);
  }, [rating]);

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
        <TouchableOpacity onPress={() => setOpen(true)}>
          <FormField
            pointerEvents="none"
            placeholder="Rating"
            style={styles.input}
            autoCompleteType="off"
            autoCapitalize="none"
            autoCorrect={false}
            name="Rating"
          />
        </TouchableOpacity>

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
            value={date ?? new Date()}
            mode="date"
            onChange={(e, s) => setDate(s ? new Date(s) : new Date())}
            maximumDate={new Date()}
            minimumDate={minDate}
          />
        </View>

        <DateTimePicker
          value={duration ?? new Date()}
          mode="time"
          onChange={(e, s) => setDuration(s ? new Date(s) : new Date())}
          locale="en_GB"
        />

        <Modal open={open} onClose={() => setOpen(!open)}>
          <Picker
            selectedValue={rating}
            onValueChange={(itemValue, itemIndex) => setRating(itemValue)}
          >
            {ratingOptions.map((option, idx) => (
              <Picker.Item label={option.label} value={option.key} key={idx} />
            ))}
          </Picker>
        </Modal>

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
  picker: {
    //width: fieldWidth,
    backgroundColor: "red",
    // marginBottom: 15,
    // borderRadius: 15,
    // borderWidth: 0.1,
    // borderColor: colors.dark,
  },
});

export default SubmitScreen;
