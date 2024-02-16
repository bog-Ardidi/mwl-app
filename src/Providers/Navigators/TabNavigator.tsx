import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import routes from "../../Config/routes";
import HomeScreen from "../../Screens/HomeScreen";
import CalendarScreen from "../../Screens/CalendarScreen";
import SubmitScreen from "../../Screens/SubmitScreen";
import LogoutComponent from "../../Components/LogoutComponent";
import GraphScreen from "../../Screens/GraphScreen";
import { StyleSheet } from "react-native";
import colors from "../../Config/colors";
import TabItem from "../../Components/TabItem";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }: any) => TabBarOptions.Home(focused),
        }}
      />
      <Tab.Screen
        name={routes.CALENDAR_SCREEN}
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }: any) => TabBarOptions.Calendar(focused),
        }}
      />
      <Tab.Screen
        name={routes.SUBMIT_SCREEN}
        component={SubmitScreen}
        options={{
          tabBarIcon: ({ focused }: any) => TabBarOptions.Submit(focused),
        }}
      />
      <Tab.Screen
        name={routes.GRAPH_SCREEN}
        component={GraphScreen}
        options={{
          tabBarIcon: ({ focused }: any) => TabBarOptions.Graph(focused),
        }}
      />
      <Tab.Screen
        name={routes.LOGOUT_COMPONENT}
        component={LogoutComponent}
        options={{
          tabBarIcon: ({ focused }: any) => TabBarOptions.Logout(focused),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    margin: 20,
    elevation: 0,
    backgroundColour: colors.white,
    borderRadius: 15,
    height: 80,
  },
});

const TabBarOptions = {
  Home: (selected: boolean) => (
    <TabItem title="Home" icon="home" selected={selected} />
  ),
  Calendar: (selected: boolean) => (
    <TabItem title="Calendar" icon="calendar" selected={selected} />
  ),
  Submit: (selected: boolean) => (
    <TabItem title="Submit" icon="plus-circle-outline" selected={selected} />
  ),
  Graph: (selected: boolean) => (
    <TabItem title="Chart" icon="chart-scatter-plot" selected={selected} />
  ),
  Logout: (selected: boolean) => (
    <TabItem title="Logout" icon="logout" selected={selected} />
  ),
};

export default TabNavigator;
