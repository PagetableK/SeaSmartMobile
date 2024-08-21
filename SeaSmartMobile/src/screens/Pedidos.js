import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Buttons from '../components/Buttons/Buttons';
import * as Constantes from '../utils/Constantes';
import PedidoCard from '../components/Cards/PedidosCard';

export default function Pedidos({ navigation }) {
  const ip = Constantes.IP;
  const [productos, setProductos] = useState([]);

  const getPedidos = async () => {
    try {
      const response = await fetch(`${ip}/SeaSmart/api/services/public/pedido.php?action=readOrdersMobile`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setProductos(data.dataset);
        console.log(data.dataset);
      } else {
        console.log("No hay pedidos realizados por el cliente");
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al cargar los pedidos');
    }
  };

  useEffect(() => {
    getPedidos();
  }, []);

  const handleVerDetalles = (id_pedido) => {
    navigation.navigate('DetallePedido', { pedidoId: id_pedido });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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

      <View style={styles.container}>
      <ScrollView>
        {productos.map((pedido, index) => (
          <PedidoCard
            key={index}
            direccion={pedido.direccion}
            estado_pedido={pedido.estado_pedido}
            fecha_pedido={pedido.fecha_pedido}
            precio_total={pedido.precio_total}
            onPressVerDetalles={handleVerDetalles}
            id_pedido={pedido.id_pedido}
          />
        ))}
      </ScrollView>
      </View>
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