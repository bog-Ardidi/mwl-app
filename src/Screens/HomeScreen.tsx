import Screen from "../Components/Base/Screen";
import HomeWelcome from "../Components/HomeWelcome";
import Calendar from "../Components/Calendar";
import React, { useState } from "react";
import { Header, StatusBar } from "../Components/Base/Header";
import colors from "../Config/colors";

const HomeScreen = () => {
  const [compare, setCompare] = useState<boolean>(false);

  return (
    <>
      <StatusBar color={"transparent"} />
      <Screen>
        <Header color={"transparent"} height={0.25} />
        <HomeWelcome compare={compare} setCompare={setCompare} />
        <Calendar compare={compare} setCompare={setCompare} />
      </Screen>
    </>
  );
};

export default HomeScreen;
