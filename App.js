import { StatusBar } from 'expo-status-bar';
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
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExpertDetail"
          component={DetailScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
