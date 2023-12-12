import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Singup, Home, Pay, Transference} from './pages';
import Analysis from './pages/analysis';

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
        <Stack.Screen
        name='Pay'
        component={Pay}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        />
        <Stack.Screen
        name='Transference'
        component={Transference}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        />
        <Stack.Screen
        name='Analysis'
        component={Analysis}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

