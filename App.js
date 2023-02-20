import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import HomeScreen from "./src/screen/HomeScreen";
import DetailScreen from "./src/screen/DetailScreen";

// Pressable
// SafeViewArea
// VirtualizedList
// Stack and Drawer
// Redux

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="HomeScreen"
          component={DrawerNavigator} />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
