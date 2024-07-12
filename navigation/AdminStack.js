// src/navigation/AdminStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from "../screens/Admin/AdminDashboard";
import PlayersScreen from "../screens/Admin/PlayersScreen";
import PlayerDetailsScreen from "../screens/Admin/PlayerDetailsScreen";
import CoachesScreen from "../screens/Admin/CoachesScreen";
import TeamsScreen from "../screens/Admin/TeamsScreen";
import FinancialsScreen from "../screens/Admin/FinancialsScreen";
import AttendanceDashboardScreen from "../screens/Admin/AttendanceDashboardScreen";
import TrainingSessionsScreen from "../screens/Admin/TrainingSessionsScreen";
import ClubScreen from "../screens/Admin/ClubScreen";
import ScheduleScreen from "../screens/Admin/ScheduleScreen";
import StaffSettings from "../screens/Admin/StaffSettings";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme.black,
        },
      }}
    >
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen
        name="Players"
        component={PlayersScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="PlayerDetails"
        component={PlayerDetailsScreen}
        options={{ headerShown: true, title: "Player Details" }}
      />
      <Stack.Screen
        name="Coaches"
        component={CoachesScreen}
        options={{ headerShown: true, title: "Coaches" }}
      />
      <Stack.Screen
        name="Teams"
        component={TeamsScreen}
        options={{ headerShown: true, title: "Teams" }}
      />
      <Stack.Screen
        name="Financials"
        component={FinancialsScreen}
        options={{ headerShown: true, title: "Financials" }}
      />
      <Stack.Screen
        name="AttendanceDashboard"
        component={AttendanceDashboardScreen}
        options={{ headerShown: true, title: "Attendance" }}
      />
      <Stack.Screen
        name="TrainingSessions"
        component={TrainingSessionsScreen}
        options={{ headerShown: true, title: "Training Sessions" }}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;
