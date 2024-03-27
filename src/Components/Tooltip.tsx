import RNTooltip from "react-native-walkthrough-tooltip";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../Config/colors";

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
