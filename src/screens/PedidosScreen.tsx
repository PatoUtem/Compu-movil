import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import ProductoItem from '../components/PedidoComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchProducts } from '../firebase/database';
import { addProductToFavorites, removeProductFromFavorites, checkFavorite, getUserFavorites } from '../firebase/database';
import { Producto,Favoritos } from '../interfaces/dropPoints';
import { useIsFocused } from '@react-navigation/native';


const PedidosScreens = () => {
    const [productos, setProductos] = useState<Producto[]>([]); 
    const [favoritos, setFavoritos] = useState<Favoritos>({});
    const [userId, setUserId] = useState<string>("");
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // verificar sesion esta iniciada
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuario está autenticado
                setUserId(user.uid);
            } else {
                // Usuario no está autenticado
                setUserId("");
            }
        });

        fetchProducts()
            .then((data: Producto[]) => setProductos(data))
            .catch((error) => console.log(error));
        }

        getUserFavorites(userId)
            .then((favoritesData) => {
                setFavoritos(favoritesData);
            })
            .catch((error) => console.log(error));

    }, [isFocused, userId]);

   

    const handleToggleFavorito = async (productoId: string) => {
        const esFavorito = await checkFavorite(userId, productoId);
        if (esFavorito) {
            await removeProductFromFavorites(userId, productoId);
        } else {
            await addProductToFavorites(userId, productoId);
        }
        setFavoritos(prev => ({ ...prev, [productoId]: !esFavorito }));
        console.log(favoritos);
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={productos}
                renderItem={({ item }) => (
                    <ProductoItem 
                        producto={item}
                        esFavorito={favoritos[item.id]}
                        onToggleFavorito={handleToggleFavorito}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default PedidosScreens;
