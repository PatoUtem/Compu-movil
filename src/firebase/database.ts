import { database } from "./firebaseConfig";
import { ref, set, onValue, get, remove } from "firebase/database";
import { Producto,PuntoRecogida,Favoritos } from "../interfaces/dropPoints";

const userRef = ref(database, "users/usuario23");

const writeUserData = (data: any) => {
  return set(userRef, data);
};

//leer usuarios de la base de datos
const readUserData = () => {
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log('====================')
    console.log('DATA en RDB')
    console.log(data);
  });
};

//leer productos de la base de datos
const fetchProducts = (): Promise<Producto[]> => {
  return new Promise((resolve, reject) => {
    const productsRef = ref(database, "productos");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productosList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      resolve(productosList as Producto[]);
    }, (error) => {
      reject(error);
    });
  });
};

//leer puntos de recogida de la base de datos
const fetchPuntosRecogida = ():Promise<PuntoRecogida[]> => {
  return new Promise((resolve, reject) => {
    const puntosRef = ref(database, '/puntosRecogida');
    onValue(puntosRef, (snapshot) => {
      const data = snapshot.val();
      const puntosList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      resolve(puntosList);
    }, (error) => {
      reject(error);
    });
  });
};


//agregar usuario a la base de datos de favoritos
const addUserToFavorites = async (userId: string) => {
  console.log("Agregando usuario a favoritos con ID:", userId);
  const userRef = ref(database, `usuarios/${userId}`);
  
  const initialFavorites = {
    "1": false
  };

  try {
    await set(userRef, {
      //inicializado: true,
      favoritos: initialFavorites
    });
    console.log("Usuario agregado a favoritos");
  } catch (error) {
    console.error("Error al agregar usuario a favoritos:", error);
  }
  
};


//leer favoritos del usuario
const getUserFavorites = async (userId: string): Promise<Favoritos> => {
  const favRef = ref(database, `usuarios/${userId}/favoritos`);
  const snapshot = await get(favRef);
  return snapshot.val() || {};
};

//agregar favorito al usuario
const addProductToFavorites = async (userId: string, productId: string) => {
  const favRef = ref(database, `usuarios/${userId}/favoritos/${productId}`);
  await set(favRef, true);
};

//eliminar favorito del usuario
const removeProductFromFavorites = async (userId: string, productId: string) => {
  const favRef = ref(database, `usuarios/${userId}/favoritos/${productId}`);
  await remove(favRef);
};

//ver si existe el producto en la base de datos de favoritos
const checkFavorite = async (userId: string, productId: string): Promise<boolean> => {
  const favRef = ref(database, `usuarios/${userId}/favoritos/${productId}`);
  const snapshot = await get(favRef);
  return snapshot.val() === true;
};


export { writeUserData, readUserData, fetchProducts,fetchPuntosRecogida, getUserFavorites, addProductToFavorites, removeProductFromFavorites, checkFavorite, addUserToFavorites };
