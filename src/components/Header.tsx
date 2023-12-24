import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useReduxDispatch, useReduxSelector } from "../redux/store";
import { switchDarkMode } from "../redux/generalSlice";

const Header: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const darkMode = useReduxSelector(state => state.darkMode);
  const dispatch = useReduxDispatch();

  const toggleDarkMode = () => {
    dispatch(switchDarkMode());
    setIsEnabled(!isEnabled);
  };

  return (
    <View
      style={[
        { backgroundColor: darkMode ? "#333333" : "white" },
        styles.header,
      ]}
    >
      <View style={styles.switch}>
        <Switch
          trackColor={{ true: "#30f816", false: "#767577" }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isEnabled}
        />
        <Text style={[{ color: darkMode ? "white" : "#333333" }]}>
          Switch theme:
        </Text>
      </View>
      <Text style={styles.title}>
        <Text style={[{ color: darkMode ? "white" : "#333333" }]}>Simon</Text>{" "}
        <Text style={styles.red}>S</Text>
        <Text style={styles.green}>a</Text>
        <Text style={styles.blue}>y</Text>
        <Text style={styles.yellow}>s</Text>
      </Text>
      <View style={styles.seperator} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  switch: {
    position: "absolute",
    top: 6,
    left: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  blue: {
    color: "blue",
  },
  yellow: {
    color: "yellow",
  },
  seperator: {
    width: "100%",
    borderBottomColor: "#b0d2d1",
    borderWidth: 1,
  },
});

export default Header;
