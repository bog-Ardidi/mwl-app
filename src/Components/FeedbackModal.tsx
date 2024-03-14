import colors from "../Config/colors";
import { fontSize } from "../Config/typography";
import Modal from "./Base/Modal";
import WorkloadCard from "./WorkloadCard";

interface FeedbackModalProps {
  open: boolean;
  onClose: any;
  data: any;
}

const FeedbackModal = ({ open, onClose, data }: FeedbackModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Task Breakdown">
      <WorkloadCard data={data} />
    </Modal>
  );
};

export default FeedbackModal;
