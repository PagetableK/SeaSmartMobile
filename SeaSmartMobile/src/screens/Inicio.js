import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
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
        console.log('a');
        setProductos(data.dataset);
      } else if (data.error = "Acción no disponible fuera de la sesión") {
        // navigation.navigate('Login');
        console.log('cha');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', toString(error));
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

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

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F5F4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 10,
    backgroundColor: "darkblue"
  },
  buttonText: {
    textAlign: 'center',
    color: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
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
});