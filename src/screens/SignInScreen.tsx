import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, View, Button, Text } from 'react-native';
import { signIn } from '../firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../Styles/Styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { IError } from '../interfaces/dropPoints';

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

  const handlerSubmit = async () => {
      setLoading(true);
      const user = await signIn(email, password);
      if (user) {
          // TODO: guardar datos del usuario en el storage(context, reducer, redux, etc...)
          setLoading(false);
      } else {
          // TODO: manejar el error
          setLoading(false);
          setError({
              code: '404',
              message: 'no existe usuario',
          })
      }
  }
  const LoginInSubmit = async () => {

      navigation.navigate("Login");
      setLoading(false);
    };

  useEffect(() => {
      if (email !== '' && password !== '') {
          setCorrectData(false);
      }
      else {
          setCorrectData(true)
      }

  }, [email, password])

  if (error) {
      return (
          <View>
              <Text>
                  {error.message}
              </Text>
          </View>
      )
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ color:'green',marginBottom:100, fontSize:40}}>Registro</Text>
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
                  onPress={handlerSubmit}
                  title={loading ? 'Creando usuario...' : 'Registrarse'}
                  color="#29526D"
                  disabled={loading || correctData}
              />
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