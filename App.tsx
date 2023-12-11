import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import Loader from "./src/components/Loader";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const stackScreenOptions = {
  headerLeft: () => null, 
  headerShown: false,
};

const App  = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={stackScreenOptions}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
