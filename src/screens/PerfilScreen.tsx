import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged,User } from "firebase/auth";
import { styles } from '../Styles/Styles';
import { useIsFocused } from '@react-navigation/native';

export const PerfilScreen = () => {
    const [user, setUser] = useState<User | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // verificar sesion esta iniciada
            const unsubscribe = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser);
            });

            return () => unsubscribe();
        }
        
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Informacion de tu Perfil</Text>
            {user ? (
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Email: {user.email}</Text>
                    
                </View>
            ) : (
                <Text style={styles.noUserText}>No hay usuario autenticado</Text>
            )}
        </View>
    );
};


export default PerfilScreen;

