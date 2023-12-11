export interface PuntoRecogida {
    id: string,
    coordenadas: Coordenada,
    nombre: string,
    telefono: string,
    productos: { [key: string]: boolean };
}

export interface Coordenada {
    latitud: number,
    longitud: number,
}

export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    imagenUrl: string;
    puntosRecogida: { [key: string]: boolean };
}

export interface PuntoRecogidaConProductos {
    productos: Producto[];
    id: string;
    coordenadas: Coordenada;
    nombre: string;
    telefono: string;
}

export interface Favoritos {
[key: string]: boolean;
}

export interface IError {
    code: string;
    message: string;
}