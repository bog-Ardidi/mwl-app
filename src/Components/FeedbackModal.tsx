import { Modal, Text, Dimensions, StyleSheet, View } from "react-native";
import Icon from "./Base/Icon";
import colors from "../Config/colors";
import { fontSize } from "../Config/typography";

interface FeedbackModalProps {
  open: boolean;
  onClose: any;
  data: any;
}

const FeedbackModal = ({ open, onClose, data }: FeedbackModalProps) => {
  return (
    <Modal
      animationType="fade"
      visible={open}
      transparent={true}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Task Breakdown</Text>
              <Icon name="close" size={35} onClick={onClose} />
            </View>

            <View style={styles.divider} />

            {/* bottom part container view - the main text */}
            <Text style={styles.text}>Hello friends</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// these variables hold the size of the modal
// if you want to change the size just change the multiplication number (percantages)
const modal_width = Dimensions.get("window").width * 0.8;
const modal_height = Dimensions.get("window").height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: modal_width,
    height: modal_height,
  },
  title: {
    fontWeight: "bold",
    fontSize: fontSize.xl,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.black,
    marginTop: 8,
    marginBottom: 28,
  },
  text: {
    fontSize: fontSize.lg,
  },
});

export default FeedbackModal;
