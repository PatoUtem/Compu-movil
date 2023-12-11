import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { PuntoRecogida,Producto,PuntoRecogidaConProductos } from '../interfaces/dropPoints';
import { styles } from '../Styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addProductToFavorites, removeProductFromFavorites, checkFavorite, getUserFavorites } from '../firebase/database';
import { useIsFocused } from '@react-navigation/native';


interface MapComponentProps {
    puntosRecogida: PuntoRecogida[];
    productos: Producto[];
    userId: string;
  }

  export const MapComponent = ({ puntosRecogida, productos, userId }: MapComponentProps) => {
    const mapRef = useRef<MapView>(null);
    const [selectedPunto, setSelectedPunto] = useState<PuntoRecogidaConProductos | null>(null);
    const [favoritos, setFavoritos] = useState<{ [key: string]: boolean }>({});
    const isFocused = useIsFocused();

    

    useEffect(() => {
        if (isFocused) {
            getUserFavorites(userId)
            .then((favoritesData) => {
                setFavoritos(favoritesData);
            })
            .catch((error) => console.log(error));
        }
        
    }, [isFocused,userId]);

    const onMarkerPress = (puntoId: string) => {
        const punto = puntosRecogida.find(p => p.id === puntoId);
        if (punto && punto.productos) {
            const productosEnPunto = Object.keys(punto.productos)
                .filter(productId => punto.productos[productId] === true)
                .map(productId => productos.find(p => p.id === productId) as Producto);
            setSelectedPunto({ ...punto, productos: productosEnPunto });
        }
    };

    const handleToggleFavorite = async (productId: string) => {
        const isFav = await checkFavorite(userId, productId);
        if (isFav) {
            await removeProductFromFavorites(userId, productId);
        } else {
            await addProductToFavorites(userId, productId);
        }
        setFavoritos(prev => ({ ...prev, [productId]: !isFav }));
    };

    return (
        <View style={styles.container}>
            <MapView 
                ref={mapRef}
                style={styles.map} 
                provider={'google'} 
                showsUserLocation 
                showsMyLocationButton
                initialRegion={{
                    latitude: -33.4489,
                    longitude: -70.6693,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                {puntosRecogida.map((punto, index) => (
                    <Marker
                        key={`marker_${index}`}
                        identifier={`marker_${index}`}
                        coordinate={{ latitude: punto.coordenadas.latitud, longitude: punto.coordenadas.longitud }}
                        onPress={() => onMarkerPress(punto.id)}
                    />
                ))}
            </MapView>
            {selectedPunto && (
                <View style={styles.tooltip}>
                    <ScrollView>
                        <Text style={styles.puntoNombre}>{selectedPunto.nombre}</Text>
                        {selectedPunto.productos.map((prod, idx) => (
                            <View key={idx} style={styles.productInfo}>
                                <Text style={styles.productName}>{prod.nombre}</Text>
                                <Text>{`Precio: $${prod.precio}`}</Text>
                                <Image source={{ uri: prod.imagenUrl }} style={styles.productImage} />
                                <TouchableOpacity onPress={() => handleToggleFavorite(prod.id)}>
                                <Ionicons
                                    name={favoritos[prod.id] ? "heart" : "heart-outline"}
                                    size={24}
                                    color={favoritos[prod.id] ? 'red' : 'grey'}
                                />
                            </TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPunto(null)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};