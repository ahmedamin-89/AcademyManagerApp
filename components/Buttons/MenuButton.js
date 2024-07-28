import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";

const MenuButton = ({ onPress, color, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        { marginRight: 10 },
        style,
        pressed && { opacity: 0.6 },
      ]}
      onPress={onPress}
    >
      <Ionicons name={"menu"} size={28} color={color || colorScheme.green} />
    </Pressable>
  );
};

export default MenuButton;
