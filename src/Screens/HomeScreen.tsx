import React from "react";
import Screen from "../Components/Base/Screen";
import HomeWelcome from "../Components/HomeWelcome";
import Calendar from "../Components/Calendar";
import { useState } from "react";

const HomeScreen = () => {
  const [compare, setCompare] = useState<boolean>(false);

  return (
    <Screen>
      <HomeWelcome compare={compare} setCompare={setCompare} />
      <Calendar compare={compare} setCompare={setCompare} />
    </Screen>
  );
};

export default HomeScreen;
