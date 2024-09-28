import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import backendURL from "../constants/backendURL";

export const UserContext = createContext({
  user: {
    id: "",
    name: "",
    phoneNumber: "",
    role: "",
  },
  token: "",
  academy: {
    id: "",
    name: "Academy Name",
    playersCount: 0,
    logoURL: "",
    staffCount: 0,
    teams: [],
    yearsOfBirth: [],
    fees: 0,
  },
  loading: true,
  setUser: () => {},
  setToken: () => {},
  login: async () => {},
  logout: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    role: "",
  });

  const [academy, setAcademy] = useState({
    id: "",
    name: "Academy Name",
    playersCount: 0,
    logoURL: "",
    staffCount: 0,
    teams: [],
    yearsOfBirth: [],
    fees: 0,
  });

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          setToken(storedToken);
          await fetchUserData(storedToken);
        }
      } catch (error) {
        console.error("Failed to load auth token:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const login = async (userDetails) => {
    try {
      const response = await axios.post(
        `${backendURL}/users/login`,
        userDetails
      );
      const receivedToken = response.data.token;
      await AsyncStorage.setItem("authToken", receivedToken);

      setToken(receivedToken);
      await fetchUserData(receivedToken);
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setToken("");
    setUser({ id: "", name: "", phoneNumber: "", role: "" });
    setAcademy({
      id: "",
      name: "Academy Name",
      playersCount: 0,
      logoURL: "",
      staffCount: 0,
      teams: [],
      yearsOfBirth: [],
      fees: 0,
    });
  };

  const fetchUserData = async (authToken) => {
    try {
      const response = await axios.get(`${backendURL}/users/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data.user);
      setAcademy(response.data.academy);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        academy,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
