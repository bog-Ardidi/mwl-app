import {
  Modal as RNModal,
  Text,
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "./Icon";
import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";

interface ModalProps {
  open: boolean;
  onClose: any;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <RNModal animationType="slide" visible={open} transparent={true}>
      <TouchableWithoutFeedback onPressOut={onClose}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            {title && (
              <>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{title}</Text>
                  <Icon name="close" size={35} onClick={onClose} />
                </View>
                <View style={styles.divider} />
              </>
            )}
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

// these variables hold the size of the modal
// if you want to change the size just change the multiplication number (percantages)
const modal_width = Dimensions.get("window").width * 0.8;
const modal_height = Dimensions.get("window").height * 0.6;

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

export default Modal;
