import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Producto } from '../interfaces/dropPoints';

interface ProductoItemProps {
    producto: Producto;
    esFavorito: boolean;
    onToggleFavorito: (productId: string) => void;

}


const ProductoItem = ({ producto, esFavorito, onToggleFavorito }: ProductoItemProps) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: producto.imagenUrl }} style={{ width: 50, height: 50 }} />
            <Text>{producto.nombre}</Text>
            <Text>{`$${producto.precio}`}</Text>
            <TouchableOpacity onPress={() => onToggleFavorito(producto.id)}>
                <Ionicons
                    name={esFavorito ? "heart" : "heart-outline"}
                    size={24}
                    color={esFavorito ? 'red' : 'grey'}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ProductoItem;