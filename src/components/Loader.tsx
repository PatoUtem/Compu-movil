import React, { ReactNode, useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { styles } from '../Styles/Styles';


const LOGO = require('../../assets/logo2.png');
type LoaderProps = {
    children: ReactNode;
  };

const Loader = ({ children }: LoaderProps) => {
  const [isReady, setIsReady] = useState(false);
  

  useEffect(() => {
    async function prepare() {
      try {
        // Mantén la pantalla de splash activa mientras cargan las fuentes y el logo
        await SplashScreen.preventAutoHideAsync();

        // Simula un tiempo de carga para el logo
        setTimeout(async () => {
          setIsReady(true);
          await SplashScreen.hideAsync();
        }, 2000);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    // Muestra el logo mientras las fuentes se están cargando y el temporizador está activo
    return (
      <View style={styles.containerLoader}>
        <Image source={LOGO} style={styles.logo} />
      </View>
    );
  }

  // Una vez cargadas las fuentes y transcurrido el tiempo del logo, muestra los hijos del componente
  return <>{children}</>;
};

export default Loader;
