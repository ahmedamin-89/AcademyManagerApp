// src/navigation/PlayerStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlayerDashboard from "../screens/Player/PlayerDashboard";
// Add other player screens as needed

const Stack = createStackNavigator();

const PlayerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PlayerDashboard" component={PlayerDashboard} />
      {/* Add other screens for Player */}
    </Stack.Navigator>
  );
};

export default PlayerStack;
