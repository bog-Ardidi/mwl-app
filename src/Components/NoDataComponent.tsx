import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";

const NoDataComponent = ({ date }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>The selected date</Text>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.text}>has no ratings recorded.</Text>
        <Image
          source={require("../../assets/brain_logo-tr.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Please select a new date from the calendar!
        </Text>
        <Text style={styles.text}>
          The dates with feedback are highlighted in
          <Text style={{ color: "pink" }}> pink</Text>
        </Text>
      </View>
    </View>
  );
};

const cardWidth = Dimensions.get("window").width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: 10,
    width: cardWidth,

    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    color: colors.tealGreen,
    alignSelf: "center",
    fontSize: fontSize.lg,
    textAlign: "center",
  },
  dateText: {
    fontSize: fontSize.lg,
    color: colors.primaryRed,
    textAlign: "center",
    fontWeight: "500",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default NoDataComponent;
