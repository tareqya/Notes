import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Signin, Signup } from "../screens/AuthScreens";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
