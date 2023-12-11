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

            getUserFavorites(userId)
                .then((favoritesData) => {
                    setFavoritos(favoritesData);

                    // Obtener todos los productos
                    fetchProducts()
                        .then((productosData) => {
                            // Filtrar para incluir solo los productos que son favoritos
                            const productosFavoritos = productosData.filter(producto => favoritesData[producto.id]);
                            setProductos(productosFavoritos);
                        })
                        .catch((error) => console.log("Error al obtener productos:", error));
                })
                .catch((error) => console.log("Error al obtener favoritos:", error));
        }
    }, [isFocused, userId]);

   
    const handleToggleFavorito = async (productoId: string) => {
        const esFavorito = await checkFavorite(userId, productoId);
        if (esFavorito) {
            await removeProductFromFavorites(userId, productoId);
        } else {
            await addProductToFavorites(userId, productoId);
        }
        // Actualizar el estado de favoritos
        const nuevosFavoritos = { ...favoritos, [productoId]: !esFavorito };
        setFavoritos(nuevosFavoritos);
        console.log(favoritos);

        // Volver a filtrar la lista de productos para actualizar la vista, si no no se refleja el cambio :(
        fetchProducts()
        .then((productosData) => {
            const productosFavoritos = productosData.filter(producto => nuevosFavoritos[producto.id]);
            setProductos(productosFavoritos);
        })
        .catch((error) => console.log("Error al obtener productos:", error));
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
