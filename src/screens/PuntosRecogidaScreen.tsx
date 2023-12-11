import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchPuntosRecogida } from '../firebase/database';
import { fetchProducts } from '../firebase/database';
import { PuntoRecogida } from '../interfaces/dropPoints';
import { Producto } from '../interfaces/dropPoints';
import { MapComponent } from '../components/MapComponent';
import { useIsFocused } from '@react-navigation/native';

const PuntosRecogidaScreen = () => {
    const [puntosRecogida, setPuntosRecogida] = useState<PuntoRecogida[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]); // Estado para almacenar los productos
    const [userId, setUserId] = useState<string>("");
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const auth = getAuth();
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    setUserId("");
                }
            });

            fetchPuntosRecogida()
                .then((data: PuntoRecogida[]) => setPuntosRecogida(data))
                .catch((error) => console.log(error));

            fetchProducts()
                .then((data: Producto[]) => setProductos(data))
                .catch((error) => console.log(error));

            
            return () => unsubscribe();
        }
    }, [isFocused, userId]);

    return (
        <MapComponent puntosRecogida={puntosRecogida} productos={productos} userId={userId}/>
    );
};

export default PuntosRecogidaScreen;
