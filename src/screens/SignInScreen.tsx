import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, View, Button, Text } from 'react-native';
import { signIn } from '../firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../Styles/Styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { IError } from '../interfaces/dropPoints';
import { addUserToFavorites } from '../firebase/database';

type RootStackParamList = {
    Login: undefined;
  };
  
  // Define el tipo para las props de LoginScreen
  type SiginProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  };


export const SignInScreen = ({navigation}: SiginProps) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [correctData, setCorrectData] = useState(false);
    const [error, setError] = useState<IError | undefined>(undefined);
    const isValidEmail = true;
    const isValidPassword = true;
    
    const handlerSubmit = async () => {
    
    setLoading(true);
    try {
        const user = await signIn(email, password);
        if (user) {
            // Usuario registrado exitosamente
            setLoading(false);
            await addUserToFavorites(user.uid);
            navigation.navigate("Login"); // Navegar a la pantalla de inicio
        }
    } catch (error) {
        setLoading(false);
        if (typeof error === "object" && error !== null) {
            const firebaseError = error as { code: string, message: string };
            setError({
                code: firebaseError.code,
                message: firebaseError.message,
            });
        } else {
            //errore inesperados
            setError({
                code: 'Error inesperado',
                message: 'Ocurrió un error inesperado durante el registro.',
            });
        }
    };
    
    }

    const LoginInSubmit = async () => {

        navigation.navigate("Login");
        setLoading(false);
    };

    useEffect(() => {
        const isValidEmail = email.includes('@') && email.includes('.');
        const isValidPassword = password.length >= 6;

        setCorrectData(!(isValidEmail && isValidPassword));

    }, [email, password])

    const retry = () => {
        setError(undefined); // Resetea el estado de error
    };

  if (error) {
    return (
        <View style={styles.centeredView}>
            <Text style={styles.errorText}>{error.message}</Text>
            <Button title="Reintentar" onPress={retry} />
        </View>
    );
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ color:'green',marginBottom:100, fontSize:40}}>Registro</Text>


        <Text style={{marginBottom:60, fontSize:15}}>Recuerde que debe ingresar un correo electronico y una clave de 6 o mas caracteres</Text>
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
          {!isValidEmail && <Text style={styles.errorText}>Correo inválido</Text>}
            {!isValidPassword && <Text style={styles.errorText}>La contraseña debe tener al menos 6 caracteres</Text>}
            
              <Button
                  onPress={handlerSubmit}
                  title={loading ? 'Creando usuario...' : 'Registrarse'}
                  color="#29526D"
                  disabled={loading || correctData}
              />
          </View>

          <View>
            
           
        </View>

          <Button
          onPress={LoginInSubmit}
          title='¿Ya tienes una cuenta?'
          color="#29526D"

        />
      </ScrollView>
  )
}

export default SignInScreen;