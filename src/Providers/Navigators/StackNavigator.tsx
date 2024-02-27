import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/HomeScreen";
import SubmitScreen from "../../Screens/SubmitScreen";
import ScoresScreen from "../../Screens/ScoresScreen";
import routes from "../../Config/routes";

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <MainStack.Screen name={routes.SCORES_SCREEN} component={ScoresScreen} />
      <MainStack.Screen name={routes.SUBMIT_SCREEN} component={SubmitScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
