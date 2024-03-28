import { Text, View, StyleSheet, Image } from "react-native";
import Modal from "../Base/Modal";
import Swiper from "react-native-swiper";
import colors from "../../Config/colors";
import {
  SwiperScreen,
  RegularText,
  SwiperTitle,
  SwiperIcon,
} from "./SwiperComponents";
import { swiperData } from "./swiperData";
import Icon from "../Base/Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import bubbleColors from "../../Config/bubbleColors";

const TutorialModal = ({ open, onClose }: any) => {
  return (
    <Modal open={open} onClose={onClose} title="Tutorial" outsideClose={false}>
      <Swiper loop={false} paginationStyle={{ bottom: 0 }}>
        {/* Screen 1 - Welcome */}
        <SwiperScreen>
          <SwiperTitle>{swiperData[0].title}</SwiperTitle>
          <RegularText>{swiperData[0].text_1}</RegularText>
          <Image
            source={require("../../../assets/brain_logo-tr.png")}
            style={styles.image}
          />
          <RegularText style={{ marginTop: 20 }}>
            {swiperData[0].text_2}
          </RegularText>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <RegularText style={{ alignSelf: "center", marginBottom: 10 }}>
              {swiperData[0].text_3}
            </RegularText>
            <SwiperIcon title={"gesture-swipe-right"} />
          </View>
        </SwiperScreen>

        {/* Screen 2 - The Calendar*/}
        <SwiperScreen>
          <SwiperTitle>{swiperData[1].title}</SwiperTitle>
          <RegularText>{swiperData[1].text_1}</RegularText>
          <Image
            source={require("../../../assets/calendar_pic.png")}
            style={[styles.image, styles.calendarImg]}
          />
          <RegularText>
            {swiperData[1].text_2}
            <Text style={styles.pink}> pink</Text>.
          </RegularText>
          <RegularText style={{ marginTop: 40 }}>
            {swiperData[1].text_3}
          </RegularText>
          <SwiperIcon
            title={"plus-circle-outline"}
            size={60}
            color={colors.gray}
          />
        </SwiperScreen>

        {/* Screen 3 - The Chart */}
        <SwiperScreen>
          <SwiperTitle>{swiperData[2].title}</SwiperTitle>
          <RegularText>{swiperData[2].text_1}</RegularText>
          <Image
            source={require("../../../assets/chart_pic.png")}
            style={[styles.image, styles.calendarImg]}
          />
          <RegularText>{swiperData[2].text_2}</RegularText>
          <RegularText style={{ marginTop: 20 }}>
            {swiperData[2].text_3}
          </RegularText>
          <Image
            source={require("../../../assets/mwlbalance_pic.png")}
            style={[styles.image, styles.balanceImg]}
          />
        </SwiperScreen>

        {/* Screen 4 - Analyse the data*/}
        <SwiperScreen>
          <SwiperTitle>{swiperData[3].title}</SwiperTitle>
          <RegularText>{swiperData[3].text_1}</RegularText>
          <SwiperIcon title={"gesture-tap-hold"} color={colors.gray} />
          <RegularText style={{ marginTop: 40, marginBottom: 20 }}>
            {swiperData[3].text_2}
          </RegularText>
          <SwiperIcon title={"select-compare"} color={colors.gray} size={60} />
          <RegularText style={{ marginTop: 40 }}>
            {swiperData[3].text_3}
          </RegularText>
          <View style={styles.paletteContainer}>
            {bubbleColors.map((e) => (
              <View style={[styles.paletteColor, { backgroundColor: e }]} />
            ))}
          </View>
        </SwiperScreen>
      </Swiper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  calendarImg: {
    borderWidth: 1,
    borderColor: colors.gray100,
    marginTop: 20,
    marginBottom: 20,
    width: 110,
  },
  pink: {
    color: colors.hotPink,
    fontWeight: "500",
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  balanceImg: {
    width: "100%",
    height: 60,
    resizeMode: "contain",
  },
  paletteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paletteColor: {
    width: 30,
    height: 30,
  },
});

export default TutorialModal;
