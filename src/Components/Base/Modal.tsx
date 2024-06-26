import {
  Modal as RNModal,
  Text,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import Icon from "./Icon";
import colors from "../../Config/colors";
import { fontSize } from "../../Config/typography";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/**
 * Base modal component. Pops up over the current screen.
 * @param open - Boolean tracking if the modal is open
 * @param onClose - Function to be invoked when the modal is closed
 * @param title - Title on the header of the modal
 * @param children - Children to be displayed in the modal
 */
const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <RNModal animationType="slide" visible={open} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          {title && (
            <>
              <View style={styles.titleContainer}>
                <Text style={[styles.title, styles.shadow]}>{title}</Text>
                <Icon
                  name="close"
                  size={35}
                  iconStyle={styles.shadow}
                  onClick={onClose}
                />
              </View>
              <View style={styles.divider} />
            </>
          )}
          {children}
        </View>
      </View>
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
  shadow: {
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Modal;
