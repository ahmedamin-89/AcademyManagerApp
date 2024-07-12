// src/navigation/CoachStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CoachDashboard from "../screens/Coach/CoachDashboard";
// Add other coach screens as needed

const Stack = createStackNavigator();

const CoachStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CoachDashboard" component={CoachDashboard} />
      {/* Add other screens for Coach */}
    </Stack.Navigator>
  );
};

export default CoachStack;
