import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import NoTrainingsView from "./NoTrainingsView";
import AddTrainingButton from "./AddTrainingButton";
import TrainingDetailCard from "../Club/TrainingDetailCard";

const TeamTrainingsList = ({ trainingDetails, teamId }) => {
  return (
    <FlatList
      data={trainingDetails}
      ListEmptyComponent={<NoTrainingsView teamId={teamId} />}
      ListFooterComponent={<AddTrainingButton teamId={teamId} />}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TrainingDetailCard {...item} />}
      contentContainerStyle={{
        paddingVertical: 10,
        paddingHorizontal: 10, // Use paddingHorizontal instead of paddingRight to balance padding on both sides
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ flexGrow: 0 }}
    />
  );
};

export default TeamTrainingsList;

const styles = StyleSheet.create({});
