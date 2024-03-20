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
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
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
import Button from "../Components/Base/Button";
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

  const submitData = (values: any) => {
    const minutes = duration.getMinutes() + duration.getHours() * 60;

    const data: workloadProps = {
      name: values.Name,
      rating: rating,
      duration: minutes,
      date: date ?? new Date(),
    };

    SubmitWorkload(data);

    navigation.navigate(routes.HOME_SCREEN);
  };

  return (
    <Screen>
      <SafeAreaView style={styles.headerContainer}></SafeAreaView>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={50}
          iconColor={colors.white}
          backgroundColor="transparent"
          onClick={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Submit your{"\n"}Mental Workload!</Text>
      </View>
      <View style={styles.formContainer}>
        <FormikForm
          initialValues={{
            Name: "",
            Rating: 0,
            Duration: 0,
            Date: currentDate,
          }}
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
              value={ratingOptions.find((x) => x.key === rating)?.label}
            />
          </TouchableOpacity>

          <Text style={styles.text}>Duration of the task:</Text>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={duration ?? new Date()}
              mode="time"
              onChange={(e, s) => setDuration(s ? new Date(s) : new Date())}
              locale="en_GB"
            />
            <Text style={styles.durationText}>hrs/mins</Text>
          </View>

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

          <Modal open={open} onClose={() => {}}>
            <Picker
              selectedValue={rating}
              onValueChange={(itemValue, itemIndex) => {
                setRating(itemValue);
                console.log(itemValue);
              }}
            >
              {ratingOptions.map((option, idx) => (
                <Picker.Item
                  label={option.label}
                  value={option.key}
                  key={idx}
                />
              ))}
            </Picker>
            <Button title="Confirm selection" onPress={() => setOpen(false)} />
          </Modal>

          <ValidatedButton style={styles.submitButton} title="Submit" />
        </FormikForm>
      </View>
    </Screen>
  );
};

const headerWidth = Dimensions.get("window").width * 1;
const headerHeight = Dimensions.get("window").height * 0.25;

const styles = StyleSheet.create({
  text: {
    paddingLeft: 10,
    fontSize: fontSize.lg,
    color: colors.black,
    marginTop: 10,
  },
  input: {
    marginTop: 5,
    marginBottom: 20,
  },
  pickerContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: "row",
  },
  headerContainer: {
    position: "absolute",
    height: headerHeight,
    width: headerWidth,
    backgroundColor: colors.bubbleGreen,
  },
  formContainer: {
    backgroundColor: colors.white,
    padding: 20,
    margin: 20,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    padding: 10,
  },
  headerText: {
    fontSize: fontSize.h3,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginBottom: 30,

    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  durationText: {
    alignSelf: "flex-end",
    marginLeft: 5,
    marginBottom: 5,
    color: colors.gray,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default SubmitScreen;
