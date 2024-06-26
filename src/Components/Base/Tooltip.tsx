import RNTooltip from "react-native-walkthrough-tooltip";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../Config/colors";

interface TooltipProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: () => void;
}

/**
 * Base tooltip component. Used in the MWL balance section in the
 * Graph Statistics.
 *
 * @param children - Children to be displayed in the tooltip
 * @param open - Boolean tracking if the tooltip is open
 * @param setOpen - Function to open and close the tooltip
 */
const Tooltip = ({ children, open, setOpen }: any) => {
  return (
    <RNTooltip
      isVisible={open}
      content={children}
      placement="top"
      onClose={() => setOpen(false)}
    >
      <TouchableOpacity onPress={() => setOpen(true)}>
        <MaterialCommunityIcons
          name={"information-outline"}
          color={colors.black}
          size={15}
        />
      </TouchableOpacity>
    </RNTooltip>
  );
};

export default Tooltip;
