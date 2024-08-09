import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PedidoCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido</Text>
      <Text style={styles.text}><Text style={styles.label}>Estado:</Text> En camino</Text>
      <Text style={styles.text}><Text style={styles.label}>Dirección:</Text> Calle Avenida 24D</Text>
      <Text style={styles.text}><Text style={styles.label}>Total de pedido:</Text> $12.00</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#dcdcdc',
    padding: 50,
    borderRadius: 10,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PedidoCard;