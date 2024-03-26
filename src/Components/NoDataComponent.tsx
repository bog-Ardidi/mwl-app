import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";
import { useState } from "react";

interface NoDataProps {
  date?: string;
}

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const NoDataComponent = ({ date }: NoDataProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {date ? (
          <>
            <Text style={styles.text}>The selected date</Text>
            <Text style={styles.dateText}>
              {new Date(date).toLocaleDateString("en-gb", dateOptions)}
            </Text>
            <Text style={styles.text}>has no ratings recorded.</Text>
          </>
        ) : (
          <Text> hello fiends</Text>
        )}

        <Image
          source={require("../../assets/brain_logo-tr.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Please select a new date from the calendar!
        </Text>
        <Text style={styles.text}>
          The dates with feedback are highlighted in
          <Text style={styles.pink}> pink</Text>
        </Text>
      </View>
    </View>
  );
};

//const cardWidth = Dimensions.get("window").width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 30,
    paddingTop: 50,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,

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
  pink: {
    color: colors.hotPink,
    fontWeight: "500",
  },
});

export default NoDataComponent;
