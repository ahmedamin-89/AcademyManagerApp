import { View, Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";

const SettingsCard = ({ title, onPress }) => {
  return (
    <View style={[styles.card, styles.elevationShadow]}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.innerCard, styles.pressed] : styles.innerCard
        }
        onPress={onPress}
      >
        <Text style={styles.cardText}>{title}</Text>

        <View style={styles.circleContainer}>
          <AntDesign name={`${"right"}circle`} size={28} color="#dee2e6" />
        </View>
      </Pressable>
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorScheme.white,
    borderRadius: 9,
    width: "100%",
  },
  elevationShadow: {
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.085,
    elevation: 2,
    shadowRadius: 2,
  },
  innerCard: {
    backgroundColor: colorScheme.grey,
    padding: 23,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 21,
    fontWeight: "500",
    color: "white",
    fontFamily: "Condensed-Light",
  },
  circleContainer: {
    borderColor: "#dee2e6",
    alignItems: "center",
    borderRadius: 28,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.99,
  },
});
