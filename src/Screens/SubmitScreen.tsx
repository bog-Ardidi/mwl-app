import Screen from "../Components/Base/Screen";
import Icon from "../Components/Base/Icon";
import colors from "../Config/colors";
import { useNavigation } from "@react-navigation/native";
import {
  SubmitWorkload,
  workloadProps,
} from "../Controllers/Workload/WriteController";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { fontSize } from "../Config/typography";
import routes from "../Config/routes";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormikForm from "../Components/Validation/FormikForm";
import { validationSchemaTaskSubmit } from "../Config/validationSchema";
import FormField from "../Components/Validation/FormField";
import ValidatedButton from "../Components/Validation/ValidatedButton";
import { resetDateTime } from "../Utils/dateHelpers";
import DropDownPicker from "react-native-dropdown-picker";
import { Header, StatusBar } from "../Components/Base/Header";

const SubmitScreen = ({ currentDate = new Date() }) => {
  const navigation = useNavigation<any>();
  const [date, setDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<Date>(resetDateTime(new Date()));
  // labels in the rating select dropdown
  const [items, setItems] = useState([
    { label: "1 - Low", value: "1" },
    { label: "2 - Modest", value: "2" },
    { label: "3 - Medium", value: "3" },
    { label: "4 - Substantial", value: "4" },
    { label: "5 - High", value: "5" },
  ]);
  const [rating, setRating] = useState(items[0].value);
  const [openPicker, setOpenPicker] = useState(false);

  // determines how far in the past a user can submit workload
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);

  // submits the data to Firebase and returns you to the Calendar
  const submitData = (values: any) => {
    const minutes = duration.getMinutes() + duration.getHours() * 60;

    const data: workloadProps = {
      name: values.Name,
      rating: Number(rating),
      duration: minutes,
      date: date ?? new Date(),
    };

    SubmitWorkload(data);

    navigation.navigate(routes.HOME_SCREEN);
  };

  return (
    <>
      <StatusBar color={colors.mustard} />
      <Screen>
        <Header color={colors.mustard} height={0.25} />
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={50}
            iconStyle={styles.shadow}
            iconColor={colors.white}
            backgroundColor="transparent"
            onClick={() => navigation.goBack()}
          />
          <Text style={[styles.headerText, styles.shadow]}>
            Submit your{"\n"}Mental Workload!
          </Text>
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
            <View style={styles.input}>
              <FormField
                placeholder="Name"
                autoCapitalize="none"
                autoCorrect={false}
                name="Name"
              />
            </View>
            <Text style={styles.text}>Mental Workload Rating:</Text>
            <DropDownPicker
              open={openPicker}
              value={rating}
              items={items}
              setOpen={setOpenPicker}
              setValue={setRating}
              setItems={setItems}
              style={styles.ratingSelect}
              theme="LIGHT"
              dropDownContainerStyle={styles.dropdown}
            />

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

            <ValidatedButton style={styles.submitButton} title="Submit" />
          </FormikForm>
        </View>
      </Screen>
    </>
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
    marginBottom: 20,
  },
  pickerContainer: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 20,
    flexDirection: "row",
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
    paddingTop: 0,
  },
  headerText: {
    fontSize: fontSize.h3,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginBottom: 30,
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
  ratingSelect: {
    borderWidth: 0.5,
    borderColor: colors.grayBorder,
    borderRadius: 0,
    padding: 0,
    minHeight: 40,
    width: "95%",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 0.5,
    borderColor: colors.grayBorder,
    marginLeft: 10,
    width: "95%",
  },
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default SubmitScreen;
