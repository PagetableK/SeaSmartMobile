import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import Buttons from '../Buttons/Buttons';
import * as Constantes from '../../utils/Constantes';

const ModalEditarCantidad = ({ setModalVisible, modalVisible, idDetallePedido, idDetalleProducto, cantidadProductoCarrito, getDetalleCarrito, nuevaCantidad, setNuevaCantidad, existencias }) => {

  const ip = Constantes.IP;

  const handleUpdateDetalleCarrito = async () => {
    try {
      if (nuevaCantidad <= (existencias + cantidadProductoCarrito)) {
        const formData = new FormData();
        formData.append('idDetallePedido', idDetallePedido);
        formData.append('idDetalleProducto', idDetalleProducto);
        formData.append('nuevaCantidad', nuevaCantidad);

        const response = await fetch(`${ip}/SeaSmart/api/services/public/detalles_pedidos.php?action=updateDetail`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.status) {
          Alert.alert('Se actualizo el detalle del pedido');
          getDetalleCarrito();
        } else {
          Alert.alert('Ocurrió un error al editar el detalle del pedido', data.error);
        }
        setModalVisible(false);
      } else {
        alert("Seleccione un máximo "+ (existencias + cantidadProductoCarrito) +" de existencias");
      }
    } catch (error) {
      Alert.alert("Error en editar carrito", JSON.stringify(error));
      setModalVisible(false);
    }
  };

  const cambiarCantidad = (operacion) => {
    if (operacion == -1 && nuevaCantidad > 1) {
      setNuevaCantidad(nuevaCantidad - 1);
    } else if (operacion == +1) {
      setNuevaCantidad(nuevaCantidad + 1);
    }
  }

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={() => setModalVisible(!modalVisible)}>
        <TouchableOpacity style={styles.modalView} activeOpacity={1}>
          <Text style={styles.modalText}>Cantidad actual: {cantidadProductoCarrito}</Text>
          <View style={styles.containerCantidad}>
            <Text style={styles.modalText}>Nueva cantidad:</Text>
            <View style={styles.containerCantidad}>
              <TouchableOpacity onPress={() => cambiarCantidad(-1)}>
                <Image source={require('../../../assets/minus.png')} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.textoCantidad}>{nuevaCantidad}</Text>
              <TouchableOpacity onPress={() => cambiarCantidad(+1)}>
                <Image source={require('../../../assets/plus.png')} style={styles.image} />
              </TouchableOpacity>
            </View>
          </View>
          <Buttons textoBoton={'Actualizar cantidad'} accionBoton={handleUpdateDetalleCarrito}>
            <Text>Actualizar cantidad</Text>
          </Buttons>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalEditarCantidad;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerCantidad: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20
  },
  image: {
    height: 40,
    width: 40
  },
  textoCantidad: {
    fontSize: 20
  }
});
