import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Dimensions, SafeAreaView, Text } from 'react-native';
import Buttons from '../components/Buttons/Buttons';
import ModalCompra from '../components/Modales/ModalCompra';
import Constants from 'expo-constants';
import * as Constantes from '../utils/Constantes';

export default function Inicio({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [productos, setProductos] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');
  const [tallaProducto, setTallaProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState(1);
  const [existenciaProducto, setExistenciaProducto] = useState(1);
  const [precioProducto, setPrecioProducto] = useState(0);
  const [usuario, setUsuario] = useState('');
  const ip = Constantes.IP;

  const abrirAgregar = (id, nombre, talla, existencia, precio) => {
    setModalVisible(true);
    setIdProducto(id);
    setNombreProducto(nombre);
    setTallaProducto(talla);
    setExistenciaProducto(existencia);
    setPrecioProducto(precio);
  };

  const cargarProductos = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/productos.php?action=getProducts`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setProductos(data.dataset);
        setUsuario(data.nombre);
        console.log(usuario+"a");
      } else if (data.error = "Acción no disponible fuera de la sesión") {
        // navigation.navigate('Login');
        console.log(data.error);
        console.log(data.session);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', toString(error));
    }
  };

  // Hook para ejecutar cargarProductos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Componente principal de renderizado
  return (
    <View style={styles.container}>
      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreProducto}
        tallaProductoModal={tallaProducto}
        idDetalleProductoModal={idProducto}
        cantidad={cantidadProducto}
        existencias={existenciaProducto}
        precioProducto={precioProducto}
        setCantidad={setCantidadProducto}
      />

      {/* Título de la pantalla */}
      <Text style={styles.title}>Inicio</Text>

      <Text style={styles.title2}>Bienvenido {usuario}!</Text>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: Dimensions.get('window').width / 1.1,
        }}
      />

      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={productos}
          horizontal={false}
          renderItem={({ item }) => (
            <View>
              <Buttons textoBoton={item.nombre_producto + " - " + item.color_producto + " - Talla: " + item.talla} accionBoton={() => abrirAgregar(item.id_detalle_producto, item.nombre_producto + "-" + item.color_producto, item.talla, item.existencia_producto, item.precio_producto)}>Agregar al carrito</Buttons>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9; // Ancho constante de la tarjeta

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  searchContainer: {
    padding: 10,
    marginTop: 20, // Ajuste para mostrar la barra de búsqueda más abajo
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  categoryContainer: {
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  card: {
    width: '100%', // Ancho constante
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido de las tarjetas
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardImage: {
    width: '100%', // Ajusta el ancho de la imagen al ancho de la tarjeta
    height: 150,
    marginVertical: 10,
    resizeMode: 'contain', // Ajusta la imagen dentro de la tarjeta sin distorsionar
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5dade2',
    padding: 10,
    borderRadius: 5,
    width: '80%', // Asegura que todos los botones tengan el mismo ancho
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  }, centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }, modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: '',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    width: Dimensions.get('window').width,
    marginLeft: Dimensions.get('window').width / 10,
    marginTop: Dimensions.get('window').height / 30,
    flex: 0.06,
    color: '#000',
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    width: Dimensions.get('window').width,
    marginLeft: Dimensions.get('window').width / 10,
    flex: 0.06,
    color: '#000',
  },
});
