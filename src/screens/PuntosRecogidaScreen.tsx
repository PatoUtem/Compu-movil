import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchPuntosRecogida, getUserFavorites } from '../firebase/database';
import { fetchProducts } from '../firebase/database';
import { Favoritos, PuntoRecogida } from '../interfaces/dropPoints';
import { Producto } from '../interfaces/dropPoints';
import { MapComponent } from '../components/MapComponent';
import { useIsFocused } from '@react-navigation/native';

const PuntosRecogidaScreen = () => {
    const [puntosRecogida, setPuntosRecogida] = useState<PuntoRecogida[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]); // Estado para almacenar los productos
    const [favoritos, setFavoritos] = useState<Favoritos>({}); // Estado para almacenar los productos
    const [userId, setUserId] = useState<string>("");
    const isFocused = useIsFocused();
    type ProductosEnPunto = { [key: string]: boolean };

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
            
            let productosConStock: Producto[] = [];

            getUserFavorites(userId)
            .then((favoritesData) => {
                setFavoritos(favoritesData);
                
                fetchProducts()
                .then((productosData) => {
                    productosConStock = productosData.filter(producto => producto.stock > 0 && !favoritesData[producto.id]);
                    setProductos(productosConStock);
                    return fetchPuntosRecogida();
                })

                .then((puntosData) => {
                    const puntosFiltrados: PuntoRecogida[] = puntosData.map(punto => {
                        const productosFiltrados: ProductosEnPunto = Object.keys(punto.productos)
                            .filter(key => productosConStock.some(p => p.id === key))
                            .reduce((obj, key) => {
                                obj[key] = true;
                                return obj;
                            }, {} as ProductosEnPunto);
                        return { ...punto, productos: productosFiltrados };
                    });
                    console.log(puntosFiltrados);
                    setPuntosRecogida(puntosFiltrados);
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log("Error al obtener favoritos:", error));
                
            return () => unsubscribe();
        }
    }, [isFocused, userId]);

    return (
        <MapComponent puntosRecogida={puntosRecogida} productos={productos} userId={userId}/>
    );
};

export default PuntosRecogidaScreen;
