import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Singup, Home} from './pages';

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen
        name='Signup'
        component={Singup}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        />
        <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

