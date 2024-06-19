import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";

const BackButton = ({ color }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Pressable
      style={({ pressed }) => [pressed && { opacity: 0.6 }, { marginLeft: 5 }]}
      onPress={handlePress}
    >
      <Ionicons name={"chevron-back"} size={28} color={colorScheme.green} />
    </Pressable>
  );
};

export default BackButton;
