import { StyleSheet, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import NoTrainingsView from "./NoTrainingsView";
import AddTrainingButton from "./AddTrainingButton";
import TrainingDetailCard from "../Club/TrainingDetailCard";

const TeamTrainingsList = ({ trainingDetails, teamId }) => {
  return (
    <View style={styles.wrapper}>
      {trainingDetails.length > 0 ? (
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            {trainingDetails.map((training) => (
              <TrainingDetailCard {...training} key={training._id} />
            ))}
            <AddTrainingButton teamId={teamId} />
          </View>
        </ScrollView>
      ) : (
        <NoTrainingsView teamId={teamId} />
      )}
    </View>
  );
};

export default TeamTrainingsList;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
