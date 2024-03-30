import { AuthProvider } from "./src/Providers/Authentication";
import AppNavigator from "./src/Providers/Navigation";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

/**
 * Root of application.
 * @author Georgi Petkov
 */
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
