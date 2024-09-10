import { StyleSheet, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import NoTrainingsView from "./NoTrainingsView";
import AddTrainingButton from "./AddTrainingButton";
import TrainingDetailCard from "../Club/TrainingDetailCard";

const TeamTrainingsList = ({ trainingDetails, teamId }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false} // Optionally hide the horizontal scroll indicator
    >
      <View style={styles.container}>
        {trainingDetails.length > 0 ? (
          trainingDetails.map((training) => (
            <TrainingDetailCard {...training} key={training._id} />
          ))
        ) : (
          <NoTrainingsView teamId={teamId} />
        )}
        <AddTrainingButton teamId={teamId} />
      </View>
    </ScrollView>
  );
};

export default TeamTrainingsList;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10, // Ensure padding on both sides for better visibility
    alignItems: "center", // Center items vertically
  },
  container: {
    flexDirection: "row",
    alignItems: "center", // Ensure items are centered vertically
    gap: 10, // Add space between items
  },
});
