import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';
import Buttons from '../components/Buttons/Buttons';
import * as Constantes from '../utils/Constantes';
import PedidoCard from '../components/Cards/PedidosCard';

export default function Pedidos({ navigation }) {

  const ip = Constantes.IP;

  useEffect(() => {
    // obtener el historial de pedidos
  }, []);

  const handleVerDetalles = () => {
    // Navegar a la pantalla de detalles del pedido
    navigation.navigate('DetallesPedido');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Título de la pantalla */}
        <Text style={styles.title}>Pedidos</Text>
        <View style={styles.gestionarButtonContainer}>
          <TouchableOpacity
            style={styles.gestionarButton}
            onPress={() => { navigation.navigate('Direcciones') }}
          >
            <Image source={require('../../assets/direccion_casa.png')} />
            <Text style={styles.gestionarButtonText}>Gestionar direcciones</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Aquí renderizamos la card del pedido */}
      <PedidoCard onPressVerDetalles={handleVerDetalles} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    marginLeft: Dimensions.get('window').width / 10,
    marginTop: Dimensions.get('window').height / 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 0.3
  },
  gestionarButtonContainer: {
    flex: 0.6,
  },
  gestionarButton: {
    backgroundColor: 'green',
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    gap: 10,
    padding: 10
  },
  gestionarButtonText: {
    fontWeight: '900',
    color: 'white'
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: Dimensions.get('window').width / 1.1,
  },
});