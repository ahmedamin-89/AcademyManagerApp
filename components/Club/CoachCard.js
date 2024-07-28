import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Picture from "../UI/Picture";
import colorScheme from "../../constants/colorScheme";
import { UserContext } from "../../context/userContext";
import MenuButton from "../Buttons/MenuButton";

const CoachCard = ({ name, phoneNumber, teams = [] }) => {
  const { academy } = useContext(UserContext);
  const teamNames = teams.map(
    (team) => academy.teams.find((t) => t._id === team).name
  );
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Picture scale={0.625} allowEditing={false} />
      </View>
      <View style={styles.info}>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Name</Text>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Phone Number</Text>
          <Text style={styles.title}>{phoneNumber}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.subTitle}>Teams</Text>
          <View style={styles.teams}>
            {teamNames.map((team) => (
              <View style={styles.team} key={team}>
                <Text style={styles.teamName}>{team}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <MenuButton style={styles.menuButton} color={colorScheme.grey} />
    </View>
  );
};

export default CoachCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 188,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    overflow: "visible",
  },
  image: {
    paddingRight: 15,
  },
  info: {
    flex: 1,
    height: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    gap: 1,
  },
  title: {
    color: colorScheme.black,
    fontSize: 20,
    fontFamily: "Condensed-Black",
  },
  subTitle: {
    color: colorScheme.grey,
    fontSize: 16,
    fontFamily: "Condensed-Light",
  },
  teams: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  team: {
    backgroundColor: colorScheme.lightGrey,
    padding: 4,
    borderRadius: 5,
    margin: 2,
  },
  teamName: {
    color: colorScheme.black,
    fontFamily: "Condensed-Light",
    fontSize: 16,
  },
  menuButton: {
    position: "absolute",
    right: 4,
    top: 11,
  },
});
