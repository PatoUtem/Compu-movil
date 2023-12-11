import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import { View, Text, Image } from 'react-native';
import splashImage from './assets/logo2.png';

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

  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsSplashScreenVisible(false);
        }, 3000); // 3 segundos
    }, []);

    if (isSplashScreenVisible) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Image source={splashImage} style={{ width: 250, height: 250 }} />
          
          <Text style={{ color:'green',marginBottom:100, fontSize:40, marginTop:30}}>Plato Circular </Text>
          <Text>Cargando...</Text>
      </View>
        );
    }
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
