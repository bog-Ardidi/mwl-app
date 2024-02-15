import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/HomeScreen";
import SubmitScreen from "../../Screens/SubmitScreen";
import GraphScreen from "../../Screens/GraphScreen";
import ScoresScreen from "../../Screens/ScoresScreen";
import CalendarScreen from "../../Screens/CalendarScreen";
import routes from "../../Config/routes";
import TabNavigator from "./TabNavigator";

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="TabNavigator" component={TabNavigator} />
      <MainStack.Screen name={routes.SCORES_SCREEN} component={ScoresScreen} />
      {/* <MainStack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <MainStack.Screen name={routes.SUBMIT_SCREEN} component={SubmitScreen} />
      <MainStack.Screen name={routes.GRAPH_SCREEN} component={GraphScreen} />
      <MainStack.Screen
        name={routes.CALENDAR_SCREEN}
        component={CalendarScreen}
      /> */}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
