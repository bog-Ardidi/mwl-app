import Screen from "../Components/Base/Screen";
import HomeWelcome from "../Components/HomeWelcome";
import Calendar from "../Components/Calendar/Calendar";
import React, { useState } from "react";
import { Header, StatusBar } from "../Components/Base/Header";
import colors from "../Config/colors";

const HomeScreen = () => {
  const [compare, setCompare] = useState<boolean>(false);

  return (
    <>
      <StatusBar color={colors.bubbleGreen} />
      <Screen>
        <Header color={colors.bubbleGreen} height={0.2} />
        <HomeWelcome compare={compare} setCompare={setCompare} />
        <Calendar compare={compare} />
      </Screen>
    </>
  );
};

export default HomeScreen;
