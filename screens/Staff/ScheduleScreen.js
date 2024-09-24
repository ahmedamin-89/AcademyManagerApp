import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import Timeline from "react-native-timeline-flatlist";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import { UserContext } from "../../context/userContext";

const ScheduleScreen = () => {
  const { academy } = useContext(UserContext);
  const teams = academy.teams;
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamChange = (selectedTeam) => {
    const teamId = teams.find((team) => team.name === selectedTeam)?._id;

    setSelectedTeam(teamId);
  };

  const data = [
    {
      time: "Dec, 4th",
      title: "Training Session",
      description:
        "Team A - Technical Drills and Tactics Training Session 1 Hour 30 Minutes Session   ",
    },
    {
      time: "Dec, 5th",
      title: "Team Meeting",
      description: "Strategy Discussion for Upcoming Match",
    },
    {
      time: "Dec, 6th",
      title: "Friendly Match",
      description: "Team B vs. Team C",
    },
    {
      time: "Dec, 7th",
      title: "Training Session",
      description: "Team A - Fitness Training",
    },
    {
      time: "Dec, 8th",
      title: "League Match",
      description: "Team A vs. Team D",
    },
  ];
  return (
    <View style={styles.container}>
      <HorizontalSelector
        data={teams.map((team) => team.name)}
        itemStyle={{ backgroundColor: colorScheme.lightGrey }}
        onSelectionChange={(selectedTeam) => handleTeamChange(selectedTeam[0])}
      />
      <Timeline
        style={{ flex: 1, width: "100%" }}
        data={data}
        circleColor={colorScheme.green}
        lineColor={colorScheme.green}
        timeStyle={{
          color: "white",
          fontFamily: "Condensed-Light",
          fontSize: 17,
        }}
        descriptionStyle={{
          color: "white",
          fontFamily: "Condensed-Light",
          fontSize: 15,
        }}
        titleStyle={{
          color: "white",
          fontFamily: "Condensed-Black",
          fontSize: 20,
        }}
        timeContainerStyle={{ minWidth: 65 }}
      />
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
    gap: 30,
  },
});
