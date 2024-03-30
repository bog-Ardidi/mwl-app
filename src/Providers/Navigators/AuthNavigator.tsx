import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screens/Auth/LoginScreen";
import ForgetPassword from "../../Screens/Auth/ForgetPasswordScreen";
import Register from "../../Screens/Auth/RegisterScreen";
import routes from "../../Config/routes";

// AuthStack manages the authentication
const AuthStack = createNativeStackNavigator();

/**
 * Navigator that holds the Auth screens.
 */
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={routes.LOGIN_SCREEN} component={Login} />
      <AuthStack.Screen name={routes.REGISTER_SCREEN} component={Register} />
      <AuthStack.Screen
        name={routes.FORGOT_PASSWORD_SCREEN}
        component={ForgetPassword}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
