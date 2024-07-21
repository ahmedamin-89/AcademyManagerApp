import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";

const MenuButton = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.6 },
        { marginRight: 10 },
      ]}
      onPress={onPress}
    >
      <Ionicons name={"menu"} size={28} color={colorScheme.green} />
    </Pressable>
  );
};

export default MenuButton;
