import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PedidosScreens from './PedidosScreen';
import { PerfilScreen } from './PerfilScreen';
import { Button } from 'react-native';
import { ReactNode } from 'react';
import PuntosRecogidaScreen from './PuntosRecogidaScreen';


const Tab = createBottomTabNavigator();


type HomeProps = {
  navigation: ReactNode;
};

function HomeScreen({ navigation }: HomeProps) {
  return (
    <>
      <Tab.Navigator
     screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === 'Inicio') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === "Mapa") {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === "Favoritos") {
              iconName = focused ? 'heart' : 'heart-outline';
            }else if(route.name === "Perfil"){
                iconName = focused ? 'person' :'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        
      })}
    >
        <Tab.Screen name="Mapa" component={PuntosRecogidaScreen} />
        <Tab.Screen name="Favoritos" component={PedidosScreens} />
        <Tab.Screen name="Perfil" component={PerfilScreen} options={({ navigation }) => ({
            headerRight: () => (
              <Ionicons
                name="log-out-outline"
                size={30}
                color="gray"
                style={{ marginRight: 15 }}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
            ),
          })}/>
      </Tab.Navigator>
    </>
  );
  
}



export default HomeScreen;
