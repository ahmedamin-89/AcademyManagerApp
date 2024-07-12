// src/navigation/ParentStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ParentDashboard from "../screens/Parent/ParentDashboard";
// Add other parent screens as needed

const Stack = createStackNavigator();

const ParentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
      {/* Add other screens for Parent */}
    </Stack.Navigator>
  );
};

export default ParentStack;
