import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, StyleSheet, ScrollView,Text } from 'react-native';
import { logIn } from '../firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../Styles/Styles';


type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

// Define el tipo para las props de LoginScreen
type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home' | 'SignIn'>;
  
};

const LoginScreen = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [correctData, setCorrectData] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const success = await logIn(email, password);
    if (success) {
        // Inicio de sesión exitoso
        navigation.navigate("Home");
    } else {
        // Error de inicio de sesión, mostrar un mensaje al usuario
        alert("Usuario o contraseña incorrectos");
    }
    setLoading(false);
  };

  const SignInSubmit = async () => {

    navigation.navigate("SignIn");
    setLoading(false);
  };

  useEffect(() => {
    setCorrectData(email === '' || password === '');
  }, [email, password]);

  return (

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ color:'green',marginBottom:100, fontSize:40}}>Inicio de Sesión</Text>
        <TextInput
          placeholder="Ingrese Email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          keyboardType='email-address'
        />
        <TextInput
          placeholder="Ingrese Password"
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          secureTextEntry
        />
        <View style={{ marginTop: 50, width: '70%' ,backgroundColor:'green',borderRadius:20}}>
          <Button
            onPress={handleSubmit}
            title={loading ? 'Iniciando Sesion...' : 'Inicia Sesion'}
            color="#f194ff"
            disabled={loading || correctData}
          />
        </View>
        <Button
            onPress={SignInSubmit}
            title='¿No tienes Cuenta?'
            color="#29526D"

          />
      </ScrollView>

  );
};

export default LoginScreen;
