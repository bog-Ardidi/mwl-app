import { ThemeProvider } from "react-native-rapi-ui";
import { AuthProvider } from "./src/Providers/Authentication";
import AppNavigator from "./src/Providers/Navigation";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
