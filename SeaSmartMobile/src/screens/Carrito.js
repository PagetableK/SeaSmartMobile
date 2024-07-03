import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, FlatList, Dimensions } from 'react-native';
import Buttons from '../components/Buttons/Buttons';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/Constantes';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';
import CarritoCard from '../components/CarritoCard/CarritoCard';

export default function Carrito({ navigation }) {

  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  const [cantidad, setCantidad] = useState(null);
  const [idDetalle, setIdDetalle] = useState(null);
  const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const ip = Constantes.IP;

  useFocusEffect(
    React.useCallback(() => {
      getDetalleCarrito(); // Llama a la función getDetalleCarrito.
    }, [])
  );

  // Función para obtener los detalles del carrito desde el servidor
  const getDetalleCarrito = async () => {
    try {

      const response = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=readCart`, {
        method: 'GET',
      });

      const data = await response.json();

      console.log(data, "Data desde getDetalleCarrito")

      if (data.status) {
        setDataDetalleCarrito(data.dataset);
      } else {
        console.log("No hay detalles del carrito disponibles")
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al cargar los productos del carrito');
    }
  };

  // Función para finalizar el pedido
  const finalizarPedido = async () => {

  };

  // Función para manejar la modificación de un detalle del carrito
  const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
    setModalVisible(true);
    setIdDetalle(idDetalle);
    setCantidadProductoCarrito(cantidadDetalle);
  };

  const renderItem = ({ item }) => (
    <CarritoCard
      item={item}
      accionBotonDetalle={handleEditarDetalle}
      updateDataDetalleCarrito={setDataDetalleCarrito} // Nueva prop para actualizar la lista
    />
  );

  return (
    <View style={styles.container}>
      <ModalEditarCantidad
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        idDetalle={idDetalle}
        setIdDetalle={setIdDetalle}
        setCantidadProductoCarrito={setCantidadProductoCarrito}
        cantidadProductoCarrito={cantidadProductoCarrito}
        getDetalleCarrito={getDetalleCarrito}
      />

      {/* Título de la pantalla */}
      <Text style={styles.title}>Carrito de compra</Text>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          width: Dimensions.get('window').width / 1.1,
        }}
      />
      {/* Lista de detalles del carrito */}
      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          style={{ width: Dimensions.get('window').width / 1.1, flex: 2 }}
          keyExtractor={(item) => item.id_detalle_producto.toString()}
        />
      ) : (
        <View style={{display: 'flex', alignItems: 'center', gap: 100}}>
          <Text style={styles.titleDetalle}>No se han agregado productos al carrito.</Text>
          <Image source={require('../../assets/carro.png')} style={{width: 200, height: 200}}/>
        </View>
      )}

      {/* Botones de finalizar pedido y regresar a productos */}
      <View>
        {dataDetalleCarrito.length > 0 && (
          <Buttons
            textoBoton='Finalizar Pedido'
            accionBoton={finalizarPedido}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
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
    textAlign: 'left',
    width: Dimensions.get('window').width,
    marginLeft: Dimensions.get('window').width / 10,
    marginTop: Dimensions.get('window').height / 30,
    flex: 0.1,
    color: '#000', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  titleDetalle: {
    marginTop: 20,
    fontSize: 17,
  }
});