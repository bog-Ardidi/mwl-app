import React from "react";
import Screen from "../Components/Base/Screen";
import HomeWelcome from "../Components/HomeWelcome";
import Calendar from "../Components/Calendar";

const HomeScreen = () => {
  return (
    <Screen>
      <HomeWelcome />
      <Calendar />
    </Screen>
  );
};

export default HomeScreen;
