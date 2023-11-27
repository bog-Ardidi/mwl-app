import { AuthProvider } from "./src/Providers/Authentication";
import AppNavigator from "./src/Providers/Navigation";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
