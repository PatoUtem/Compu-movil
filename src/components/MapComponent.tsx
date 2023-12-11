import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    

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
            setModalVisible(true);
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredViewModal}>
                    <View style={styles.modalView}>
                        {selectedPunto && (
                            <>
                                <Text style={styles.modalText}>{selectedPunto.nombre}</Text>
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={selectedPunto.productos}
                                    keyExtractor={(item) => `producto_${item.id}`}
                                    renderItem={({ item }) => (
                                        <View style={styles.productInfo}>
                                            <Text style={styles.productName}>{item.nombre}</Text>
                                            <Text>{`Precio: $${item.precio}`}</Text>
                                            <Image source={{ uri: item.imagenUrl }} style={styles.productImage} />
                                            <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
                                                <Ionicons
                                                    name={favoritos[item.id] ? "heart" : "heart-outline"}
                                                    size={24}
                                                    color={favoritos[item.id] ? 'red' : 'grey'}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cerrar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};