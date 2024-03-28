import { Text } from "react-native";
import Modal from "../Base/Modal";

const TutorialModal = ({ open, onClose }: any) => {
  return (
    <Modal open={open} onClose={onClose} title="Tutorial">
      <Text>This is a tutorial, I promise</Text>
    </Modal>
  );
};

export default TutorialModal;
