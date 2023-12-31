// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    width: 200, // Ajusta el tamaño según sea necesario
    height: 200, // Ajusta el tamaño según sea necesario
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 40,
    width: '90%',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
      alignItems: 'center',
  },
  userInfoText: {
      fontSize: 18,
      margin: 5,
  },
  noUserText: {
      fontSize: 18,
      color: 'red',
  },
  productoContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  imagenProducto: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productoPrecio: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  containerInicio: {
    padding: 10,
  },
  containerMap: {
    flex: 1,
    width: '100%',
  },
  map: {
      width: '100%',
      height: '100%',
  },
  tooltip: {
    //position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    elevation: 5,
  },
  puntoNombre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  productInfo: {
    marginBottom: 15,
  },
  productName: {
    fontWeight: 'bold',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 5,
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    
  },
  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 10,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: "80%"
      
  },
  button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
  },
  buttonClose: {
      backgroundColor: "#2196F3",
  },
  textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
  },
  modalText: {
      marginBottom: 15,
      textAlign: "center"
  },
  contenedorModal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch' 
  },
  elementoContenedor: {
    flex: 1, 
  }

});
