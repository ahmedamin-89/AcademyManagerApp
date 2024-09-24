// src/navigation/AdminStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlayersScreen from "../screens/Staff/PlayersScreen";
import PlayerDetailsScreen from "../screens/PlayerDetailsScreen";
import CoachesScreen from "../screens/Staff/CoachesScreen";
import TeamsScreen from "../screens/Staff/TeamsScreen";
import FinancialsScreen from "../screens/Staff/FinancialsScreen";
import AttendanceDashboardScreen from "../screens/Staff/AttendanceDashboardScreen";
import TrainingSessionsScreen from "../screens/Staff/TrainingSessionsScreen";
import TabNavigator from "./TabNavigator";
import BackButton from "../components/Buttons/BackButton";
import colorScheme from "../constants/colorScheme";
import TeamOverviewScreen from "../screens/Staff/TeamOverviewScreen";
import PlayersStatistics from "../screens/Staff/PlayersStatistics";
import AddTrainingScreen from "../screens/Staff/AddTrainingScreen";
import AddPaymentScreen from "../screens/Staff/AddPaymentScreen";
import TakeAttendanceScreen from "../screens/Staff/TakeAttendanceScreen";
import TeamAttendanceLeaderboardScreen from "../screens/Staff/TeamAttendanceLeaderboardScreen";

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme.black,
        },
        headerLeft: () => <BackButton />,
        headerStyle: {
          backgroundColor: colorScheme.black,
          borderBottomColor: "transparent",
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colorScheme.white,
        headerTitleStyle: {
          fontFamily: "Condensed-Black",
        },
      }}
      sceneContainerStyle={{
        backgroundColor: colorScheme.black,
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
      <Stack.Screen
        name="TeamOverview"
        component={TeamOverviewScreen}
        options={{ headerShown: true, title: "Team Overview" }}
      />
      <Stack.Screen
        name="PlayersStatistics"
        component={PlayersStatistics}
        options={{ headerShown: true, title: "Players Statistics" }}
      />
      <Stack.Screen
        name="AddTraining"
        component={AddTrainingScreen}
        options={{ headerShown: true, title: "Add Training" }}
      />
      <Stack.Screen
        name="AddPayment"
        component={AddPaymentScreen}
        options={{ headerShown: true, title: "Add Payment" }}
      />
      <Stack.Screen
        name="TakeAttendance"
        component={TakeAttendanceScreen}
        options={{ headerShown: true, title: "Take Attendance" }}
      />
      <Stack.Screen
        name="TeamAttendanceLeaderboard"
        component={TeamAttendanceLeaderboardScreen}
        options={{ headerShown: true, title: "Attendance Leaderboard" }}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;
