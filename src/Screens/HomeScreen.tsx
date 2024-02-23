import React from "react";
import Screen from "../Components/Base/Screen";
import HomeWelcome from "../Components/HomeWelcome";
import CalendarScreen from "./CalendarScreen";

const HomeScreen = () => {
  return (
    <Screen>
      <HomeWelcome />
      <CalendarScreen />
    </Screen>
  );
};

export default HomeScreen;
